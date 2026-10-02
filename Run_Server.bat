@echo off
title Govt. Graduate College Hafizabad - Python Django Server
echo ========================================================
echo   GOVT. GRADUATE COLLEGE HAFIZABAD - PYTHON BACKEND
echo ========================================================
echo.
echo Starting Django Development Server on http://127.0.0.1:8000/
echo Admin Dashboard: http://127.0.0.1:8000/admin/
echo (Admin Username: admin  ^|  Password: adminpassword123)
echo.
echo Opening browser in 3 seconds...
start "" "http://127.0.0.1:8000/"
python manage.py runserver 127.0.0.1:8000
pause
