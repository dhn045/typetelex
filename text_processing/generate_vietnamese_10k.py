#!/usr/bin/env python3
"""Generate ~10,000 Vietnamese words for n-gram modeling."""

import re
import random
import sys

def is_vietnamese_word(word):
    """Check if word contains only Vietnamese alphabetic characters."""
    # Exclude f, j, w, z but keep q and x as they are valid in Vietnamese
    vietnamese_pattern = r'^[a-eghiklmnopqrstuvxyàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ]+$'
    return bool(re.match(vietnamese_pattern, word))

def load_vietnamese_words(filename):
    """Load Vietnamese words and frequencies from file."""
    words = []
    frequencies = []
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and ' ' in line:
                    parts = line.rsplit(' ', 1)
                    if len(parts) == 2:
                        word, freq_str = parts
                        try:
                            freq = int(freq_str)
                            if is_vietnamese_word(word) and len(word) >= 2:
                                words.append(word)
                                frequencies.append(freq)
                        except ValueError:
                            continue
    except FileNotFoundError:
        print(f"Error: Could not find {filename}")
        sys.exit(1)
    
    return words, frequencies

def weighted_random_choice(words, frequencies):
    """Choose a word randomly weighted by frequency."""
    total = sum(frequencies)
    r = random.randint(1, total)
    cumsum = 0
    for i, freq in enumerate(frequencies):
        cumsum += freq
        if r <= cumsum:
            return words[i]
    return words[-1]  # fallback

def generate_corpus(words, frequencies, target_words=10000):
    """Generate a corpus of target_words Vietnamese words."""
    corpus_words = []
    for _ in range(target_words):
        word = weighted_random_choice(words, frequencies)
        corpus_words.append(word)
    return corpus_words

def main():
    print("Loading Vietnamese word frequencies...")
    words, frequencies = load_vietnamese_words('text_processing/vietnamese_sample.txt')
    
    print(f"Loaded {len(words)} valid Vietnamese words")
    
    if len(words) == 0:
        print("No valid Vietnamese words found!")
        sys.exit(1)
    
    print("Generating 10,000 word corpus...")
    corpus_words = generate_corpus(words, frequencies, 10000)
    
    # Join words with spaces to create readable text
    corpus_text = ' '.join(corpus_words)
    
    # Save to file
    with open('text_processing/vietnamese_10k_words.txt', 'w', encoding='utf-8') as f:
        f.write(corpus_text)
    
    print(f"Generated corpus with {len(corpus_words)} words")
    print(f"Total characters: {len(corpus_text)}")
    print(f"Saved to: text_processing/vietnamese_10k_words.txt")
    
    # Show preview
    preview_words = corpus_words[:50]
    print(f"\nPreview (first 50 words):")
    print(' '.join(preview_words))

if __name__ == "__main__":
    main()