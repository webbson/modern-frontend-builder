param (
  [string]$config = "config.json",
  [switch]$dev = $false,
  [switch]$watch = $false
)

if ($watch) {
  npm run watch --configFile=$config
}
elseif ($dev) {
  npm run build:$args --configFile=$config
}
else {
  npm install
  npm run build --configFile=$config
}
