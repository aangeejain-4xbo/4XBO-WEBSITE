@echo off
REM ============================================
REM  4XBO-WEBSITE - easy start script
REM ============================================
cd /d "%~dp0"

echo ============================================
echo   Starting 4XBO-WEBSITE dev server...
echo ============================================
echo.

REM Install dependencies if they are missing
if not exist "node_modules" (
    echo node_modules not found. Installing dependencies...
    call npm install
    echo.
)

echo Launching dev server...
echo The browser will open automatically in a few seconds.
echo Press Ctrl+C in this window to stop the server.
echo.

REM Open the site in the default browser after a short delay
start "" /b cmd /c "timeout /t 4 >nul & start http://localhost:3535"

REM Start the dev server (this keeps the window open)
call npm run dev

pause
