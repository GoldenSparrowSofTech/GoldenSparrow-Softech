# Golden Sparrow SofTech Website

Official responsive web application for **Golden Sparrow SofTech** — Next-Gen IT & Software Engineering.

---

## 🚀 Quick Start

### 1. Run with NPM (Recommended)
The project includes a pre-configured live-reloading dev server:

```bash
# Start dev server (auto-opens at http://127.0.0.1:5501)
npm start

# Or start headless dev server
npm run serve
```

### 2. Alternative Methods

#### VS Code Live Server
- Open the folder in VS Code.
- Click **"Go Live"** in the status bar (configured for port `5501` in `.vscode/settings.json`).

#### Python HTTP Server
```bash
python -m http.server 5501
```

---

## 📁 Project Structure

```
├── index.html              # Homepage
├── about.html              # Company Overview
├── service.html            # Services & Offerings
├── contact.html            # Contact & Inquiries
├── price.html              # Pricing & Packages
├── feature.html            # Key Features
├── team.html               # Leadership & Engineers
├── testimonial.html        # Client Testimonials
├── quote.html              # Request a Quote
├── blog.html / detail.html # Insights & Tech Articles
├── reviews.json            # Google My Business reviews data
├── get_reviews.php         # Optional PHP Google Places API cache proxy
├── css/
│   ├── bootstrap.min.css   # Bootstrap 5
│   └── style.css           # Custom styling & themes
├── js/
│   ├── main.js             # Navigation, counters, carousel logic
│   └── google-reviews.js   # Dynamic Google Reviews renderer
├── lib/                    # OwlCarousel, WOW.js, Animate.css, Waypoints
└── img/                    # Logos, banners, team and client images
```

---

## 🌟 Key Features
- **Responsive Layout**: Powered by Bootstrap 5 with mobile optimization.
- **Dynamic Google Reviews**: Displays verified client ratings with fallback to `reviews.json`.
- **Multi-language Support**: Integrated Google Translate element (English, Hindi, Gujarati).
- **Interactive Components**: Owl Carousel testimonials, animated statistics counters, and WOW.js scroll animations.
