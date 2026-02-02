# Internal Developer Platform (IDP)

Internal Developer Platform designed to streamline service provisioning, deployment orchestration, and infrastructure monitoring. Built with a focus on developer experience (DX) .

---

<!-- ## ✨ Features

### 🚀 Deployment Orchestration
- **Deployment Wizard**: A multi-step workflow for launching services to Development, Staging, or Production.
- **Strategies**: Support for Rolling Updates and Blue-Green deployment strategies.
- **Safety Checks**: Automatic resource quota verification and health check validation.

### 🏗️ Service Provisioning
- **Service Creation Wizard**: Standardized templates for REST APIs, gRPC services, Workers, and Frontends.
- **Infrastructure-as-Code**: Automated provisioning of Kubernetes clusters or Serverless compute.
- **Database Attachments**: One-click provisioning for PostgreSQL, Redis, and MongoDB.

### 📊 Observability & Monitoring
- **Real-time Metrics**: High-performance charts for traffic, latency, and resource utilization.
- **Alerting System**: Centralized hub for critical, warning, and info alerts with filtering capabilities.
- **Health Indicators**: Instant visibility into system uptime and success rates.

### 🎨 Premium UI/UX
- **Theme System**: Three curated modes—**Deep Dark**, **Snow Light**, and **System Default**.
- **Minimalist Design**: Clean, distracting-free header with a streamlined user profile and notification hub.
- **Responsive Layout**: Fully optimized for various screen sizes with a collapsible sidebar.

--- -->

## 🛠️ Technology Stack

- **Core**: [React 19](https://react.dev/) (latest standards)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, Grid)
- **State Management**: React Context API (for Theme and Global State)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v19+)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mohan8398/Internal-Developer-Platform.git
   cd Internal-Developer-Platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open the application**:
   Navigate to `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```text
src/
├── components/       # Reusable UI and Layout components
│   ├── layout/       # Header, Sidebar, Wrapper
│   └── ui/           # Generic cards, stat items, etc.
├── context/          # Theme and Global state management
├── data/             # Mock data for platform simulation
├── pages/            # Page-level components (Dashboard, Monitoring, etc.)
├── App.jsx           # Routing and Main provider setup
├── main.jsx          # Entry point (React 19 pattern)
└── index.css         # Design system tokens and global styles
```

---

## 🛡️ Best Practices Followed
- **React 19 Standards**: Using `createRoot` and named exports for performance.
- **Modern CSS**: Using CSS variables for a robust, maintainable theme system.
