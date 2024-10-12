# WESMO-2024
A collection of the WESMO software work 2024. Primarily focused on the data acquisition and visualisation on a web-based platform

## Contact
For questions, suggestions, or feedback regarding wesmo.co.nz, please reach out to 2024 senior software engineer, Hannah Murphy, murphyhk01@gmail.com

### Updating the WESMO Website
The `update_website.sh` is a bash script with all the required commands to update `wesmo.co.nz` with any new code changes in the **wesmo-app** repository. This script is currently only made to be run on the AWS EC2 instance where the website it hosted, this is primarily for security reasons. The application should already be active to run this script, as it is an **update** script not a deployment script.

If running the script on a new instance ensure that you run:

    `chmod +x update_website.sh`
    
before the first run, to have the correct permissions.