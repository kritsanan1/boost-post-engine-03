# File Structure Documentation

## Project Overview
**SocialAI Pro** - A comprehensive social media management application built with React, TypeScript, Vite, and Tailwind CSS.

**Total Files:** 66+ files  
**Complexity Distribution:** 🟢 52 files (0-3 imports) | 🟡 12 files (4-7 imports) | 🔴 4 files (8+ imports)

## Directory Structure

### Root Configuration Files
```
📦 root/
├── 🟢 package.json                    # Project dependencies and scripts
├── 🟢 package-lock.json              # Dependency lock file
├── 🟢 vite.config.ts                 # Vite build configuration
├── 🟢 tailwind.config.ts             # Tailwind CSS configuration
├── 🟢 tsconfig.json                  # TypeScript configuration
├── 🟢 tsconfig.app.json              # App-specific TypeScript config
├── 🟢 tsconfig.node.json             # Node.js TypeScript config
├── 🟢 eslint.config.js               # ESLint configuration
├── 🟢 postcss.config.js              # PostCSS configuration
├── 🟢 components.json                # Shadcn/ui components configuration
├── 🟢 .gitignore                     # Git ignore patterns
├── 🟢 index.html                     # Main HTML entry point
└── 🟢 README.md                      # Project documentation
```

### Source Code Structure
```
📁 src/
├── 🟡 App.tsx                        # Main application component with providers
├── 🟢 main.tsx                       # React application entry point
├── 🟢 vite-env.d.ts                  # Vite environment type definitions
├── 🟢 App.css                        # Global application styles
├── 🟢 index.css                      # Root CSS with design system tokens
│
├── 📁 components/                     # Reusable UI components
│   ├── 🟡 Navigation.tsx             # Sidebar navigation with theme toggle
│   ├── 🔴 Header.tsx                 # Top header with search and user menu
│   ├── 🟢 MainPage.tsx               # Main page layout component
│   ├── 🔴 PostCreator.tsx            # Post creation form with AI suggestions
│   ├── 🟡 PostHistoryAndAnalytics.tsx # Analytics dashboard and post history
│   ├── 🟡 Dashboard.tsx              # Main dashboard with metrics
│   ├── 🔴 TeamManagement.tsx         # Team collaboration interface
│   ├── 🔴 DashboardCustomization.tsx # Settings and customization panel
│   ├── 🟢 theme-provider.tsx         # Theme context provider
│   │
│   └── 📁 ui/                        # Shadcn/ui component library
│       ├── 🟢 accordion.tsx          # Collapsible content component
│       ├── 🟢 alert-dialog.tsx       # Modal confirmation dialogs
│       ├── 🟢 alert.tsx              # Notification alert component
│       ├── 🟢 aspect-ratio.tsx       # Responsive aspect ratio container
│       ├── 🟢 avatar.tsx             # User profile picture component
│       ├── 🟢 badge.tsx              # Status and category labels
│       ├── 🟢 breadcrumb.tsx         # Navigation breadcrumb trail
│       ├── 🟡 button.tsx             # Interactive button with variants
│       ├── 🟢 calendar.tsx           # Date picker calendar
│       ├── 🟢 card.tsx               # Content container component
│       ├── 🟢 carousel.tsx           # Image/content carousel
│       ├── 🟢 chart.tsx              # Data visualization charts
│       ├── 🟢 checkbox.tsx           # Form checkbox input
│       ├── 🟢 collapsible.tsx        # Expandable content sections
│       ├── 🟢 command.tsx            # Command palette interface
│       ├── 🟢 context-menu.tsx       # Right-click context menus
│       ├── 🟢 dialog.tsx             # Modal dialog component
│       ├── 🟢 drawer.tsx             # Slide-out panel component
│       ├── 🟢 dropdown-menu.tsx      # Dropdown menu with options
│       ├── 🟢 form.tsx               # Form validation wrapper
│       ├── 🟢 hover-card.tsx         # Hover tooltip cards
│       ├── 🟢 input-otp.tsx          # One-time password input
│       ├── 🟢 input.tsx              # Text input field
│       ├── 🟢 label.tsx              # Form field labels
│       ├── 🟢 menubar.tsx            # Horizontal menu bar
│       ├── 🟢 navigation-menu.tsx    # Complex navigation component
│       ├── 🟢 pagination.tsx         # Page navigation controls
│       ├── 🟢 popover.tsx            # Floating content popover
│       ├── 🟢 progress.tsx           # Progress bar indicator
│       ├── 🟢 radio-group.tsx        # Radio button group
│       ├── 🟢 resizable.tsx          # Resizable panel layout
│       ├── 🟢 scroll-area.tsx        # Custom scrollable area
│       ├── 🟢 select.tsx             # Dropdown selection input
│       ├── 🟢 separator.tsx          # Visual content divider
│       ├── 🟢 sheet.tsx              # Side panel overlay
│       ├── 🟢 sidebar.tsx            # Application sidebar
│       ├── 🟢 skeleton.tsx           # Loading state placeholder
│       ├── 🟢 slider.tsx             # Range slider input
│       ├── 🟢 sonner.tsx             # Toast notification system
│       ├── 🟢 switch.tsx             # Toggle switch component
│       ├── 🟢 table.tsx              # Data table component
│       ├── 🟢 tabs.tsx               # Tabbed content interface
│       ├── 🟢 textarea.tsx           # Multi-line text input
│       ├── 🟢 toast.tsx              # Toast notification component
│       ├── 🟢 toaster.tsx            # Toast container and provider
│       ├── 🟢 toggle-group.tsx       # Toggle button group
│       ├── 🟢 toggle.tsx             # Toggle button component
│       ├── 🟢 tooltip.tsx            # Hover tooltip component
│       └── 🟢 use-toast.ts           # Toast hook utility
│
├── 📁 hooks/                         # Custom React hooks
│   ├── 🟢 use-mobile.tsx             # Mobile device detection hook
│   └── 🟢 use-toast.ts               # Toast notification hook
│
├── 📁 integrations/                  # External service integrations
│   └── 📁 supabase/
│       ├── 🟢 client.ts              # Supabase client configuration
│       └── 🟢 types.ts               # Database type definitions
│
├── 📁 lib/                           # Utility libraries
│   └── 🟢 utils.ts                   # Common utility functions
│
└── 📁 pages/                         # Application pages
    ├── 🟡 Index.tsx                  # Main application page
    └── 🟢 NotFound.tsx               # 404 error page
```

