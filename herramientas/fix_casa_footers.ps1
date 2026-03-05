$casaFiles = Get-ChildItem -Path ".\public\casa-historica" -Recurse -Filter "*.html"
foreach ($file in $casaFiles) {
    if ($file.Name -eq "index.html") { continue }
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    # We need to remove the bg-slate-100 and bg-slate-50/80 classes from the divs inside the footer
    # because they block the gradient background.
    
    # Replace bg-slate-50/80 with border instead (to keep the shape/layout without blocking bg)
    $content = $content -replace 'bg-slate-50/80', 'border border-slate-200/50'
    
    # Replace bg-slate-100 from the copyright area to a transparent border top
    $content = $content -replace 'bg-slate-100 py-4 border-t border-slate-200', 'py-4 border-t border-slate-200/50'

    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Updated children backgrounds in $($file.Name)"
}
