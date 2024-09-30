#!/bin/bash
rm -rf dist
# Run the build process
npm run build

# Check if the build was successful
if [ $? -eq 0 ]; then
  # Copy the .htaccess file into the dist folder
  cp .htaccess dist/.htaccess
  echo "Build completed and .htaccess copied successfully."
else
  echo "An error occurred during the build process."
  exit 1
fi