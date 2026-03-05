$files = Get-ChildItem -Path ".\public" -Recurse -Filter "*.html"

$badChar = [char]0xFFFD
$c = [string]$badChar

$replacements = @{
    "MUSE${c}STICO" = "MUSEÍSTICO"
    "Muse${c}stico" = "Museístico"
    "Hist${c}rica" = "Histórica"
    "colecci${c}n" = "colección"
    "Colecci${c}n" = "Colección"
    "exhibici${c}n" = "exhibición"
    "Exhibici${c}n" = "Exhibición"
    "donaci${c}n" = "donación"
    "Donaci${c}n" = "Donación"
    "secci${c}n" = "sección"
    "Secci${c}n" = "Sección"
    "exploraci${c}n" = "exploración"
    "Exploraci${c}n" = "Exploración"
    "fundaci${c}n" = "fundación"
    "Fundaci${c}n" = "Fundación"
    "restauraci${c}n" = "restauración"
    "Restauraci${c}n" = "Restauración"
    "protecci${c}n" = "protección"
    "Protecci${c}n" = "Protección"
    "direcci${c}n" = "dirección"
    "Direcci${c}n" = "Dirección"
    "informaci${c}n" = "información"
    "Informaci${c}n" = "Información"
    "INFORMACI${c}N" = "INFORMACIÓN"
    "navegaci${c}n" = "navegación"
    "Navegaci${c}n" = "Navegación"
    "evoluci${c}n" = "evolución"
    "Evoluci${c}n" = "Evolución"
    "tecnol${c}gica" = "tecnológica"
    "Tecnol${c}gica" = "Tecnológica"
    "defini${c}" = "definió"
    "Defini${c}" = "Definió"
    "t${c}ctica" = "táctica"
    "T${c}ctica" = "Táctica"
    "caballer${c}a" = "caballería"
    "Caballer${c}a" = "Caballería"
    "cl${c}sico" = "clásico"
    "Cl${c}sico" = "Clásico"
    "m${c}s" = "más"
    "M${c}s" = "Más"
    "veh${c}culos" = "vehículos"
    "Veh${c}culos" = "Vehículos"
    "${c}nica" = "Única"
    "${c}nico" = "Único"
    "estrat${c}gicos" = "estratégicos"
    "Estrat${c}gicos" = "Estratégicos"
    "Ej${c}rcito" = "Ejército"
    "ej${c}rcito" = "ejército"
    "Galer${c}a" = "Galería"
    "galer${c}a" = "galería"
    "C${c}mo" = "Cómo"
    "c${c}mo" = "cómo"
    "Bolet${c}n" = "Boletín"
    "bolet${c}n" = "boletín"
    "${c}REA" = "ÁREA"
    "${c}NTIMO" = "ÍNTIMO"
    "A${c}OS" = "AÑOS"
    "A${c}os" = "Años"
    "a${c}os" = "años"
    "${c} 2026" = "© 2026"
    "360°°°" = "360°"
    "360°°" = "360°"
    "Dise${c}o" = "Diseño"
    "dise${c}o" = "diseño"
    "Estad${c}sticas" = "Estadísticas"
    "estad${c}sticas" = "estadísticas"
    "pol${c}tica" = "política"
    "Pol${c}tica" = "Política"
    "t${c}rminos" = "términos"
    "T${c}rminos" = "Términos"
    "Naci${c}n" = "Nación"
    "In${c}ditos" = "Inéditos"
    "in${c}ditos" = "inéditos"
    "Conservaci${c}n" = "Conservación"
    "" = "ó" # fallback for any single 
}

foreach ($file in $files) {
    if ($file.Name -eq "index.html" -and $file.DirectoryName -match "public$") {
        continue # Skipped public/index.html since we hand-fixed it.
    }
    
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $content = [System.Text.Encoding]::UTF8.GetString($bytes)
    
    $modified = $false
    
    foreach ($key in $replacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $replacements[$key])
            $modified = $true
        }
    }
    
    if ($modified) {
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
        Write-Host "Fixed corruptions in $($file.Name)"
    }
}
