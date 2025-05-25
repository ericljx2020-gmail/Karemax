# Excel Document Generator

This program automatically extracts information from `export_details.xlsx` and generates `baoguandan.xlsx` and `fapiao_xiangdan.xlsx` files in their original human-readable formats.

## Prerequisites

- Anaconda or Miniconda installed on your system
- Python 3.10+

## Setup Instructions

### 1. Create and Activate Conda Environment

```bash
# Create the conda environment from the environment.yml file
conda env create -f environment.yml

# Activate the environment
conda activate excel-processor
```

### 2. Verify Installation

```bash
# Check if all packages are installed correctly
python -c "import pandas, openpyxl, xlsxwriter, numpy; print('All packages installed successfully!')"
```

## Usage

### 1. Prepare Your Files

Make sure you have the following files in the project directory:
- `export_details.xlsx` - Source file with export data
- `baoguandan.xlsx` - Template file for 报关单 format
- `fapiao_xiangdan.xlsx` - Template file for 发票详单 format

### 2. Run the Program

```bash
# Make sure you're in the project directory and conda environment is activated
conda activate excel-processor

# Run the main processing script
python process_excel.py
```

### 3. Test Data Extraction (Optional)

To verify that data is being extracted correctly, you can run the test script:

```bash
# Run the test script to see extracted data summary
python test_extraction.py
```

### 4. Output Files

The program will generate:
- `baoguandan_generated.xlsx` - Generated 报关单 file
- `fapiao_xiangdan_generated.xlsx` - Generated 发票详单 file

Both files will maintain the original formatting and structure of the template files.

## File Structure

```
project-directory/
├── environment.yml                    # Conda environment configuration
├── README.md                         # This file
├── process_excel.py                  # Main processing script
├── test_extraction.py                # Test script for data verification
├── export_details.xlsx               # Source data file
├── baoguandan.xlsx                   # Template file for 报关单
├── fapiao_xiangdan.xlsx             # Template file for 发票详单
├── baoguandan_generated.xlsx        # Generated output (after running)
└── fapiao_xiangdan_generated.xlsx   # Generated output (after running)
```

## How It Works

1. **Data Extraction**: The program reads `export_details.xlsx` and extracts:
   - Company information (Karemax Industrial Limited)
   - Buyer information
   - Product details (item number, description, quantity, unit price, amount)
   - Totals (amount, weight, cartons)

2. **Template Processing**: 
   - Copies template files to preserve formatting
   - Uses openpyxl to safely update cells while maintaining merged cells and formatting
   - Handles permission issues by removing existing output files

3. **Data Population**:
   - Maps extracted data to appropriate cells in templates
   - Limits product count to fit template constraints
   - Adds totals and summary information

## Troubleshooting

### Common Issues

1. **Module not found errors**
   ```bash
   # Make sure the conda environment is activated
   conda activate excel-processor
   ```

2. **File not found errors**
   - Ensure all required input files are in the project directory
   - Check file names match exactly (case-sensitive)

3. **Permission errors**
   - Make sure the output files are not open in Excel
   - Check write permissions in the directory
   - Run: `chmod +w *.xlsx` to make files writable

4. **Merged cell warnings**
   - These are normal and expected - the program handles them gracefully
   - The warnings don't affect the final output

### Getting Help

If you encounter any issues:
1. Check that all required files are present
2. Ensure the conda environment is properly activated
3. Verify file permissions and that files are not locked by other applications
4. Use the test script to verify data extraction is working

## Technical Details

The program uses:
- **pandas** for data manipulation and Excel file reading/writing
- **openpyxl** for advanced Excel formatting preservation
- **xlsxwriter** for creating properly formatted Excel files
- **numpy** for numerical operations

The processing maintains the original formatting, formulas, and structure of the template files while populating them with data from the source file.

### Data Mapping

- **Export Details**: Parsed from rows 14+ in the source file
- **Products**: Item number, description, quantity, unit, price, amount
- **Totals**: Automatically calculated from product data
- **Templates**: Preserves all original formatting, merged cells, and styles 