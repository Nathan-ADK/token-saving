@echo off
chcp 65001 >nul
title 发布 token-saving DSH 版到 GitHub
echo.
echo   ============================================
echo   发布 token-saving DSH 版到 GitHub
echo   ============================================
echo.
echo   前置：
echo    1. 先在 GitHub 建一个空仓库，例如 https://github.com/<你的账号>/dsh-token-saving
echo    2. 本机已安装 git，且已登录 GitHub（git credential / SSH key）
echo.
cd /d "%~dp0"

set /p REPO="输入 GitHub 仓库地址(https://github.com/账号/仓库.git): "
if "%REPO%"=="" goto :cancel

echo [1/4] 自检 core / index...
call node --check index.js
call node --check src/core.js
if errorlevel 1 goto :fail

echo [2/4] 关联远程...
git remote remove origin 2>nul
git remote add origin "%REPO%"

echo [3/4] 推送代码 + tag...
git push -u origin master
git push origin v1.0.0
if errorlevel 1 goto :fail

echo.
echo   发布成功！仓库: %REPO%
echo   DSH 市场可按 catalog/dsh-plugin.json 收录。
goto :end

:fail
echo.
echo   发布失败。常见原因：仓库地址错误 / 未登录 GitHub / 网络。
echo   当前分支为 master；若你的远端用 main，请在此脚本把 master 改成 main。
goto :end

:cancel
echo   已取消。
:end
echo.
pause
