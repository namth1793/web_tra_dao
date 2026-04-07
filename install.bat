@echo off
echo === Cai dat Web Tra Dao ===

echo [1/3] Cai dat backend...
cd backend
call npm install
echo Tao database va seed data...
node db/seed.js
cd ..

echo [2/3] Cai dat frontend...
cd frontend
call npm install
cd ..

echo [3/3] Hoan tat!
echo Chay start.bat de khoi dong website
pause
