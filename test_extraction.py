#!/usr/bin/env python3
"""
Test script to display extracted data from export_details.xlsx
"""

import pandas as pd
from process_excel import extract_export_details

def main():
    print("Data Extraction Test")
    print("=" * 40)
    
    # Extract data
    export_info = extract_export_details('export_details.xlsx')
    
    # Display summary
    print(f"\nCompany: {export_info['company']}")
    print(f"Buyer: {export_info.get('buyer', 'N/A')}")
    print(f"Quote No: {export_info.get('quote_no', 'N/A')}")
    print(f"Date: {export_info.get('date', 'N/A')}")
    
    print(f"\nTotal Products: {len(export_info['products'])}")
    print(f"Total Amount: ${export_info['total_amount']:,.2f}")
    print(f"Total Cartons: {export_info['total_cartons']:,.0f}")
    print(f"Total Gross Weight: {export_info['total_gross_weight']:,.1f}")
    print(f"Total Net Weight: {export_info['total_net_weight']:,.1f}")
    
    # Display first 5 products
    print("\nFirst 5 Products:")
    print("-" * 80)
    for i, product in enumerate(export_info['products'][:5]):
        print(f"{i+1}. {product['description'][:50]}...")
        print(f"   Qty: {product['qty']} {product['unit']}")
        print(f"   Unit Price: ${product['unit_price']:.2f}")
        print(f"   Amount: ${product['amount']:,.2f}")
        print()

if __name__ == "__main__":
    main() 