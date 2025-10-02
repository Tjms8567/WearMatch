const { execSync } = require('child_process');
const path = require('path');

console.log('Setting up WearMatch application...');

try {
  console.log('\nInstalling dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('\nCreating next.config.js file...');
  const fs = require('fs');
  const nextConfigContent = `/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = nextConfig;`;
  
  fs.writeFileSync(path.join(__dirname, 'next.config.js'), nextConfigContent);
  
  console.log('\nStarting development server...');
  console.log('Once started, open http://localhost:3000 in your browser');
  execSync('npx next dev', { stdio: 'inherit' });
} catch (error) {
  console.error('\nError occurred:', error.message);
  console.log('\nPlease try running the application using one of the alternative methods described in the README.md file.');
}