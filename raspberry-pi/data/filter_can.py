import random


def merge_files_randomly(file1, file2, output_file):
    # Read lines from both files
    with open(file1, "r") as f1, open(file2, "r") as f2:
        lines1 = f1.readlines()
        lines2 = f2.readlines()

    # Combine both lists of lines
    combined_lines = lines1 + lines2

    # Shuffle the combined list randomly
    random.shuffle(combined_lines)

    # Write the shuffled lines to the output file
    with open(output_file, "w") as outfile:
        outfile.writelines(combined_lines)


# Specify the input and output file paths
file1 = "bms_can_strings.txt"  # Replace with your first input file path
file2 = "mc_can_strings.txt"  # Replace with your second input file path
output_file = "merged_output.txt"  # Replace with your output file path

# Merge the files with random order
merge_files_randomly(file1, file2, output_file)
