# Design System: Creative WebFlow - Local Business Agency

**Project Type:** Premium Agency Website for Local Businesses
**Target Audience:** Dentists, gyms, real estate agencies, restaurants, clinics, salons, service businesses

---

## 1. Visual Theme & Atmosphere

**Overall Vibe:** Dark, premium, tech-forward with an approachable edge
**Aesthetic:** Modern minimalist with neon accents and glassmorphism
**Mood:** Professional trust meets cutting-edge technology
**Density:** Spacious with intentional negative space

The design uses a deep cosmic black (#030014) as the foundation, creating a canvas that makes vibrant accent colors pop. The overall feel is "premium technology" but must now translate to "trustworthy results" for local businesses.

---

## 2. Color Palette & Roles

| Name | Hex | Role |
|------|-----|------|
| Cosmic Black | #030014 | Primary background, creates depth |
| Electric Cyan | #06b6d4 | Primary accent, CTAs, trust indicators |
| Vivid Pink | #d946ef | Secondary accent, energy, attention |
| Royal Purple | #a855f7 | Gradient transitions, premium feel |
| Ocean Blue | #3b82f6 | Links, interactive elements |
| Emerald | #10b981 | Success states, "available" indicators |
| Pure White | #ffffff | Text, cards at 3-10% opacity |

**Gradient Presets:**
- Primary: `linear-gradient(135deg, cyan → purple → pink)`
- Subtle: `linear-gradient(135deg, cyan/10%, purple/10%)`
- Text: `bg-gradient-to-b from-white via-white/90 to-white/40`

---

## 3. Typography Rules

**Font Families:**
- **Display/Body:** Inter (weights 100-900)
- **Monospace:** JetBrains Mono (technical accents)

**Heading Hierarchy:**
- H1: `text-[9vw]` on desktop, `font-black`, tight tracking `-0.04em`
- H2: `text-5xl md:text-6xl`, `font-bold`, tight tracking
- H3: `text-2xl md:text-3xl`, `font-semibold`
- Body: `text-base`, `font-normal`, slightly muted `text-white/80`

**Special Text Treatments:**
- Gradient text: `text-transparent bg-clip-text bg-gradient-to-r`
- Monospace badges: `font-mono text-[11px] uppercase tracking-[0.25em]`
- Stroke outlines: `WebkitTextStroke: 1px rgba(6, 182, 212, 0.3)`

---

## 4. Component Stylings

### Buttons
- **Primary (Rainbow):** Pill-shaped, animated gradient border, dark interior, white text
- **Secondary:** Ghost button, thin white border, rounded-full, hover → cyan border
- **Shape:** `rounded-full` (pill-shaped throughout)

### Cards/Containers
- **Background:** `rgba(255, 255, 255, 0.03)` with `backdrop-blur-20px`
- **Border:** `1px solid rgba(255, 255, 255, 0.08)`
- **Corners:** Generously rounded (`rounded-xl` or `rounded-2xl`)
- **Shadow:** Whisper-soft cyan glow on hover

### Badges/Status
- **Style:** Pill-shaped, glass background, thin border
- **Animation:** Pulsing dot for "available" states

### Forms/Inputs
- **Background:** Dark with subtle glass effect
- **Border:** Thin white/10% stroke, cyan on focus
- **Corners:** Medium rounded (`rounded-lg`)

---

## 5. Layout Principles

### Spacing Strategy
- **Section Padding:** `py-24 md:py-32` (generous vertical breathing room)
- **Container Max Width:** `max-w-7xl` centered with `px-6`
- **Component Gaps:** `gap-8` to `gap-16` depending on hierarchy

### Visual Hierarchy
- Hero dominates first viewport (80-100vh)
- Sections alternate between full-bleed and contained
- Dark overlays create depth layers

### Responsive Approach
- Mobile-first utilities
- Fluid typography with `vw` units
- Stack layouts on mobile, flex/grid on desktop

---

## 6. Motion & Animation

### Timing Functions
- **Ease Out Expo:** `cubic-bezier(0.16, 1, 0.3, 1)` - Premium feel
- **Entry animations:** Slide up with opacity, staggered delays

### Key Animations
- **Float:** `6s ease-in-out infinite` - Subtle movement
- **Gradient-X:** `3s ease infinite` - Animated gradients
- **Pulse-Glow:** `2s ease-in-out infinite` - Status indicators
- **Shimmer:** `2s linear infinite` - Loading/premium effect

---

## 7. Messaging Translation (Tech → Local Business)

| Tech Language | Local Business Translation |
|--------------|---------------------------|
| GSAP animations | Smooth, modern feel |
| Fast performance | Fast loading so customers don't leave |
| Responsive design | Looks perfect on phones |
| WebGL shaders | (Remove - not relevant) |
| Conversion focused | Turns visitors into customers |
| Premium digital craft | Professional, trustworthy design |

---

## 8. Image & Asset Guidelines

### Hero Section
- Abstract tech patterns okay but subtle
- Avoid literal business stock photos
- Prefer geometric patterns, gradients, particles

### Case Studies
- Clean mockup presentations
- Focus on results, not code
- Before/after comparisons effective

### Icons
- Lucide React icon set
- Consistent stroke width
- Cyan/purple accent colors

---

## 9. Trust Signals for Local Businesses

**What to Include:**
- ✓ Simple, clear communication language
- ✓ "No technical jargon" messaging
- ✓ Visible process steps
- ✓ Limited project availability (premium positioning)
- ✓ Mobile-first emphasis
- ✓ Speed and performance mentions

**What to Avoid:**
- ✗ Heavy tech jargon
- ✗ Framework/library name-dropping
- ✗ Abstract agency-speak
- ✗ Overwhelming technical features
