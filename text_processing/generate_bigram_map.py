#!/usr/bin/env python3
"""Generate TypeScript map for character transition probabilities."""

import json
from collections import defaultdict

def main():
    # Load bigram data
    with open('text_processing/vietnamese_bigram_frequencies.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    bigram_data = data['data']
    
    # Group by first character and calculate totals
    first_char_counts = defaultdict(dict)
    first_char_totals = defaultdict(int)
    
    for bigram, freq_data in bigram_data.items():
        if len(bigram) == 2:
            first_char = bigram[0]
            second_char = bigram[1]
            count = freq_data['count']
            
            first_char_counts[first_char][second_char] = count
            first_char_totals[first_char] += count
    
    # Generate TypeScript code
    ts_lines = [
        "/**",
        " * Vietnamese character transition probabilities",
        " * Map<firstChar, Map<secondChar, probability>>",
        " */",
        "",
        "export const vietnameseTransitions = new Map<string, Map<string, number>>([",
    ]
    
    sorted_chars = sorted(first_char_counts.keys())
    
    for i, first_char in enumerate(sorted_chars):
        second_chars = first_char_counts[first_char]
        total = first_char_totals[first_char]
        
        ts_lines.append(f"  ['{first_char}', new Map<string, number>([")
        
        sorted_second = sorted(second_chars.items(), key=lambda x: x[1], reverse=True)
        
        for j, (second_char, count) in enumerate(sorted_second):
            probability = round(count / total, 6)
            comma = "," if j < len(sorted_second) - 1 else ""
            ts_lines.append(f"    ['{second_char}', {probability}]{comma}")
        
        closing = "])]" + ("," if i < len(sorted_chars) - 1 else "")
        ts_lines.append(f"  {closing}")
    
    ts_lines.append("]);")
    
    # Write to file
    with open('src/app/utils/vietnameseTransitions.ts', 'w', encoding='utf-8') as f:
        f.write('\n'.join(ts_lines))
    
    print(f"Generated TypeScript map with {len(sorted_chars)} characters")
    print("File: src/app/utils/vietnameseTransitions.ts")

if __name__ == "__main__":
    main()