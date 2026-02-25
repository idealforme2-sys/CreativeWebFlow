# AI Engineering & Architecture Learnings
*(Persistent Rules & Patterns for this Codebase)*

This document serves as a self-reflective repository of critical mistakes, performance bottlenecks, and architectural rules discovered during the development of this application. **I must review this document whenever tackling complex state, animations, or performance issues.**

## 1. Frame Rate & Main Thread Exhaustion (The "Canvas + React" Trap)
**The Problem**: The app experienced severe CPU/GPU spikes and freezing because heavy `requestAnimationFrame` canvas loops (like parsing hundreds of particles) were inadvertently tied to React state changes or un-memoized components.
**The Solution**: 
*   **NEVER** bridge high-frequency WebGL or 2D Canvas render loops into React's render lifecycle (e.g., `setState` inside `requestAnimationFrame`).
*   Always use local scoping (closures) inside `useEffect` or `useRef` to handle canvas arrays.
*   Aggressively wrap static, heavy overlay components (like `Navbar`, `Footer`, `ParticlesBackground`) in `React.memo( () => {...} )` so global context/scroll changes do not force them to redraw.

## 2. Framer Motion "Observer" Flooding
**The Problem**: Extensive use of `whileInView` across mapped elements (like carousels, feature lists) caused Framer Motion to instantiate dozens of continuous Intersection Observers that polled the DOM simultaneously resulting in jittery scrolling.
**The Solution**:
*   Always explicitly set `viewport={{ once: true }}` for elements that do not require entering/exiting animations repeatedly.
*   Once an element animates in, it must go dormant to free up the browser's painting engine.

## 3. Z-Index and Stacking Context Conflicts
**The Problem**: Complex animated backgrounds (WebGL, glow orbs) overlapping with interactive foreground elements (buttons, forms) frequently caused pointer events to fail or visual clipping.
**The Solution**:
*   Enforce a strict Z-index hierarchy:
    *   `-10 to 0`: Global ambient backgrounds (WebGL, particles). Must have `pointer-events-none`.
    *   `10 to 40`: Section-specific backgrounds and structural cards.
    *   `50+`: Interactive UI (Buttons, Forms, Navbars). Must have `relative` or `absolute` positioning to establish context.

## 4. IDE Bloat & File System Freezes (The "Gemini Bloat" Trap)
**The Problem**: Over the course of deep web agent execution (visual testing, looping code changes), the local `.gemini/antigravity/brain` directory accumulated thousands of `browser_recordings` (`.webp`) and `screenshots`. This overloaded the IDE's file watcher and TypeScript language server, causing the IDE to crash ("App Not Responding").
**The Solution**:
*   Rely on Git as the *only* true persistent memory.
*   If IDE performance degrades, advise the user to **delete the `.gemini/antigravity/brain` folder entirely** to wipe the active tracking state, relying on the `git log` to seamlessly resume context in a new thread. The conversation history text is ephemeral; project history is immutable.

## 5. Event Throttling (Framer Motion Physics)
**The Problem**: `useSpring` and `useScroll` implementations (like `ScrollProgress`) were configured so tightly that they calculated micro-updates every frame, suffocating the UI thread.
**The Solution**:
*   Use looser physics: `stiffness: 50, damping: 40, mass: 0.5, restDelta: 0.01` limits the necessity for the engine to calculate sub-pixel interpolation on high-refresh-rate monitors.

---
*Created per `<MEMORY[user_global]>` self-improvement directive. Must be committed with 'agent' type.*
