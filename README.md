# Divit Singhal | Portfolio

A high-performance, interactive portfolio website engineered with a focus on **visual storytelling** and **system design**. 

Designed with an "Apple-inspired" aesthetic, this project moves away from static resumes, utilizing **physics-based animations**, **glassmorphism**, and **bento-grid layouts** to showcase work in Quantitative Finance and AI.

## ⚡️ Key Features

* **Bento Grid Architecture:** A modular, responsive grid layout that visualizes complex projects like HFT engines and distributed systems.
* **Physics-Based Motion:** Smooth, spring-physics transitions powered by **Framer Motion**.
* **Apple-Quality UI:** Deep OLED blacks, sub-pixel antialiased typography (Inter/Geist), and multi-layered backdrop blurs.
* **Performance Optimized:** Built on **Next.js (App Router)** for server-side rendering and lightning-fast FCP (First Contentful Paint).
* **Interactive Visualizations:**
    * *Chronos-ITCH:* Abstract data-stream visualizations.
    * *Titan Orchestrator:* Interactive node topology backgrounds.

## 🛠 Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animation:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Deployment:** [Vercel](https://vercel.com/)

## 📂 Featured Projects

### 1. Chronos-ITCH
A high-frequency trading (HFT) feed handler for NASDAQ TotalView-ITCH 5.0.
* **Specs:** <1µs latency, Zero-Copy parsing.
* **Tech:** C++20, Python bindings.

### 2. Titan Orchestrator
A cloud-native distributed job scheduler.
* **Architecture:** Master-Worker topology on AWS Fargate.
* **Tech:** .NET 8, gRPC, Redis.

### 3. EzyGut
AI-powered digestive health tracker.
* **Features:** Voice logging, clinical reporting.
* **Tech:** iOS (SwiftUI), CoreML.

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/portfolio-website.git](https://github.com/your-username/portfolio-website.git)
    cd portfolio-website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Design Philosophy

This site treats the **user interface as a product**. 
- **Typography:** Uses negative tracking (`tracking-tight`) for headings to mimic editorial print design.
- **Lighting:** Implements "spotlight" effects where the UI reacts to cursor movement, simulating a light source.
- **Depth:** Uses distinct layers (Background -> Noise Texture -> Glass Card -> Content) to create z-axis separation without 3D libraries.

---

© 2026 Divit Singhal. All Rights Reserved.