// Filename: test-github-token.mjs

'use strict';

import https from 'https';

// Debugging: Print process arguments
console.log('Process arguments:', process.argv);

const token = process.argv[2];

if (!token) {
  console.error('Usage: node test-github-token.mjs <github_token>');
  process.exit(1);
}

// Debugging: Indicate that the token has been received
console.log('Token received.');

// Warning: For security reasons, avoid printing sensitive tokens.
// If necessary for debugging, uncomment the following line:
// console.log('Token provided:', token);

const options = {
  hostname: 'api.github.com',
  path: '/user',
  method: 'GET',
  headers: {
    'User-Agent': 'GitHub Token Test Script',
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
  },
};

// Debugging: Print request options
console.log('Request options:', options);

try {
  const req = https.request(options, (res) => {
    // Debugging: Print response status code and headers
    console.log('Response status code:', res.statusCode);
    console.log('Response headers:', res.headers);

    let data = '';

    // Collect response data
    res.on('data', (chunk) => {
      console.log('Received chunk of data:', chunk.toString());
      data += chunk;
    });

    // On end of response
    res.on('end', () => {
      console.log('Response ended.');
      console.log('Full response data received.');

      // Debugging: Print the full response data
      console.log('Response data:', data);

      // Try parsing JSON
      let parsedData;
      try {
        parsedData = JSON.parse(data);
        console.log('Parsed JSON data:', parsedData);
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError.message);
        console.error('Raw response data:', data);
        process.exit(1);
      }

      if (res.statusCode === 200) {
        console.log('Token is valid.');
        // Optional: Print user data
        // console.log('User data:', parsedData);
      } else if (res.statusCode === 401) {
        console.error('Token is invalid or unauthorized.');
      } else {
        console.error(`Unexpected status code: ${res.statusCode}`);
        console.error('Response data:', parsedData);
      }
    });

    // Handle response errors
    res.on('error', (error) => {
      console.error('An error occurred with the response:', error.message);
    });
  });

  // Handle request errors
  req.on('error', (error) => {
    console.error('An error occurred during the request:', error.message);
  });

  // Handle timeout
  req.on('timeout', () => {
    console.error('Request timed out.');
    req.abort();
  });

  // Set a timeout for the request (e.g., 10 seconds)
  req.setTimeout(10000);

  req.end();
} catch (error) {
  console.error('An unexpected error occurred:', error.message);
  process.exit(1);
}
