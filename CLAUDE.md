# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TypeTelex is a React-based Vietnamese typing trainer that teaches users how to type Vietnamese text using the Telex input method. The application uses progressive difficulty - starting with basic letters and gradually introducing Vietnamese diacritics and tones.

## Common Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Core Concept
The app teaches Vietnamese typing using the **Telex input method** where Vietnamese characters are typed using ASCII sequences:
- `aa` → `â` (circumflex)
- `aw` → `ă` (breve)
- `as` → `á` (acute tone)
- `dd` → `đ` (stroke)

### Key Components

**TypingInterface** (`src/app/components/TypingInterface.tsx`)
- Main application component that orchestrates the typing experience
- Manages cursor position, letter validation, and progression through difficulty levels
- Uses performance metrics (WPM > 30, accuracy > 90%) to advance to next character set

**TextDisplay** (`src/app/components/TextDisplay.tsx`)
- Renders the practice text with visual feedback for correct/incorrect/partial matches
- Supports different use cases (main display vs progression display)

**ProgressionDisplay** (`src/app/components/ProgressionDisplay.tsx`)
- Shows the user's progress through the Vietnamese character progression
- Highlights currently focused character for practice

### Core Hooks

**useTelex** (`src/app/hooks/useTelex.ts`)
- Handles keyboard input and converts Telex sequences to Vietnamese characters
- Maintains a character buffer for multi-character sequences (e.g., `aa` → `â`)

**useTextGenerator** (`src/app/hooks/useTextGenerator.ts`)
- Generates practice text using real Vietnamese words filtered by available character set
- Ensures generated text contains the target character being learned

**useMetrics** (`src/app/hooks/useMetrics.ts`)
- Tracks typing speed (WPM) and accuracy in real-time
- Used to determine when user can progress to next difficulty level

### Letter Progression System

The app uses `LETTER_PROGRESSION` from `src/app/utils/vietnameseLetterProgression.ts`:

1. **Base letters** (a-z) introduced by frequency
2. **Basic diacritics** (â, ê, ô, đ, ư, ơ, ă)
3. **Tones on base vowels** (á, à, ả, ã, ạ etc.)
4. **Combined diacritics + tones** (ắ, ầ, ệ, ộ, ợ, ự etc.)

Users must achieve WPM > 30 and accuracy > 90% to unlock the next character set.

### Telex Implementation

**TELEX_MAP** (`src/app/utils/telex.tsx`)
- Maps ASCII sequences to Vietnamese characters
- **REVERSE_TELEX_MAP**: Vietnamese characters back to ASCII sequences
- **TELEX_INTERMEDIATE_FORMS**: Defines partial matches (e.g., 'a' is valid intermediate for 'ấ')

### Text Generation

Uses real Vietnamese dictionary (`src/app/utils/vietnameseWords.ts`) filtered by:
- Available character set (based on progression level)
- Target character requirement (newly introduced character must appear)

## Key Behaviors

- **Partial matching**: Typing 'a' when 'ấ' is expected shows as "partially correct"
- **Progressive difficulty**: New characters only unlocked after performance threshold
- **Real words only**: Generated text uses actual Vietnamese vocabulary
- **Escape key**: Regenerates practice text
- **Space prevention**: Space key preventDefault to avoid page scrolling

## File Structure

```
src/
├── app/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   └── utils/          # Core logic and data
│       ├── telex.tsx                      # Telex input method mappings
│       ├── vietnameseLetterProgression.ts # Character difficulty progression
│       ├── vietnameseWords.ts             # Dictionary for text generation
│       └── vietnameseCharacterFrequencies.ts # Letter frequency data
└── main.tsx           # App entry point
```