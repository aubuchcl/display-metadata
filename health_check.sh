#!/bin/sh

# Set the URL of the endpoint
URL="http://localhost:3000/_health"

# Make the HTTP request
RESPONSE=$(curl --silent --request GET $URL)

# Parse the "message" field from the JSON response
MESSAGE=$(echo $RESPONSE | jq -r '.message')

# Check if the "message" field is "OK"
if [[ $MESSAGE == "OK" ]]; then
  echo "Message is OK"
  exit 0
else
  echo "Message is not OK"
  exit 1
fi
