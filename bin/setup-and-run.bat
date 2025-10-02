@echo off
echo Installing dependencies for WearMatch...
call npm install
if %ERRORLEVEL% NEQ 0 (
  echo Error installing dependencies. Please check your Node.js installation.
  pause
  exit /b 1
)

echo Starting the development server...
call npm run dev
if %ERRORLEVEL% NEQ 0 (
  echo Error starting the development server.
  pause
  exit /b 1
)

pause