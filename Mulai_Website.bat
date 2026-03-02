@echo off
echo ==============================================
echo MENYIAPKAN SMART METER (LARAVEL + NEXT.JS)
echo ==============================================

:: Memuat ulang System Path agar PHP terbaca walaupun terminal belum di-restart
for /f "tokens=2*" %%A in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path 2^>nul') do set "SysPath=%%B"
for /f "tokens=2*" %%A in ('reg query "HKCU\Environment" /v Path 2^>nul') do set "UserPath=%%B"
set "PATH=%SysPath%;%UserPath%;%PATH%"

echo [1/2] Membuka API Backend Laravel (Port 8000)...
start "Backend Laravel" cmd /k "color 0A & echo --- BACKEND LARAVEL --- & echo Jangan tutup jendela ini! Biarkan berjalan di latar belakang. & echo. & cd backend && php artisan serve"

timeout /t 2 >nul

echo [2/2] Membuka Frontend Next.js (Port 3000)...
start "Frontend Next.js" cmd /k "color 0B & echo --- FRONTEND NEXT.JS --- & echo Jangan tutup jendela ini! Biarkan berjalan di latar belakang. & echo Setelah 'Ready in ... ms', buka browser di http://localhost:3000 & echo. & cd frontend && npm run dev"

echo.
echo Berhasil! Dua jendela baru telah terbuka untuk menjalankan Backend dan Frontend.
echo Anda dapat menutup file launcher ini (tekan tombol apapun).
pause >nul
