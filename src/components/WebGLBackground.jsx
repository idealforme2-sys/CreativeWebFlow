import React, { useEffect, useRef } from 'react';

/* --- OPTIMIZED HERO SHADER (Half-res, simplified noise) --- */
const vertexShader = `
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_intensity;

  // Simplified noise
  vec3 hash3(vec2 p) {
    vec3 q = vec3(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)), dot(p, vec2(419.2, 371.9)));
    return fract(sin(q) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f); // Cheaper smoothstep instead of quintic
    return mix(mix(dot(hash3(i + vec2(0.0,0.0)).xy, f - vec2(0.0,0.0)),
                   dot(hash3(i + vec2(1.0,0.0)).xy, f - vec2(1.0,0.0)), u.x),
               mix(dot(hash3(i + vec2(0.0,1.0)).xy, f - vec2(0.0,1.0)),
                   dot(hash3(i + vec2(1.0,1.0)).xy, f - vec2(1.0,1.0)), u.x), u.y);
  }

  // Reduced to max 3 octaves (was 5)
  float fbm(vec2 p, int octaves) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 0.25;
    for(int i = 0; i < 3; i++) {
      if(i >= octaves) break;
      value += amplitude * noise(p * frequency);
      amplitude *= 0.52;
      frequency *= 1.13;
    }
    return value;
  }

  // Simplified voronoi: [-1,1] range = 9 iterations instead of 25
  float voronoi(vec2 p) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    float md = 50.0;
    for(int i = -1; i <= 1; i++) {
      for(int j = -1; j <= 1; j++) {
        vec2 g = vec2(i, j);
        vec2 o = hash3(n + g).xy;
        o = 0.5 + 0.41 * sin(u_time * 1.5 + 6.28 * o);
        vec2 r = g + o - f;
        float d = dot(r, r);
        md = min(md, d);
      }
    }
    return sqrt(md);
  }

  float plasma(vec2 p, float time) {
    float a = sin(p.x * 8.0 + time * 2.0);
    float b = sin(p.y * 8.0 + time * 1.7);
    float c = sin((p.x + p.y) * 6.0 + time * 1.3);
    float d = sin(sqrt(p.x * p.x + p.y * p.y) * 8.0 + time * 2.3);
    return (a + b + c + d) * 0.5;
  }

  // Simplified curl: only 2 fbm calls with 2 octaves each (was 4 calls with 6 octaves)
  vec2 curl(vec2 p, float time) {
    float eps = 0.5;
    float n1 = fbm(p + vec2(eps, 0.0), 2);
    float n2 = fbm(p - vec2(eps, 0.0), 2);
    float n3 = fbm(p + vec2(0.0, eps), 2);
    float n4 = fbm(p - vec2(0.0, eps), 2);
    return vec2((n3 - n4) / (2.0 * eps), (n2 - n1) / (2.0 * eps));
  }

  float grain(vec2 uv, float time) {
    vec2 seed = uv * time;
    return fract(sin(dot(seed, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 st = (uv - 0.5) * 2.0;
    st.x *= u_resolution.x / u_resolution.y;

    float time = u_time * 0.25;

    vec2 curlForce = curl(st * 2.0, time) * 0.6;
    vec2 flowField = st + curlForce;

    // Reduced distortion layers from 4 to 3, lower octaves
    float dist1 = fbm(flowField * 1.5 + time * 1.2, 3) * 0.4;
    float dist2 = fbm(flowField * 2.3 - time * 0.8, 2) * 0.3;
    float dist3 = fbm(flowField * 3.1 + time * 1.8, 2) * 0.2;

    float cells = voronoi(flowField * 2.5 + time * 0.5);
    cells = smoothstep(0.1, 0.7, cells);

    float plasmaEffect = plasma(flowField + vec2(dist1, dist2), time * 1.5) * 0.2;

    float totalDist = dist1 + dist2 + dist3 + plasmaEffect;

    // Reduced from 3 streaks to 2
    float streak1 = sin((st.x + totalDist) * 15.0 + time * 3.0) * 0.5 + 0.5;
    float streak2 = sin((st.x + totalDist * 0.7) * 25.0 - time * 2.0) * 0.5 + 0.5;

    streak1 = smoothstep(0.3, 0.7, streak1);
    streak2 = smoothstep(0.2, 0.8, streak2);
    float combinedStreaks = streak1 * 0.6 + streak2 * 0.5;

    float shape1 = 1.0 - abs(st.x + totalDist * 0.6);
    float shape2 = 1.0 - abs(st.x + totalDist * 0.4 + sin(st.y * 3.0 + time) * 0.15);
    shape1 = smoothstep(0.0, 1.0, shape1);
    shape2 = smoothstep(0.1, 0.9, shape2);
    float finalShape = max(shape1 * 0.8, shape2 * 0.6);

    vec3 color1 = vec3(1.0, 0.1, 0.6);
    vec3 color2 = vec3(1.0, 0.3, 0.1);
    vec3 color3 = vec3(0.9, 0.1, 1.0);
    vec3 color4 = vec3(0.1, 0.5, 1.0);
    vec3 color5 = vec3(0.1, 1.0, 0.9);
    vec3 color6 = vec3(0.3, 0.1, 0.9);
    vec3 color7 = vec3(1.0, 0.8, 0.1);

    float gradient = 1.0 - uv.y;
    float colorNoise = fbm(flowField * 3.0 + time * 0.5, 2) * 0.5 + 0.5;
    float colorShift = sin(time * 1.5 + st.y * 2.0) * 0.5 + 0.5;

    vec3 finalColor;
    float t1 = smoothstep(0.85, 1.0, gradient);
    float t2 = smoothstep(0.7, 0.85, gradient);
    float t3 = smoothstep(0.5, 0.7, gradient);
    float t4 = smoothstep(0.3, 0.5, gradient);
    float t5 = smoothstep(0.15, 0.3, gradient);
    float t6 = smoothstep(0.0, 0.15, gradient);

    finalColor = mix(color6, color7, t6);
    finalColor = mix(finalColor, color5, t5);
    finalColor = mix(finalColor, color4, t4);
    finalColor = mix(finalColor, color3, t3);
    finalColor = mix(finalColor, color2, t2);
    finalColor = mix(finalColor, color1, t1);

    finalColor = mix(finalColor, color1, colorNoise * 0.82);
    finalColor = mix(finalColor, color5, colorShift * 0.5);

    vec2 aberration = curlForce * 0.02;
    vec3 aberrationColor = finalColor;
    aberrationColor.r = mix(finalColor.r, color1.r, length(aberration) * 2.0);
    aberrationColor.b = mix(finalColor.b, color4.b, length(aberration) * 1.5);
    aberrationColor.g = mix(finalColor.g, color5.g, length(aberration) * 1.2);

    float pulse1 = sin(time * 3.0 + st.y * 6.0) * 0.5 + 0.5;
    float pulse2 = sin(time * 4.5 - st.y * 8.0) * 0.5 + 0.5;
    float energyPulse = smoothstep(0.3, 0.7, pulse1 * pulse2);

    float intensity = finalShape * combinedStreaks * (1.0 + energyPulse * 0.4);
    intensity *= (1.0 + cells * 0.2);
    intensity *= u_intensity;

    vec2 mouse = u_mouse / u_resolution.xy;
    mouse = (mouse - 0.5) * 2.0;
    mouse.x *= u_resolution.x / u_resolution.y;
    float mouseInfluence = 1.0 - length(st - mouse) * 0.6;
    mouseInfluence = max(0.0, mouseInfluence);
    mouseInfluence = smoothstep(0.0, 1.0, mouseInfluence);
    intensity += mouseInfluence * 0.6;
    aberrationColor = mix(aberrationColor, color1, 0.3);

    vec3 result = aberrationColor * intensity;

    float bloom = smoothstep(0.4, 1.0, intensity) * 0.54;
    result += bloom * finalColor;

    result = pow(result, vec3(0.85));
    result = mix(result, result * result, 0.2);

    float vignette = 1.0 - length(uv - 0.5) * 0.85;
    vignette = smoothstep(0.2, 1.0, vignette);

    vec3 bgColor = vec3(0.02, 0.01, 0.12) + finalColor * 0.03;
    result = mix(bgColor, result, smoothstep(0.0, 0.4, intensity));
    result *= vignette;

    result = mix(vec3(dot(result, vec3(0.299, 0.587, 0.114))), result, 1.3);

    float grainAmount = 0.03; // Reduced for cleaner look
    float grainValue = grain(uv, time * 0.5) * 2.0 - 1.0;
    result += grainValue * grainAmount;

    // Removed scanline effect (barely visible, costs sin() per pixel)

    result *= 1.1;

    gl_FragColor = vec4(result, 1.0);
  }
`;

