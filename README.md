# Tobimarks Web App

Tobimarks is a modern, fast, and feature-rich bookmark management web application. It allows users to authenticate seamlessly via Google, save their favorite links, and organize them into easily manageable tags. Built on the latest web technologies, it provides a smooth, animated, and responsive user experience. 

## Key Features

- **Google OAuth Authentication**: Secure and fast login relying on `@react-oauth/google`.
- **Bookmark Management**: Create, read, update, and delete bookmarks.
- **Tagging System**: Organize your bookmarks powerfully using custom tags.
- **Modern UI/UX**: Styled completely with Tailwind CSS v4 and HeroUI, featuring clean animations powered by Framer Motion.
- **Dark/Light Mode**: Full theme customization directly out of the box using `next-themes`.

---

## Tech Stack

- **Framework**: React 19 (via Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + HeroUI
- **Routing**: React Router v7
- **State Management**: Zustand
- **Data Fetching/Caching**: TanStack React Query + Axios
- **Authentication**: `@react-oauth/google`
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## Prerequisites

Before starting, make sure you have the following installed on your machine:

- **Node.js**: v20 or higher
- **npm** (or `yarn`, `pnpm`): v10+ (npm is the default package manager used by Vite)
- **Tobimarks API**: You must have the Tobimarks backend API running locally (defaulting to `http://localhost:3000`).
- **Google Cloud Console**: A Google OAuth Client ID is required for authentication to function correctly.

---

## Getting Started

Follow these instructions to get the web app running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Jose-Maykol/tobimarks-web-app.git
cd tobimarks-web-app
```

### 2. Install Dependencies

You can use `npm` (or your preferred package manager) to install the necessary packages.

```bash
npm install
```

### 3. Environment Setup

Copy the example environment variables file to create a working `.env` file:

```bash
cp .env.example .env
```

Configure your `.env` by providing the required variables:

| Variable | Description | Example |
| -------- | ----------- | ------- |
| `VITE_API_URL` | The endpoint for your Tobimarks backend API. | `http://localhost:3000` |
| `VITE_GOOGLE_CLIENT_ID` | Your Google OAuth 2.0 Client ID for login. | `1234567890-xxx.apps.googleusercontent.com` |

> **Note:** To obtain a Google Client ID, head to the [Google Cloud Console](https://console.cloud.google.com/), create a project, and configure your OAuth consent screen and credentials.

### 4. Start Development Server

Run the application using the Vite development server:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

---

## Architecture Overview

The web application follows a feature-driven, highly modular frontend architecture that optimizes maintainability and readability.

### Directory Structure

```text
tobimarks-web-app/
├── public/                 # Static, uncompiled public assets
├── src/                    # Main application source code
│   ├── assets/             # Images, global styles, and fonts
│   ├── core/               # Shared global entities across the app
│   │   ├── components/     # UI Building Blocks (e.g., buttons, modals)
│   │   ├── config/         # App-wide configurations
│   │   ├── constants/      # App-wide constants
│   │   ├── interceptors/   # Axios interceptors (Auth headers, error handling)
│   │   ├── layouts/        # Global layout wrappers
│   │   └── providers/      # React context providers (Query, Auth, Theme)
│   ├── features/           # Feature modules encapsulating specific business logic
│   │   ├── auth/           # Login flow, Google OAuth handling, auth store
│   │   ├── bookmarks/      # Bookmark listing, creation, and editing
│   │   ├── home/           # Landing page / Home dashboard
│   │   ├── tags/           # Tag listing, creation, and mapping
│   │   └── user/           # User profile and settings
│   ├── App.tsx             # Root application router component
│   ├── index.css           # Global CSS and Tailwind entry point
│   ├── main.tsx            # Main React mounting layer
│   └── providers.tsx       # Consolidated provider wraps for the app
├── .env                    # Local environment variables (gitignored)
├── .env.example            # Sample environment variables
├── eslint.config.js        # ESLint flat config setup
├── index.html              # HTML entry point for the Vite app
├── package.json            # Scripts, dependencies, and metadata
├── tsconfig.json           # Main TypeScript configuration
└── vite.config.ts          # Vite build and plugins configuration
```

### Request Lifecycle

1. **User Action:** A user clicks "Save Bookmark" on the UI inside the `features/bookmarks` module.
2. **State & Mutation:** A TanStack React Query mutation is triggered using Axios for data transmission.
3. **Interceptors:** The query goes through `src/core/interceptors`, where the user's authentication token (managed by Zustand `auth` store) is automatically appended to the request headers.
4. **Network:** The frontend communicates with the backend via the `VITE_API_URL`.
5. **Response Handling:** On success, React Query updates the local cache, rendering the new bookmark instantly. On failure, error states are gracefully captured and displayed by HeroUI toast/alert components.

### Key Architectural Concepts

**Feature-Based Modules (`src/features/`)**
Instead of globbing all components together, code is split by domains (`auth`, `bookmarks`, `tags`). Inside a feature folder, you can expect its dedicated:
- `pages/`: Full page views for the route
- `components/`: Granular components only relevant to that feature
- `services/`: API Axios wrappers specific to the domain
- `store/`: Zustand slice stores for the specific feature context (if necessary)
- `types/`: Feature-specific TypeScript interfaces

**Global Store vs Server State**
- **Server State:** Handled gracefully via `@tanstack/react-query`. This avoids duplicating data fetching boilerplate and adds out-of-the-box caching and retry logic.
- **Client State:** Only volatile, UI-specific, or cross-feature client state (like Auth session context or sidebar toggling) is dropped into Zustand global stores.

**Google Authentication Flow**
- Configured via `<GoogleOAuthProvider>` inside `src/providers.tsx`.
- Initiates login in `src/features/auth/pages/login/components/LoginPage.tsx`.
- Captures the credential token provided by Google and validates it via the backend API.
- Stores the retrieved JWT into memory / standard storage and routes the user into the main dashboard wrapped inside `MainLayout`.

---

## Environment Variables

### Required
| Variable | Description |
| -------- | ----------- |
| `VITE_API_URL` | The absolute URL mapping to the backend API server. |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client identifier. |

> Note: All variables meant to be accessible on the client side in a Vite app MUST start with the `VITE_` prefix.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Spins up the Vite dev server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles TypeScript and builds the production-ready application via Vite. |
| `npm run lint` | Runs ESLint across the codebase using the flat config ruleset to catch errors. |
| `npm run preview` | Starts a local web server to preview and test the code built in the `dist/` directory. |

---

## Deployment

Since this project relies completely on a modern build pipeline via Vite, it packages easily into static assets that can be distributed anywhere (Vercel, Netlify, Render, Amazon S3, or via Docker). 

### Vercel (Recommended)
Vercel has zero-configuration support for Vite.
1. Push your code to a GitHub/GitLab repository.
2. Link the repository directly in the Vercel Dashboard.
3. Add the environment variables (`VITE_API_URL` and `VITE_GOOGLE_CLIENT_ID`) in Vercel.
4. Deploy! Vercel will automatically run `npm run build` and host the `dist/` folder.

### Netlify
Similar to Vercel, Netlify handles Vite out-of-the-box.
1. Connect the repository in Netlify.
2. Set Build Command to `npm run build`.
3. Set Publish Directory to `dist`.
4. Configure environment variables in the site settings.
5. Deploy Site.

### Docker (Nginx Static Serve)
If you wish to deploy manually on a VPS.

**1. Create a `Dockerfile`**
```dockerfile
# Build Stage
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Note: Ensure you pass the build-time args for VITE envs if baking into image
RUN npm run build

# Production Stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**2. Build & Run**
```bash
docker build -t tobimarks-web-app .
docker run -p 80:80 tobimarks-web-app
```

---

## Troubleshooting

### API Connection Issues
**Problem:** Bookmarks are not loading, or saving fails.
**Check:** Ensure `VITE_API_URL` is correct and does NOT have a trailing slash (e.g., `http://localhost:3000` instead of `http://localhost:3000/`). Ensure the backend server is concurrently running.

### Google Login Fails or Blank Popup
**Problem:** The Google consent popup comes up blank or immediately closes.
**Check:** Make sure your `VITE_GOOGLE_CLIENT_ID` is populated correctly. Verify in Google Cloud Console that the Authorized JavaScript Origins matches your development URL (e.g., `http://localhost:5173`).

### ESLint Flat Config Issues
**Problem:** `npm run lint` gives parsing or plugin resolving errors.
**Check:** Make sure you are using Node 20+, which correctly supports the new `eslint.config.js` format and ECMA features used by modern plugins like `eslint-plugin-react-refresh`.
