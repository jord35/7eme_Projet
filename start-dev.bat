@echo off
setlocal enabledelayedexpansion
title Dev Environment - Project Manager

set "ROOT=%~dp0"

echo ============================================
echo   DEMARRAGE DE L'ENVIRONNEMENT DE DEV
echo ============================================
echo.

:: ─── 1. Kill tous les processus Node.js existants ───
echo [1/4] Arret des processus Node.js existants...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo   [OK] Processus Node.js arretes
) else (
    echo   [INFO] Aucun processus Node.js en cours
)
echo.

:: ─── 2. Pause courte ───
echo [2/4] Pause de 2 secondes...
timeout /t 2 /nobreak >nul
echo.

:: ─── 3. Demarrer le backend ───
echo [3/4] Demarrage du BACKEND (port 8000)...
start "Backend-Express-API" cmd /k "cd /d "%ROOT%backend" && echo [BACKEND] Demarrage... && npm run dev"
echo   [OK] Terminal backend ouvert
echo.

:: ─── 4. Attendre que le backend soit pret ───
echo [4/4] Attente du demarrage backend (5s)...
timeout /t 5 /nobreak >nul

:: ─── 5. Demarrer le frontend ───
echo.
echo Demarrage du FRONTEND (port 8001)...
start "Frontend-NextJS" cmd /k "cd /d "%ROOT%frontend" && echo [FRONTEND] Demarrage... && npm run dev"
echo   [OK] Terminal frontend ouvert

echo.
echo ============================================
echo   ENVIRONNEMENT DE DEV LANCE !
echo.
echo   Backend  : http://localhost:8000
echo   Swagger  : http://localhost:8000/api-docs
echo   Frontend : http://localhost:8001
echo ============================================
echo.
echo Fermez cette fenetre, les terminaux backend/frontend restent ouverts.
pause
