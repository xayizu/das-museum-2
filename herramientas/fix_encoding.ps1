$files = Get-ChildItem -Path ".\public" -Recurse -Filter "*.html"

# Mapping of corrupted characters back to their Spanish UTF-8 equivalents
$corrections = @{
    "Ã¡" = "á"
    "Ã©" = "é"
    "Ã*" = "í"
    "Ã³" = "ó"
    "Ãº" = "ú"
    "Ã±" = "ñ"
    "Ã " = "Á"
    "Ã‰" = "É"
    "Ã" = "Í"
    "Ã“" = "Ó"
    "Ãš" = "Ú"
    "Ã‘" = "Ñ"
    "Â" = ""
    "AÂ±OS" = "AÑOS"
    "AÃ±os" = "Años"
    "MUSEÃSTICO" = "MUSEÍSTICO"
    "Ã\u0081REA" = "ÁREA"
    "Ã\u008dNTIMO" = "ÍNTIMO"
    "BoletÃn" = "Boletín"
    "HistÃ³rica" = "Histórica"
    "GalerÃa" = "Galería"
    "CÃ³mo" = "Cómo"
    "EjÃ©rcito" = "Ejército"
    "AÃ±os" = "Años"
    "Â¿" = "¿"
    "Â¡" = "¡"
    "Ã\u0081" = "Á"
    "Ã\u0089" = "É"
    "Ã\u008d" = "Í"
    "Ã\u0093" = "Ó"
    "Ã\u009a" = "Ú"
    "Ã\u0091" = "Ñ"
}

foreach ($file in $files) {
    # Read as raw bytes to avoid further PowerShell string decoding issues
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $content = [System.Text.Encoding]::UTF8.GetString($bytes)
    
    $modified = $false
    
    foreach ($key in $corrections.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $corrections[$key])
            $modified = $true
        }
    }
    
    # Specific known corruptions often seen in this specific project
    if ($content -match 'Ejrcito') { $content = $content -replace 'Ejrcito', 'Ejército'; $modified = $true }
    if ($content -match 'Galera') { $content = $content -replace 'Galera', 'Galería'; $modified = $true }
    if ($content -match 'Cmo') { $content = $content -replace 'Cmo', 'Cómo'; $modified = $true }
    if ($content -match 'AOS') { $content = $content -replace 'AOS', 'AÑOS'; $modified = $true }
    if ($content -match 'Histrica') { $content = $content -replace 'Histrica', 'Histórica'; $modified = $true }
    if ($content -match 'Boletn') { $content = $content -replace 'Boletn', 'Boletín'; $modified = $true }
    if ($content -match 'MUSESTICO') { $content = $content -replace 'MUSESTICO', 'MUSEÍSTICO'; $modified = $true }
    if ($content -match 'REA') { $content = $content -replace 'REA', 'ÁREA'; $modified = $true }
    if ($content -match 'NTIMO') { $content = $content -replace 'NTIMO', 'ÍNTIMO'; $modified = $true }
    if ($content -match '360') { $content = $content -replace '360', '360°'; $modified = $true }
    if ($content -match '') { $content = $content -replace '', 'í'; $modified = $true; Write-Host "Found generic replacement in $($file.Name)" }
    
    
    if ($modified) {
        # Write back explicitly as UTF8 without BOM
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
        Write-Host "Fixed encoding in $($file.Name)"
    }
}
