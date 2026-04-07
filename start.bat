@echo off
echo === Khoi dong Web Tra Dao ===

echo Giai phong port 5014 va 5173 neu dang chiem dung...
FOR /F "tokens=5" %%a IN ('netstat -ano ^| findstr :5014 ^| findstr LISTENING') DO (
    echo   Killing PID %%a tren port 5014
    taskkill /PID %%a /F >nul 2>&1
)
FOR /F "tokens=5" %%a IN ('netstat -ano ^| findstr :5173 ^| findstr LISTENING') DO (
    echo   Killing PID %%a tren port 5173
    taskkill /PID %%a /F >nul 2>&1
)

timeout /t 1 /nobreak >nul

echo Khoi dong Backend (port 5014)...
start "Backend - Tra Dao" cmd /k "cd /d %~dp0backend && node server.js"
timeout /t 2 /nobreak >nul

echo Khoi dong Frontend (port 5173)...
start "Frontend - Tra Dao" cmd /k "cd /d %~dp0frontend && npm run dev"
timeout /t 3 /nobreak >nul

start http://localhost:5173
echo.
echo Backend : http://localhost:5014
echo Frontend: http://localhost:5173
