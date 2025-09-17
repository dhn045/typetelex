# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

TypeTelex is a web app that aims to help learn to touch type vietnamese telex. Using a system of
gradually introducing characters and character combinations based on current skill level, it aims to
engage users at the level they are at so they can improve. It's built as a React TypeScript application
using Vite for fast development and building.

## Development Commands

### Core Development
- `npm run dev` - Start the development server with hot reloading (uses Vite)
- `npm run build` - Build the production application (TypeScript compilation + Vite build)
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint on the codebase

### TypeScript
- `npx tsc --noEmit` - Type check without emitting files
- `npx tsc -b` - Build TypeScript project references (used in build script)

## Architecture Overview

### Core Components Architecture
The application follows a clean React component architecture:

- **`App.tsx`** - Root component that renders the main typing interface with Vietnamese pangram text
- **`TypingInterface`** - UI component that manages cursor position and reacts to typed characters
- **`LetterDisplay`** - Presentational component for individual letters with typing states
- **`useTelex`** - Custom hook that handles all keyboard input processing and telex conversion

### Key Features Implementation

#### Telex Input System (`src/utils/telex.tsx`)
- Comprehensive Telex mapping for Vietnamese diacritics
- Supports all Vietnamese tone marks: acute (s), grave (f), hook (r), tilde (x), dot below (j)
- Handles combined diacritics: circumflex (double vowels), breve (w suffix), horn (w suffix)
- Example mappings: `aa` → `â`, `aw` → `ă`, `as` → `á`, `aas` → `ấ`

#### State Management Pattern
Uses hooks (both built-in and custom) as the primary state management solution:
- Custom hooks encapsulate complex logic and state (e.g., `useTelex` for input processing)
- Built-in hooks (`useState`, `useEffect`) handle component-level state and side effects
- Clean separation between hook state (internal logic) and component state (UI concerns)

#### Text Display Logic
- Automatically splits text into two lines at midpoint
- Visual feedback for typed vs untyped characters
- Cursor position tracking across both lines

### Build Configuration

#### Vite Configuration
- Uses `@vitejs/plugin-react-swc` for fast React compilation
- Standard Vite configuration for React development

#### TypeScript Setup
- Project references architecture with separate configs for app and build tools
- Strict TypeScript configuration with comprehensive linting rules
- ES2022 target with modern bundler module resolution

#### ESLint Configuration
- TypeScript ESLint with recommended rules
- React Hooks and React Refresh plugins
- Ignores `dist` directory in builds

## Project Organization

### Directory Structure Philosophy
- **`app/`** - Top-level directory containing all application-specific code
- Within `app/`, code is organized by type: `components/`, `hooks/`, `utils/`, `services/`, etc.
- As the project expands with additional features, new feature directories may be added at the same level as `app/`
- Shared components and hooks across features will be placed in top-level `components/` and `hooks/` directories (parallel to `app/`)

### File Structure Context
```
src/
├── app/                    # Main application code
│   ├── components/         # App-specific components
│   │   ├── LetterDisplay.tsx   # Individual letter rendering
│   │   └── TypingInterface.tsx # Main typing UI component
│   ├── hooks/             # App-specific custom hooks
│   │   └── useTelex.ts        # Telex input processing hook
│   ├── utils/
│   │   └── telex.tsx         # Vietnamese Telex input mappings
│   ├── App.tsx              # Root app component
│   └── App.css              # App-specific styles
├── main.tsx                # React app entry point
├── index.css               # Global styles
└── vite-env.d.ts           # Vite type definitions
```

### Future Expansion
As features are added, the structure may evolve to:
```
src/
├── app/                    # Core application
├── feature1/               # Feature-specific code
├── feature2/               # Another feature
├── components/             # Shared components across features
├── hooks/                  # Shared hooks across features
└── utils/                  # Shared utilities
```

## Architecture Changes

### Custom Hooks Implementation
The application now uses a custom hook pattern for better separation of concerns:

#### `useTelex` Hook (`src/app/hooks/useTelex.ts`)
- **Purpose**: Pure input processing - converts raw keyboard input to Vietnamese characters
- **Encapsulates**: Character buffer state, telex mapping logic, keyboard event handling
- **Exposes**: `currentLetter` (processed character), `resetBuffer()` function
- **Key Feature**: Handles both direct character input and multi-character telex sequences

#### Component Responsibilities
- **`TypingInterface`**: Manages cursor position, typing progress, and UI state
- **`LetterDisplay`**: Pure presentational component for individual letters
- **`App`**: Root component orchestration

## Development Guidelines

### Working with Telex Mappings
When modifying the Telex system:
- All mappings are case-sensitive and based on lowercase input
- Combined diacritics follow the pattern: base vowel + diacritic + tone  
- The `useTelex` hook automatically handles character buffer management
- Test with the provided Vietnamese pangram for comprehensive coverage

### Custom Hook Development
- The `useTelex` hook uses proper dependency arrays with `[charBuffer]`
- State updates are handled internally - components only receive the final processed letter
- Hook cleanup properly removes event listeners to prevent memory leaks

### Component Development
- Components use functional components with TypeScript interfaces
- Separate concerns: input processing (hooks) vs UI logic (components)  
- Use `useEffect` to react to hook state changes rather than direct event handling
- State management follows React best practices with proper dependency arrays

### Styling Approach
- CSS classes: `.letter`, `.cursor`, `.typed` for letter states
- `.typing-interface` and `.text-line` for layout structure
- Global styles in `index.css` and component styles in `App.css`

### TypeScript Standards
- Strict mode enabled with comprehensive linting
- Interface definitions for all component props
- Proper typing for event handlers and state variables