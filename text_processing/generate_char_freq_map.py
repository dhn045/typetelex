#!/usr/bin/env python3
"""Generate TypeScript map for single character frequencies."""

import json

def main():
    # Load character frequency data
    with open('text_processing/vietnamese_character_frequencies.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    char_data = data['data']
    
    # Generate TypeScript code
    ts_lines = [
        "/**",
        " * Vietnamese single character frequencies",
        " * Map<character, frequency> where frequency is percentage (0-100)",
        " */",
        "",
        "export const vietnameseCharacterFrequencies = new Map<string, number>([",
    ]
    
    # Sort by frequency (descending) for better readability
    sorted_chars = sorted(char_data.items(), 
                         key=lambda x: x[1]['frequency'], 
                         reverse=True)
    
    for i, (char, freq_data) in enumerate(sorted_chars):
        frequency = freq_data['frequency']
        comma = "," if i < len(sorted_chars) - 1 else ""
        ts_lines.append(f"  ['{char}', {frequency}]{comma}")
    
    ts_lines.append("]);")
    
    # Write to file
    with open('src/app/utils/vietnameseCharacterFrequencies.ts', 'w', encoding='utf-8') as f:
        f.write('\n'.join(ts_lines))
    
    print(f"Generated TypeScript character frequency map with {len(sorted_chars)} characters")
    print("File: src/app/utils/vietnameseCharacterFrequencies.ts")
    
    # Show top 10 characters
    print("\nTop 10 most frequent characters:")
    for char, freq_data in sorted_chars[:10]:
        print(f"  '{char}': {freq_data['frequency']}%")

if __name__ == "__main__":
    main()