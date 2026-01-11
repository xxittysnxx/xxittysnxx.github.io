# Cyberpunk 2077 Portfolio Website

A personal portfolio website designed with a fully immersive **Cyberpunk 2077** aesthetic. This project showcases software engineering skills, projects, and professional experience using a futuristic, glitch-styled interface.

## 🚀 Features

### 🎨 Visual & UI Design
-   **Cyberpunk Aesthetic**: High-contrast Neon Yellow (`#FCEE0A`), Cyan (`#00F0FF`), and Red (`#FF003C`) color palette on a dark grid background.
-   **Glitch Effects**: CSS-based glitch animations on texts, buttons, and images.
-   **Angular UI**: Chamfered edges (using `clip-path`) on cards, buttons, and containers to mimic in-game UI.
-   **Scanlines & Noise**: CRT monitor overlay effects for retro-futuristic atmosphere.

### ⚡ Interactive Elements
-   **Terminal Typing**: An automated terminal on the homepage that types out "Initializing Neural Link..." and session info.
-   **Identity Protocol Swap**: Clickable profile picture that triggers a glitch animation and swaps between two user avatars (`ai_profile.png` <-> `cyber_profile.png`).
-   **Skill HUD**: Dynamic progress bars that animate from 0% when scrolled into view.

### 🔗 GitHub Auto-Fetch Integration
-   **Smart Project Listing**: 
    -   Key projects are manually curated and categorized (Web, VR, AI, etc.) in `projects.html`.
    -   **Auto-Fetch**: A JavaScript script automatically connects to the **GitHub API** to fetch any *new* public repositories.
    -   **Duplicate Protection**: The script intelligently filters out projects that are already manually listed, preventing duplicates.
    -   **Live Updates**: Any new repo you make public on GitHub will automatically appear in the "**System.Other_Projects_**" section at the bottom of the Projects page.
-   **Status Indicators**: Displays loading states (`// ACCESSING_GITHUB_DATABASE...`) or error messages if the API call fails.

## 🛠️ Technology Stack
-   **HTML5**: Semantic structure.
-   **CSS3**: Custom properties (variables), Flexbox/Grid layout, Keyframe animations, Clip-path.
-   **JavaScript (ES6+)**: DOM manipulation, IntersectionObserver API, Fetch API.
-   **Fonts**: Google Fonts (`Orbitron`, `Share Tech Mono`, `Rajdhani`) for authentic sci-fi typography.

## 📂 File Structure
```
.
├── index.html       # Homepage (Hero, Bio, Skills)
├── about.html       # Experience & Education Timeline
├── projects.html    # Categorized Projects & Auto-Fetch
├── styles.css       # Global Cyberpunk Theme Styles
├── script.js        # Logic for Terminal, Animations, and API
├── assets/          # Images and Documents
│   ├── ai_profile.png
│   ├── cyber_profile.png
│   └── CV.pdf
└── README.md        # Project Documentation
```

## 📦 Usage
1.  **Clone or Download** the repository.
2.  **Open `index.html`** in any modern web browser.
3.  **GitHub Token (Optional)**: The auto-fetch runs on the public unauthenticated GitHub API (limit: 60 requests/hr). For higher limits or private repos, you would need to implement a proxy server with a token, but this static version works out-of-the-box for public data.

---
*EST. 2026 // END OF LINE_*
