param(
  [ValidateSet("amd64", "arm64")]
  [string]$Arch = "amd64",

  [string]$OutputName = "vendera-pos",

  [ValidateSet("download", "embed", "browser", "error")]
  [string]$WebView2 = "download",

  [switch]$Installer,
  [switch]$Clean
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Get-Command wails -ErrorAction SilentlyContinue)) {
  throw "No se encontro 'wails' en PATH. Instala la CLI: go install github.com/wailsapp/wails/v2/cmd/wails@latest"
}

$platform = "windows/$Arch"
$exeName = "$OutputName.exe"

$args = @(
  "build",
  "-platform", $platform,
  "-o", $exeName,
  "-webview2", $WebView2
)

if ($Clean) {
  $args += "-clean"
}

if ($Installer) {
  $args += "-nsis"
}

Write-Host "Ejecutando: wails $($args -join ' ')"
& wails @args

if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host ""
Write-Host "Build completado. Artefactos esperados en: build/bin"
Write-Host "Ejecutable: build/bin/$exeName"

if ($Installer) {
  Write-Host "Instalador NSIS: build/bin (nombre segun metadata del proyecto)"
  Write-Host "Nota: para -nsis necesitas NSIS (makensis.exe) en PATH."
}
