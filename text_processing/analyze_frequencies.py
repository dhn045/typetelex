#!/usr/bin/env python3
"""
Analyze Vietnamese corpus to generate character, bigram, and trigram frequencies.
Output as JSON files for use in TypeTelex application.
"""

import json
import re
from collections import Counter, defaultdict

def load_corpus(filename):
    """Load the Vietnamese corpus from file."""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            text = f.read()
        return text
    except FileNotFoundError:
        print(f"Error: Could not find {filename}")
        return ""

def extract_characters(text):
    """Extract only Vietnamese alphabetic characters (no spaces or punctuation)."""
    vietnamese_pattern = r'[a-zA-ZàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ]'
    characters = re.findall(vietnamese_pattern, text)
    return ''.join(characters).lower()

def calculate_character_frequencies(text):
    """Calculate frequency of each character."""
    char_counts = Counter(text)
    total_chars = len(text)
    
    # Convert to frequencies (percentages)
    char_frequencies = {}
    for char, count in char_counts.items():
        char_frequencies[char] = {
            'count': count,
            'frequency': round((count / total_chars) * 100, 4)
        }
    
    return char_frequencies

def calculate_bigram_frequencies(text):
    """Calculate frequency of character bigrams."""
    bigrams = []
    for i in range(len(text) - 1):
        bigrams.append(text[i:i+2])
    
    bigram_counts = Counter(bigrams)
    total_bigrams = len(bigrams)
    
    # Convert to frequencies
    bigram_frequencies = {}
    for bigram, count in bigram_counts.items():
        bigram_frequencies[bigram] = {
            'count': count,
            'frequency': round((count / total_bigrams) * 100, 4)
        }
    
    return bigram_frequencies

def calculate_trigram_frequencies(text):
    """Calculate frequency of character trigrams."""
    trigrams = []
    for i in range(len(text) - 2):
        trigrams.append(text[i:i+3])
    
    trigram_counts = Counter(trigrams)
    total_trigrams = len(trigrams)
    
    # Convert to frequencies
    trigram_frequencies = {}
    for trigram, count in trigram_counts.items():
        trigram_frequencies[trigram] = {
            'count': count,
            'frequency': round((count / total_trigrams) * 100, 4)
        }
    
    return trigram_frequencies

def save_frequencies_json(data, filename, description):
    """Save frequency data to JSON file with metadata."""
    output = {
        'description': description,
        'total_items': len(data),
        'data': data
    }
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"Saved {len(data)} items to {filename}")

def get_top_items(frequencies, n=20):
    """Get top N items by frequency for display."""
    sorted_items = sorted(frequencies.items(), 
                         key=lambda x: x[1]['frequency'], 
                         reverse=True)
    return sorted_items[:n]

def main():
    corpus_file = 'text_processing/vietnamese_10k_words.txt'
    
    print("Loading Vietnamese corpus...")
    text = load_corpus(corpus_file)
    
    if not text:
        print("Could not load corpus!")
        return
    
    print(f"Corpus loaded: {len(text)} characters")
    
    # Extract only Vietnamese characters (lowercase)
    clean_text = extract_characters(text)
    print(f"Clean text: {len(clean_text)} Vietnamese characters")
    
    # Calculate frequencies
    print("\nCalculating character frequencies...")
    char_freq = calculate_character_frequencies(clean_text)
    
    print("Calculating bigram frequencies...")
    bigram_freq = calculate_bigram_frequencies(clean_text)
    
    print("Calculating trigram frequencies...")
    trigram_freq = calculate_trigram_frequencies(clean_text)
    
    # Save to JSON files
    save_frequencies_json(
        char_freq, 
        'text_processing/vietnamese_character_frequencies.json',
        'Vietnamese character frequencies from 10k word corpus'
    )
    
    save_frequencies_json(
        bigram_freq, 
        'text_processing/vietnamese_bigram_frequencies.json',
        'Vietnamese character bigram frequencies from 10k word corpus'
    )
    
    save_frequencies_json(
        trigram_freq, 
        'text_processing/vietnamese_trigram_frequencies.json',
        'Vietnamese character trigram frequencies from 10k word corpus'
    )
    
    # Show top items for preview
    print("\n" + "="*50)
    print("ANALYSIS SUMMARY")
    print("="*50)
    
    print(f"\nTop 20 Characters:")
    for char, data in get_top_items(char_freq, 20):
        print(f"  '{char}': {data['frequency']}% ({data['count']} occurrences)")
    
    print(f"\nTop 15 Bigrams:")
    for bigram, data in get_top_items(bigram_freq, 15):
        print(f"  '{bigram}': {data['frequency']}% ({data['count']} occurrences)")
    
    print(f"\nTop 10 Trigrams:")
    for trigram, data in get_top_items(trigram_freq, 10):
        print(f"  '{trigram}': {data['frequency']}% ({data['count']} occurrences)")
    
    print(f"\nFiles generated:")
    print(f"  - vietnamese_character_frequencies.json ({len(char_freq)} characters)")
    print(f"  - vietnamese_bigram_frequencies.json ({len(bigram_freq)} bigrams)")
    print(f"  - vietnamese_trigram_frequencies.json ({len(trigram_freq)} trigrams)")

if __name__ == "__main__":
    main()