@echo off
title Govt. Graduate College Hafizabad - Django Server & Admin
cd /d "%~dp0"
echo ======================================================================
echo    Govt. Graduate College Hafizabad - Portal Server & Admin Panel
echo ======================================================================
echo.
echo Admin Portal URL: http://127.0.0.1:8000/admin/
echo Admin Username:   admin
echo Admin Password:   adminpassword123
echo.
echo Browser me admin panel open ho raha hai...
echo Server start ho raha hai (Band karne k liye Ctrl+C dabayein)...
echo.
timeout /t 2 >nul
start http://127.0.0.1:8000/admin/
python manage.py runserver
pause