const WebGLBackground = ({ lowPower = false, paused = false }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const intensityRef = useRef(1.0);
  const targetIntensityRef = useRef(1.0);
  const startTimeRef = useRef(Date.now());
  const isVisibleRef = useRef(true);
  const isPausedRef = useRef(paused);

  useEffect(() => {
    isPausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resolutionScale = lowPower ? 0.55 : 1.0;
    const fpsInterval = 1000 / (lowPower ? 18 : 30);

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: lowPower ? 'low-power' : 'high-performance' });
    if (!gl) return;

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vertexShader);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uIntensity = gl.getUniformLocation(program, "u_intensity");

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * resolutionScale);
      canvas.height = Math.floor(window.innerHeight * resolutionScale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    // Throttled pointer response (disabled in low power mode)
    let mouseThrottleId = null;
    const onMouseMove = (e) => {
      if (lowPower) return;
      if (mouseThrottleId) return;
      mouseThrottleId = requestAnimationFrame(() => {
        mouseThrottleId = null;
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = (e.clientX - rect.left) * resolutionScale;
        mouseRef.current.y = (rect.height - (e.clientY - rect.top)) * resolutionScale;
        targetIntensityRef.current = 1.05;
        setTimeout(() => {
          targetIntensityRef.current = 1.0;
        }, 200);
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Page Visibility API — pause when tab is hidden
    const handleVisibility = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let animationId;
    let lastTime = 0;

    const animate = (timestamp) => {
      animationId = requestAnimationFrame(animate);

      // Skip rendering when tab is hidden
      if (!isVisibleRef.current || isPausedRef.current) return;

      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;

      if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval);

        const time = (Date.now() - startTimeRef.current) * 0.001;
        intensityRef.current += (targetIntensityRef.current - intensityRef.current) * 0.05;

        // Only set uniforms if locations are valid
        if (uTime) gl.uniform1f(uTime, time);
        if (uResolution) gl.uniform2f(uResolution, canvas.width, canvas.height);
        if (uMouse) gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
        if (uIntensity) gl.uniform1f(uIntensity, intensityRef.current);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationId);
      if (mouseThrottleId) cancelAnimationFrame(mouseThrottleId);
    };
  }, [lowPower]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, width: '100%', height: '100%', imageRendering: 'auto', opacity: lowPower ? 0.8 : 1 }}
    />
  );
};

export default WebGLBackground;
