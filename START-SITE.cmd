@echo off
cd /d "%~dp0"
set "HOST=0.0.0.0"
if not defined PORT set "PORT=5173"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or is not in PATH.
  pause
  exit /b 1
)
node server.mjs
pause