### Public Assets
```
📁 public/
├── 🟢 favicon.ico                    # Website favicon
├── 🟢 placeholder.svg               # Placeholder image asset
└── 🟢 robots.txt                    # Search engine crawler instructions
```

### Configuration Files
```
📁 supabase/
└── 🟢 config.toml                   # Supabase project configuration
```

## Complexity Analysis

### 🔴 High Complexity Files (8+ imports)
- **Header.tsx** - Complex navigation header with search, notifications, user menu, and theme controls
- **PostCreator.tsx** - Feature-rich post creation form with platform selection, scheduling, and AI integration
- **TeamManagement.tsx** - Comprehensive team collaboration interface with role management
- **DashboardCustomization.tsx** - Extensive settings panel with multiple configuration options

### 🟡 Medium Complexity Files (4-7 imports)
- **Navigation.tsx** - Sidebar navigation with theme switching
- **PostHistoryAndAnalytics.tsx** - Analytics dashboard with charts and metrics
- **Dashboard.tsx** - Main dashboard with multiple data visualizations
- **button.tsx** - Button component with multiple variants and styling options
- **Index.tsx** - Main page router with multiple view components

### 🟢 Low Complexity Files (0-3 imports)
- All UI components in the `ui/` directory
- Utility files and configuration files
- Most hook implementations
- Type definitions and constants

## Key Architectural Patterns

1. **Component-Based Architecture** - Modular React components with clear separation of concerns
2. **Design System Integration** - Consistent UI components using Shadcn/ui and Tailwind CSS
3. **Theme System** - Dark/light mode support with semantic color tokens
4. **Type Safety** - Full TypeScript implementation with strict type checking
5. **Modern React Patterns** - Hooks, context providers, and functional components
6. **Responsive Design** - Mobile-first approach with responsive breakpoints
7. **State Management** - React Query for server state, React Context for app state
8. **Code Organization** - Feature-based component grouping with shared utilities

## Technology Stack Summary

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and optimized builds
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** Shadcn/ui with Radix UI primitives
- **Icons:** Lucide React icon library
- **Form Handling:** React Hook Form with Zod validation
- **Date Management:** Date-fns for date utilities
- **Charts:** Recharts for data visualization
- **Backend:** Supabase for database and authentication
- **State Management:** TanStack React Query
- **Routing:** React Router DOM
- **Theme Management:** Next-themes for dark/light mode