$casaFiles = Get-ChildItem -Path ".\public\casa-historica" -Recurse -Filter "*.html"
foreach ($file in $casaFiles) {
    if ($file.Name -eq "index.html") { continue }
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    # Check if main.css is already linked
    if (-not ($content -match 'main\.css')) {
        # Insert before </head>
        $content = $content -replace '(</head>)', "    <link rel=`"stylesheet`" href=`"../css/main.css`">`n`$1"
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Added main.css to $($file.Name)"
    }
}
