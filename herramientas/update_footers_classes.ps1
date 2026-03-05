$tanksFiles = Get-ChildItem -Path ".\public\museo-tanques" -Recurse -Filter "*.html"
foreach ($file in $tanksFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    if ($content -match '<footer\s+class="[^"]*bg-\[#05080f\][^"]*"') {
        $content = $content -replace '(<footer\s+class="[^"]*)bg-\[#05080f\]([^"]*")', '$1footer-fusion-tanks$2'
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated $($file.Name)"
    }
}

$casaFiles = Get-ChildItem -Path ".\public\casa-historica" -Recurse -Filter "*.html"
foreach ($file in $casaFiles) {
    if ($file.Name -eq "index.html") { continue }
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    if ($content -match '<footer\s+class="[^"]*bg-white[^"]*"') {
        $content = $content -replace '(<footer\s+class="[^"]*)bg-white([^"]*")', '$1footer-fusion-casa$2'
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated $($file.Name)"
    }
}
