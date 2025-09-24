/**
 * Vietnamese Letter Progression
 * 
 * Ordered list of letters to introduce progressively in typing practice
 * Starts with most common and simplest letters, gradually adding complexity
 * Includes base letters first, then letters with diacritics grouped by input method
 */

export const LETTER_PROGRESSION = [
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

  // Dấu sắc (rising tone) - acute accent (´) with base letters
  ['á', 'é', 'í', 'ó', 'ú', 'ý'],

  // Dấu huyền (falling tone) - grave accent (`) with base letters
  ['à', 'è', 'ì', 'ò', 'ù', 'ỳ'],

  // Dấu hỏi (question tone) - hook above (?) with base letters
  ['ả', 'ẻ', 'ỉ', 'ỏ', 'ủ', 'ỷ'],
  
  // Dấu ngã (broken tone) - tilde (~) with base letters
  ['ã', 'ẽ', 'ĩ', 'õ', 'ũ', 'ỹ'],

  // Dấu nặng (heavy tone) - dot below (.) with base letters
  ['ạ', 'ẹ', 'ị', 'ọ', 'ụ', 'ỵ'],

  // Dấu sắc (rising tone) - acute accent (´) with letters that have diacritics
  ['ắ', 'ấ', 'ế', 'ố', 'ớ', 'ứ'],

  // Dấu huyền (falling tone) - grave accent (`) with letters that have diacritics
  ['ằ', 'ầ', 'ề', 'ồ', 'ờ', 'ừ'],

  // Dấu hỏi (question tone) - hook above (?) with letters that have diacritics
  ['ẳ', 'ẩ', 'ể', 'ổ', 'ở', 'ử'],

  // Dấu ngã (broken tone) - tilde (~) with letters that have diacritics
  ['ẵ', 'ẫ', 'ễ', 'ỗ', 'ỡ', 'ữ'],

  // Dấu nặng (heavy tone) - dot below (.) with letters that have diacritics
  ['ặ', 'ậ', 'ệ', 'ộ', 'ợ', 'ự'],
]