@echo off
chcp 65001 >nul
title 一键发布 token-saving 到 GitHub
echo.
echo   ============================================
echo    token-saving 一键发布到 GitHub
echo   ============================================
echo.
cd /d "%~dp0"

echo [1/5] 自检...
call node --check index.js
if errorlevel 1 goto :fail
call node --check src/core.js
if errorlevel 1 goto :fail

echo [2/5] 检测 GitHub 登录态...
git ls-remote https://github.com/SSSVIP/token-saving.git >nul 2>&1
if errorlevel 1 (
  echo.
  echo   无法访问 GitHub。请二选一：
  echo   A) 在本机运行 gh auth login 完成浏览器授权
  echo   B) 确保凭据管理器中已保存 GitHub 账号
  echo.
)

echo [3/5] 关联远程（仓库需先在 GitHub 网页创建为空仓库）...
set "REPO=https://github.com/SSSVIP/token-saving.git"
git remote remove origin 2>nul
git remote add origin "%REPO%"

echo [4/5] 首次提交...
git add -A
git commit -m "release: token-saving v1.0.0 (npm + DSH)" 2>nul

echo [5/5] 推送代码与标签...
git push -u origin HEAD:main
if errorlevel 1 (
  echo   主分支推送失败，尝试 master...
  git push -u origin HEAD:master
)
if errorlevel 1 goto :fail
git push origin v1.0.0 2>nul

echo.
echo   发布成功！ https://github.com/SSSVIP/token-saving
goto :end
:fail
echo.
echo   发布失败。请确认：仓库已创建 / 已登录 GitHub / 网络正常。
:end
echo.
pause
