$convertersDir = Join-Path $PSScriptRoot "..\tools\converters"

# Get the volume-converter.html content to extract the exact styles
$volumeConverterPath = Join-Path $convertersDir "volume-converter.html"
$volumeConverterContent = Get-Content $volumeConverterPath -Raw

# Extract the style block
$styleMatch = [regex]::Match($volumeConverterContent, '<style>(.*?)</style>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
$darkThemeStyles = $styleMatch.Groups[1].Value

# Extract the CSS links
$cssLinksMatch = [regex]::Match($volumeConverterContent, '<!-- Custom CSS -->(.*?)</head>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
$cssLinks = $cssLinksMatch.Groups[1].Value

# Process each HTML file in the converters directory
Get-ChildItem -Path $convertersDir -Filter "*.html" | ForEach-Object {
    if ($_.Name -ne "volume-converter.html") {
        Write-Host "Processing $($_.Name)..."
        
        $content = Get-Content $_.FullName -Raw
        
        # Add dark theme attributes
        $content = $content -replace '<html[^>]*>', '<html lang="en" data-theme="dark">'
        
        # Remove existing style blocks and CSS links
        $content = $content -replace '<style>.*?</style>', '' -replace '<!-- Custom CSS -->.*?</head>', "<!-- Custom CSS -->$cssLinks</head>"
        
        # Add the exact same style block from volume-converter.html
        $content = $content -replace '</head>', "<style>$darkThemeStyles</style>`n</head>"
        
        # Add animation classes
        $content = $content -replace '<body[^>]*>', '<body class="fade-in">'
        $content = $content -replace '<div class="container[^"]*">', '<div class="container slide-up">'
        $content = $content -replace '<div class="card[^"]*">', '<div class="card fade-in">'
        
        # Add tool-container class to main content
        $content = $content -replace '<main class="container[^"]*">', '<main class="container py-4"><div class="tool-container">'
        $content = $content -replace '</main>', '</div></main>'
        
        # Add animation classes to headers
        $content = $content -replace '<h1[^>]*>', '<h1 class="animate-fade-in">'
        $content = $content -replace '<h2[^>]*>', '<h2 class="animate-fade-in">'
        $content = $content -replace '<h3[^>]*>', '<h3 class="animate-fade-in">'
        
        # Add text-muted class to paragraphs
        $content = $content -replace '<p>', '<p class="text-muted">'
        
        # Add animation classes to buttons
        $content = $content -replace '<button[^>]*>', '<button class="animate-fade-in">'
        
        # Write the updated content back to the file
        Set-Content -Path $_.FullName -Value $content -NoNewline
        
        Write-Host "Completed $($_.Name)"
    }
} 