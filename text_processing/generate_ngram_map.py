#!/usr/bin/env python3
"""Generate TypeScript maps for n-gram frequencies (bigrams, trigrams, etc.)."""

import json
import sys
from collections import defaultdict

def generate_ngram_map(ngram_type, input_file, output_file, export_name):
    """Generate TypeScript map for n-gram frequencies."""
    
    # Load n-gram data
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    ngram_data = data['data']
    ngram_length = len(list(ngram_data.keys())[0]) if ngram_data else 0
    
    if ngram_length == 2:
        # Bigram: Map<firstChar, Map<secondChar, probability>>
        generate_bigram_map(ngram_data, output_file, export_name)
    elif ngram_length == 3:
        # Trigram: Map<string, Map<string, probability>> (first 2 chars -> third char)
        generate_trigram_map(ngram_data, output_file, export_name)
    else:
        print(f"Unsupported n-gram length: {ngram_length}")
        return False
    
    return True

def generate_bigram_map(bigram_data, output_file, export_name):
    """Generate TypeScript map for bigram transitions."""
    
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
        f" * Vietnamese character transition probabilities ({export_name})",
        " * Map<firstChar, Map<secondChar, probability>>",
        " */",
        "",
        f"export const {export_name} = new Map<string, Map<string, number>>([",
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
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(ts_lines))
    
    print(f"Generated TypeScript bigram map with {len(sorted_chars)} characters")
    return len(sorted_chars)

def generate_trigram_map(trigram_data, output_file, export_name):
    """Generate TypeScript map for trigram transitions."""
    
    # Group by first two characters and calculate totals
    prefix_counts = defaultdict(dict)
    prefix_totals = defaultdict(int)
    
    for trigram, freq_data in trigram_data.items():
        if len(trigram) == 3:
            prefix = trigram[:2]  # First two characters
            third_char = trigram[2]  # Third character
            count = freq_data['count']
            
            prefix_counts[prefix][third_char] = count
            prefix_totals[prefix] += count
    
    # Generate TypeScript code
    ts_lines = [
        "/**",
        f" * Vietnamese trigram transition probabilities ({export_name})",
        " * Map<prefix, Map<nextChar, probability>>",
        " * prefix is a 2-character string, nextChar is the following character",
        " */",
        "",
        f"export const {export_name} = new Map<string, Map<string, number>>([",
    ]
    
    sorted_prefixes = sorted(prefix_counts.keys())
    
    for i, prefix in enumerate(sorted_prefixes):
        third_chars = prefix_counts[prefix]
        total = prefix_totals[prefix]
        
        ts_lines.append(f"  ['{prefix}', new Map<string, number>([")
        
        sorted_thirds = sorted(third_chars.items(), key=lambda x: x[1], reverse=True)
        
        for j, (third_char, count) in enumerate(sorted_thirds):
            probability = round(count / total, 6)
            comma = "," if j < len(sorted_thirds) - 1 else ""
            ts_lines.append(f"    ['{third_char}', {probability}]{comma}")
        
        closing = "])]" + ("," if i < len(sorted_prefixes) - 1 else "")
        ts_lines.append(f"  {closing}")
    
    ts_lines.append("]);")
    
    # Write to file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(ts_lines))
    
    print(f"Generated TypeScript trigram map with {len(sorted_prefixes)} prefixes")
    return len(sorted_prefixes)

def main():
    if len(sys.argv) != 5:
        print("Usage: python3 generate_ngram_map.py <ngram_type> <input_file> <output_file> <export_name>")
        print("Examples:")
        print("  python3 generate_ngram_map.py bigram text_processing/vietnamese_bigram_frequencies.json src/app/utils/vietnameseTransitions.ts vietnameseTransitions")
        print("  python3 generate_ngram_map.py trigram text_processing/vietnamese_trigram_frequencies.json src/app/utils/vietnameseTrigrams.ts vietnameseTrigrams")
        sys.exit(1)
    
    ngram_type = sys.argv[1]
    input_file = sys.argv[2]
    output_file = sys.argv[3]
    export_name = sys.argv[4]
    
    success = generate_ngram_map(ngram_type, input_file, output_file, export_name)
    
    if success:
        print(f"File: {output_file}")
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()