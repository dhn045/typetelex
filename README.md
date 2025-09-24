# TypeTelex

A React-based Vietnamese typing trainer that teaches users how to type Vietnamese text using the Telex input method. The application uses progressive difficulty learning, starting with basic letters and gradually introducing Vietnamese diacritics and tones.

## Features

- **Progressive Learning**: Start with basic letters and gradually unlock Vietnamese characters
- **Telex Input Method**: Learn to type Vietnamese using ASCII sequences (e.g., `aa` → `â`, `as` → `á`)
- **Real-time Feedback**: Visual indicators for correct, incorrect, and partially correct characters
- **Performance Tracking**: Monitor your WPM (words per minute) and accuracy
- **Smart Text Generation**: Practice with real Vietnamese words filtered by your current skill level
- **Sequence Display**: Shows the key sequence needed to type Vietnamese characters
- **Word-based Wrapping**: Text wraps naturally without breaking words

## Telex Method Examples

The Telex input method converts ASCII key sequences into Vietnamese characters:

- **Circumflex (hat)**: `aa` → `â`, `ee` → `ê`, `oo` → `ô`
- **Breve**: `aw` → `ă`, `ow` → `ơ`, `uw` → `ư`
- **Stroke**: `dd` → `đ`
- **Tones**:
  - Rising (`s`): `as` → `á`, `es` → `é`
  - Falling (`f`): `af` → `à`, `ef` → `è`
  - Hook (`r`): `ar` → `ả`, `er` → `ẻ`
  - Tilde (`x`): `ax` → `ã`, `ex` → `ẽ`
  - Dot below (`j`): `aj` → `ạ`, `ej` → `ẹ`
- **Combined**: `aas` → `ấ`, `uws` → `ứ`, `awj` → `ặ`

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/typetelex.git
cd typetelex
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## How to Use

1. **Start Typing**: Begin by typing the displayed Vietnamese text
2. **Follow Sequences**: Use the sequence display to learn key combinations (e.g., `a + a = â`)
3. **Track Progress**: Monitor your WPM and accuracy in the top-right corner
4. **Advance Levels**: Maintain WPM > 30 and accuracy > 90% to unlock new characters
5. **Reset Text**: Press `Escape` to generate new practice text
6. **Partial Credit**: Typing base letters (like `a` for `á`) shows as "partially correct"

## Learning Progression

The app introduces Vietnamese characters in a carefully designed order:

1. **Foundation Letters**: Most common base letters (n, h, a, t, c, i, g, m, u, y, l, o, d, k, v, r, b, s, p, e, q, x)
2. **Basic Diacritics**: Circumflex, breve, and stroke (â, ê, ô, đ, ư, ơ, ă)
3. **Base Letter Tones**: Tones applied to basic vowels (á, à, ả, ã, ạ, é, è, etc.)
4. **Combined Characters**: Diacritics with tones (ắ, ầ, ệ, ộ, ợ, ự, etc.)

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **CSS3** - Styling with flexbox layout
- **ESLint** - Code linting

## Project Structure

```
src/
├── app/
│   ├── components/          # React components
│   │   ├── InfoDisplay.tsx  # Shows current character, sequence, and metrics
│   │   ├── SequenceDisplay.tsx # Displays Telex key sequences
│   │   ├── TextDisplay.tsx  # Main typing interface with word wrapping
│   │   ├── LetterDisplay.tsx # Individual character rendering
│   │   └── TypingInterface.tsx # Main application logic
│   ├── hooks/               # Custom React hooks
│   │   ├── useTelex.ts      # Telex input processing
│   │   ├── useTextGenerator.ts # Vietnamese text generation
│   │   └── useMetrics.ts    # WPM and accuracy tracking
│   └── utils/               # Core logic and data
│       ├── telex.tsx        # Telex conversion mappings
│       ├── vietnameseLetterProgression.ts # Learning progression
│       ├── vietnameseWords.ts # Dictionary for text generation
│       └── vietnameseCharacterFrequencies.ts # Letter frequency data
└── main.tsx                 # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Vietnamese language support and Telex input method
- Progressive typing education methodology
- Open source React and TypeScript ecosystem