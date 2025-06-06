$convertersDir = Join-Path $PSScriptRoot "..\tools\converters"

# Get the volume-converter.html content to extract the structure
$volumeConverterPath = Join-Path $convertersDir "volume-converter.html"
$volumeConverterContent = Get-Content $volumeConverterPath -Raw

# Extract the main structure (everything between <body> and </body>)
$bodyMatch = [regex]::Match($volumeConverterContent, '<body[^>]*>(.*?)</body>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
$mainStructure = $bodyMatch.Groups[1].Value

# Process each HTML file in the converters directory
Get-ChildItem -Path $convertersDir -Filter "*.html" | ForEach-Object {
    if ($_.Name -ne "volume-converter.html") {
        Write-Host "Processing $($_.Name)..."
        
        $content = Get-Content $_.FullName -Raw
        
        # Extract the converter type from the filename
        $converterType = $_.Name -replace '-converter\.html$', ''
        
        # Update the title and description
        $content = $content -replace '<title>.*?</title>', "<title>$($converterType -replace '^.', { $args[0].ToString().ToUpper() }) Converter - Multi-Tools</title>"
        
        # Update the icon and description based on converter type
        $iconMap = @{
            'length' = 'ruler'
            'weight' = 'weight'
            'temperature' = 'thermometer-half'
            'speed' = 'tachometer-alt'
            'pressure' = 'compress-arrows-alt'
            'energy' = 'bolt'
            'data-storage' = 'database'
            'angle' = 'compass'
            'fuel-efficiency' = 'gas-pump'
        }
        
        $icon = $iconMap[$converterType]
        if (-not $icon) {
            $icon = 'calculator' # Default icon
        }
        
        $content = $content -replace '<i class="fas fa-[^"]*"></i>.*?</h1>', "<i class='fas fa-$icon text-primary'></i> $($converterType -replace '^.', { $args[0].ToString().ToUpper() }) Converter</h1>"
        $content = $content -replace '<p class="text-muted">.*?</p>', "<p class='text-muted'>Convert between different units of $converterType measurement</p>"
        
        # Update the animation image
        $content = $content -replace '<img src="[^"]*" alt="[^"]*"', "<img src='/images/$converterType-animation.svg' alt='$($converterType -replace '^.', { $args[0].ToString().ToUpper() }) Conversion Animation'"
        
        # Update the JavaScript initialization
        $content = $content -replace 'initConverter\(''[^'']*''\)', "initConverter('$converterType')"
        
        # Write the updated content back to the file
        Set-Content -Path $_.FullName -Value $content -NoNewline
        
        Write-Host "Completed $($_.Name)"
    }
} 