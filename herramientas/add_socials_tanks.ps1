$tanksFiles = Get-ChildItem -Path ".\public\museo-tanques" -Recurse -Filter "*.html"

$socialIconsTanks = @"
                    <div class="flex flex-wrap gap-3 mt-6">
                        <a href="#" aria-label="Facebook" class="size-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                            <svg class="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                        </a>
                        <a href="#" aria-label="Instagram" class="size-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all">
                            <svg class="size-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg>
                        </a>
                        <a href="#" aria-label="X (Twitter)" class="size-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all">
                            <svg class="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                        </a>
                        <a href="#" aria-label="YouTube" class="size-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all">
                            <svg class="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z"></path></svg>
                        </a>
                        <a href="#" aria-label="Flickr" class="size-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all group">
                            <svg class="size-5" viewBox="0 0 24 24" fill="none"><circle cx="7" cy="12" r="4" class="fill-current group-hover:text-blue-500" /><circle cx="17" cy="12" r="4" class="fill-current group-hover:text-pink-500" /></svg>
                        </a>
                    </div>
"@

foreach ($file in $tanksFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    # Check if we already injected
    if (-not ($content -match 'aria-label="Facebook"')) {
        # Find the old simple social links block and replace it
        $patternToReplace = '(?s)<div class="flex gap-4">.*?</div>'
        
        # We need to make sure we are only replacing inside the branding column of the footer
        if ($content -match '<!-- Branding -->') {
            $content = (($content -split '<!-- Branding -->')[0]) + '<!-- Branding -->' + (($content -split '<!-- Branding -->')[1] -replace $patternToReplace, $socialIconsTanks)
            [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
            Write-Host "Updated Tanks Socials in $($file.Name)"
        }
    }
}
