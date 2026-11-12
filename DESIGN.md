# Google Stitch Design System — Golden Sparrow SofTech

## 1. Design Vision & Vibe
- **Industry Persona**: Next-Generation Information Technology, Cloud & Software Engineering Consultancy.
- **Visual Vibe**: Precision engineering, deep space/midnight canvas, luminous tech cyan (`#0ea5e9`), radiant enterprise gold (`#f59e0b`), subtle cyber glassmorphism, and crisp typography.
- **Aesthetic Benchmark**: Stripe, Linear, Google Cloud, and Vercel.

---

## 2. Color Tokens
```css
:root {
  /* Brand Accents */
  --tech-cyan: #0ea5e9;
  --tech-cyan-glow: rgba(14, 165, 233, 0.35);
  --tech-indigo: #6366f1;
  --brand-gold: #f59e0b;
  --brand-gold-glow: rgba(245, 158, 11, 0.25);
  
  /* Canvas & Surfaces */
  --bg-midnight: #080d1a;
  --bg-slate: #0f172a;
  --bg-card: rgba(15, 23, 42, 0.75);
  --bg-card-hover: rgba(30, 41, 59, 0.85);
  --bg-light-surface: #f8fafc;
  
  /* Borders & Glass */
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-border-active: rgba(14, 165, 233, 0.4);
  --glass-blur: blur(16px);
  
  /* Typography */
  --text-primary: #0f172a;
  --text-on-dark: #f8fafc;
  --text-muted: #64748b;
  --text-muted-dark: #94a3b8;
}
```

---

## 3. Typography
- **Primary Body & Headings**: `Plus Jakarta Sans`, `Inter`, `Rubik`, sans-serif.
- **Hierarchy**:
  - `Display / Hero Title`: 54px - 64px, Extra Bold (800), tracking `-0.025em`, subtle gradient fill.
  - `Section Title`: 36px - 40px, Bold (700), tracking `-0.015em`.
  - `Card / Feature Title`: 20px - 22px, Semi-Bold (600).
  - `Tech Eyebrow / Badges`: 12px - 13px, Bold (700), uppercase, tracking `0.1em`.
  - `Body Text`: 16px, Normal (400), line-height `1.7`.

---

## 4. Components & Micro-interactions
- **Glassmorphic Navigation**:
  - High-density, horizontal layout with brand logo (56px) and sleek company wordmark.
  - Pinned sticky navbar with `backdrop-filter: blur(20px)` and slim translucent border.
- **Tech Badge Pill**:
  - Glowing dot indicator, animated pulse, gradient border.
- **Service Cards**:
  - Deep surface card with subtle cyber gradient border on hover (`0 10px 30px -10px rgba(14, 165, 233, 0.2)`).
  - Dynamic icon container with 45-degree rotated tech glyph and luminous glow.
- **Stats & Facts Counter**:
  - Glass cards with tech accent strips, glowing numeric values, and crisp micro-labels.
- **Buttons**:
  - Tech primary: Cyan to indigo gradient with subtle inner glow and hover elevation.
  - Tech outline: Translucent border with background fill on hover.
