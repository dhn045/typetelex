/**
 * Vietnamese Letter Progression
 * 
 * Ordered list of letters to introduce progressively in typing practice
 * Starts with most common and simplest letters, gradually adding complexity
 * Includes base letters first, then letters with diacritics grouped by input method
 */

export const letterProgression = [
  [
    // Level 1: Foundation Letters
    'n', 'h', 'a',

    // Level 2: Core Consonants
    // Essential consonants for Vietnamese structure
    't', 'c',

    // Level 3: High-Frequency Core
    // Most common letters completing basic vocabulary
    'i', 'g',

    // Level 4: Essential Vowels and Consonants
    // Key letters for word formation
    'm', 'u', 'y',

    // Level 5: Common Extensions
    // Frequent letters expanding vocabulary
    'l', 'o', 'd',

    // Level 6: Extended Consonants
    // Additional common consonants
    'k', 'v', 'r', 'b',

    // Level 7: Complete Base Alphabet
    // All non-tonal non-diacritical Vietnamese letters
    's', 'p', 'e', 'q', 'x',
  ],

  // Letters with diacritics from double letter sequence
  ['ô', 'â', 'ê', 'đ'],

  // Vowels with diacrities from `_w` sequence
  ['ư', 'ơ', 'ă'],

  // Dấu sắc (rising tone) - acute accent (´)
  ['á', 'ắ', 'ấ', 'é', 'ế', 'í', 'ó', 'ố', 'ớ', 'ú', 'ứ', 'ý'],

  // Dấu huyền (falling tone) - grave accent (`)
  ['à', 'ằ', 'ầ', 'è', 'ề', 'ì', 'ò', 'ồ', 'ờ', 'ù', 'ừ', 'ỳ'],

  // Dấu hỏi (question tone) - hook above (?)
  ['ả', 'ẳ', 'ẩ', 'ẻ', 'ể', 'ỉ', 'ỏ', 'ổ', 'ở', 'ủ', 'ử', 'ỷ'],
  
  // Dấu ngã (broken tone) - tilde (~)
  ['ã', 'ẵ', 'ẫ', 'ẽ', 'ễ', 'ĩ', 'õ', 'ỗ', 'ỡ', 'ũ', 'ữ', 'ỹ'],

  // Dấu nặng (heavy tone) - dot below (.)
  ['ạ', 'ặ', 'ậ', 'ẹ', 'ệ', 'ị', 'ọ', 'ộ', 'ợ', 'ụ', 'ự', 'ỵ']
]