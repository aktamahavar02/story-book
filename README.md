# 📚 Kid Imagine Storybook Store (Frontend Application)

A modern, highly interactive React frontend web application designed for listing, exploring, and purchasing children's storybooks. This platform provides users with a seamless UI to browse books, view detailed information, and manage their selections through a dynamic shopping cart.

## 🎨 Frontend (FE) Features & Content

### 1. Interactive Book Catalog (Listing)
- **Rich UI:** Beautiful grid and list views for exploring storybooks.
- **Filtering & Search:** Easily find books by category, author, or search terms dynamically.
- **Animations:** Engaging page transitions and micro-interactions powered by **Framer Motion**, giving the store a magical, kid-friendly feel.

### 2. State & Cart Management (Information Storage)
- **Dynamic Cart:** Instant updates when adding or removing books.
- **Redux Toolkit (`react-redux`):** Centralized global state management to handle complex cart logic, user preferences, and sessions across all pages reliably.
- **React Query (`@tanstack/react-query`):** Efficient server-state management for fetching, caching, and updating book listings without unnecessary API calls.

### 3. Modern Design System
- **Tailwind CSS:** Utility-first styling for rapid, responsive design that looks great on mobile and desktop.
- **shadcn/ui:** Accessible, customizable, and polished pre-built components (buttons, dialogs, forms) to ensure a premium user experience.
- **Lucide Icons (`lucide-react`):** Crisp and clean iconography used throughout the storefront.

### 4. User Experience & Forms
- **Seamless Checkout Flow:** Secure integration points for purchasing books via Stripe.
- **Smart Forms:** Utilizes **React Hook Form** paired with **Zod** or **Yup** for lightning-fast, error-proof user inputs during login and checkout.
- **Toast Notifications:** Instant visual feedback for user actions (like "Book added to cart!") using `sonner` or `react-hot-toast`.

---

## 💻 Tech Stack Overview

- **Framework:** React 18 (TypeScript) via Vite
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Animations:** Framer Motion, Tailwind Animate
- **State/Data Fetching:** Redux Toolkit, React Query, Axios
- **Form Handling:** React Hook Form, Zod

---

## 🚀 Getting Started (Frontend Workspace)

### Prerequisites
- **Node.js** (v18.x or newer recommended)
- **npm** or **yarn**

### 1. Setup the Environment

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd kid-imagine-storybook-craft

# Navigate specifically to the frontend workspace
cd frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` (or the port Vite provides) in your browser to start browsing the book list and testing the interactive cart UI!

---

## 📁 Frontend Directory Structure

```text
frontend/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── assets/             # Global styles (index.css with Tailwind)
│   ├── components/         # Reusable UI components (Buttons, Cards, Navbar)
│   │   └── ui/             # shadcn/ui base components
│   ├── features/           # Feature-specific logic (Cart, Books, Auth)
│   ├── pages/              # Main route components (Home, Shop, Checkout)
│   ├── store/              # Redux slices and store configuration
│   ├── hooks/              # Custom React hooks (e.g., useCart)
│   ├── utils/              # Helper functions and API clients
│   ├── App.tsx             # Root application component
│   └── main.tsx            # React DOM entry point
├── index.html              # HTML template
├── tailwind.config.js      # Tailwind design tokens
├── vite.config.ts          # Vite configuration
└── package.json            # Frontend dependencies
```

## 🛠 Available Scripts

- `npm run dev` - Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build` - Builds the optimized, production-ready frontend bundle.
- `npm run lint` - Runs ESLint to maintain code quality.
- `npm run preview` - Locally previews the production build.

---

## 📄 License
This application is licensed under the MIT License.
