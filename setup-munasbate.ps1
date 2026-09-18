$ErrorActionPreference = 'Stop'

Write-Host "== Munasbate web dependency reset ==" -ForegroundColor Cyan

if (Test-Path "node_modules") {
  Write-Host "Removing node_modules..." -ForegroundColor Yellow
  Remove-Item -Recurse -Force "node_modules"
}

if (Test-Path "package-lock.json") {
  Write-Host "Removing old package-lock.json..." -ForegroundColor Yellow
  Remove-Item -Force "package-lock.json"
}

if (Test-Path ".next") {
  Write-Host "Removing old .next..." -ForegroundColor Yellow
  Remove-Item -Recurse -Force ".next"
}

Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

Write-Host "Running TypeScript check..." -ForegroundColor Green
npm run typecheck

Write-Host "Running ESLint..." -ForegroundColor Green
npm run lint

Write-Host "Building production app..." -ForegroundColor Green
npm run build

Write-Host "Done." -ForegroundColor Cyan
