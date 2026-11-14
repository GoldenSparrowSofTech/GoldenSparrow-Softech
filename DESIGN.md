# Golden Sparrow SofTech — Cinematic Cyber & Enterprise Design System

**Visual Direction:** Approved **Cinematic Midnight Navy & Electric Cyan**  
**Version:** 3.0  
**Supersedes:** Direction B (Initial navy) & Obsidian Aurum  

---

## 1. Core Color System

| Token | Hex | CSS Variable | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Main Canvas** | `#06111F` | `--bg-main` | Deep midnight navy background with subtle atmospheric illumination |
| **Secondary Canvas** | `#091A2A` | `--bg-secondary` | Deep dark blue/teal secondary canvas for alternating sections |
| **Elevated Surface** | `#0D2232` | `--surface-elevated` | Container panels, navigation, telemetry console body, scoping cards |
| **Card Surface** | `#102A3B` | `--surface-card` | Interactive cards, practice cards, review cards, leadership cards |
| **Primary Cyan** | `#00D9D0` | `--primary-cyan` | Luminous electric cyan: primary buttons, glowing accents, highlighted title words |
| **Secondary Cyan** | `#22C7E8` | `--secondary-cyan` | Bright sky cyan: secondary links, telemetry bars, sub-headings |
| **Primary Text** | `#F4F8FC` | `--text-primary` | Crisp ice white: headings, display titles, primary button text on dark |
| **Secondary Text** | `#A9BAC8` | `--text-secondary` | Soft cyan-slate: high-legibility technical body copy (contrast > 8:1) |
| **Muted Text** | `#718596` | `--text-muted` | Technical metadata, breadcrumbs, helper notes |
| **Structural Borders** | `#244052` | `--border-color` | 1px fine hairline borders on cards, navbars, inputs |
| **Active Border Glow** | `rgba(0, 217, 208, 0.4)` | `--border-cyan` | Interactive hover states, glowing card focus |

---

## 2. Typography

- **Headings & Display:** `Manrope` (weights 500, 600, 700, 800)
- **Body & Prose:** `Inter` (weights 400, 500, 600)
- **Telemetry & Technical Indicators:** `JetBrains Mono` (weights 400, 500, 600, 700)

### Typography Rules
- Large, bold headlines with deliberate line breaks.
- Strategic cyan accentuation: 1 or 2 high-impact words per headline wrapped in `<span class="text-cyan">...</span>`.
- High-contrast body copy (`#A9BAC8` on `#06111F` has 8.5:1 contrast, exceeding WCAG AAA).

---

## 3. Atmospheric Lighting & Depth

- **Radial Atmospheric Illumination:**
  `radial-gradient(ellipse at 50% 0%, rgba(0, 217, 208, 0.12) 0%, rgba(9, 26, 42, 0.4) 50%, transparent 80%)`
- **Technical Dot Grid Texture:**
  `background-image: radial-gradient(rgba(0, 217, 208, 0.08) 1px, transparent 1px); background-size: 32px 32px;`
- **Console Elevation Shadow:**
  `box-shadow: 0 20px 60px rgba(0, 217, 208, 0.08), 0 10px 30px rgba(0, 0, 0, 0.6);`

---

## 4. Components

### Primary Button (`.btn-cyan`)
- Background: `#00D9D0`
- Color: `#06111F` (high contrast 14:1)
- Border: `1px solid #00D9D0`
- Hover: `#22C7E8`, transform `-2px`, box-shadow `0 4px 20px rgba(0, 217, 208, 0.4)`

### Secondary Button (`.btn-dark-outline`)
- Background: `#0D2232`
- Color: `#F4F8FC`
- Border: `1px solid #244052`
- Hover: Border `#00D9D0`, color `#00D9D0`, transform `-2px`

### Technology Showcase Console
- Header: Linux terminal topbar with `#00D9D0` live pulse dot and telemetry metadata.
- Body: Multi-metric monitoring topology (Threat Mitigation, Kubernetes Clusters, DevSecOps Pipeline, Latency Graph).
