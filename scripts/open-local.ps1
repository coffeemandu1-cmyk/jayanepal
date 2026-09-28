$env:VITE_BASE_PATH = ''
npm run build
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Start-Process (Join-Path $PSScriptRoot '..\dist\index.html')
