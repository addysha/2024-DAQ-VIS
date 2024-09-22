def merge_files(file1, file2, output_file):
    with open(file1, "r") as f1, open(file2, "r") as f2, open(output_file, "w") as outf:
        # Read lines from both files
        lines1 = f1.readlines()
        lines2 = f2.readlines()

        # Get the maximum length of the two lists
        max_len = max(len(lines1), len(lines2))

        # Merge the lines in zip-like manner
        for i in range(max_len):
            if i < len(lines1):
                outf.write(lines1[i])
            if i < len(lines2):
                outf.write(lines2[i])


# Usage example
merge_files("1.txt", "2.txt", "merged_output.txt")
