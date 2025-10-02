# WearMatch

WearMatch is a web application that helps users find perfect outfit matches for their sneakers. The application uses a sophisticated matching algorithm based on color compatibility and style consistency to recommend outfits that go well with specific sneakers.

## Features

- Browse sneakers by brand or view all sneakers
- View detailed information about each sneaker
- Get outfit recommendations that match with your selected sneaker
- Browse outfits collection
- Responsive design that works on mobile and desktop

## Project Structure

- `/src/app`: Next.js app router pages
- `/src/components`: Reusable UI components
- `/src/context`: React Context for state management
- `/src/data`: JSON data for sneakers and outfits
- `/src/types`: TypeScript type definitions
- `/src/utils`: Utility functions including the matching algorithm

## Setup Instructions

### Option 1: Using the Batch File (Recommended for Windows)

Simply double-click the `setup-and-run.bat` file in the project root directory. This will:
1. Install all dependencies
2. Start the development server

### Option 2: Manual Setup

1. Install dependencies:
```
npm install
```

2. Run the development server:
```
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Dealing with PowerShell Execution Policy Issues

If you encounter a PowerShell execution policy error when trying to run npm commands, you have several options:

### Option 1: Use the Batch File
Use the provided `setup-and-run.bat` file which bypasses PowerShell execution policy restrictions.

### Option 2: Use the Node.js Script
Run the following command in PowerShell or Command Prompt:
```
node setup.js
```
This script will install dependencies and start the development server without execution policy issues.

### Option 3: Change PowerShell Execution Policy
Run PowerShell as an administrator and execute:
```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Option 4: Use Command Prompt Instead of PowerShell
Open Command Prompt (cmd.exe) and navigate to the project directory:
```
cd path\to\WearMatch
npm install
npm run dev
```

### Option 5: Use Visual Studio Code Terminal
If you're using VS Code, you can change the default terminal to Command Prompt:
1. Press Ctrl+Shift+P
2. Type "Terminal: Select Default Profile"
3. Choose "Command Prompt"
4. Open a new terminal and run the npm commands

## Matching Algorithm

The matching algorithm works by:
1. Calculating color compatibility between sneakers and outfits
2. Determining style consistency between sneakers and outfits
3. Combining these scores to find the best matches
4. Allowing filtering by style categories

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- React Context API