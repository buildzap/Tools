$convertersDir = Join-Path $PSScriptRoot "..\tools\converters"

# Dark theme styles
$darkThemeStyles = @"
<style>
    :root {
        --bg-color: #121212;
        --card-bg: #1e1e1e;
        --text-color: #e0e0e0;
        --text-muted: #a0a0a0;
        --border-color: #2d2d2d;
        --primary-color: #4a90e2;
        --input-bg: #2d2d2d;
    }

    body {
        background-color: var(--bg-color);
        color: var(--text-color);
    }

    .card {
        background-color: var(--card-bg);
        border-color: var(--border-color);
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    .form-control, .form-select {
        background-color: var(--input-bg);
        border-color: var(--border-color);
        color: var(--text-color);
    }

    .form-control:focus, .form-select:focus {
        background-color: var(--input-bg);
        border-color: var(--primary-color);
        color: var(--text-color);
        box-shadow: 0 0 0 0.25rem rgba(74, 144, 226, 0.25);
    }

    .btn-primary {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
        transition: all 0.2s;
    }

    .btn-primary:hover {
        background-color: #357abd;
        border-color: #357abd;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .btn-outline-primary {
        color: var(--primary-color);
        border-color: var(--primary-color);
        transition: all 0.2s;
    }

    .btn-outline-primary:hover {
        background-color: var(--primary-color);
        color: white;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .table {
        color: var(--text-color);
    }

    .table thead th {
        border-bottom-color: var(--border-color);
        color: var(--text-muted);
    }

    .table td {
        border-top-color: var(--border-color);
    }

    .alert-danger {
        background-color: rgba(220, 53, 69, 0.1);
        border-color: #dc3545;
        color: var(--text-color);
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: var(--bg-color);
    }

    ::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: var(--text-muted);
    }

    /* Selection color */
    ::selection {
        background-color: var(--primary-color);
        color: white;
    }

    /* Animation classes */
    .fade-in {
        animation: fadeIn 0.5s ease-in;
    }

    .slide-up {
        animation: slideUp 0.5s ease-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
</style>
"@

# CSS links
$cssLinks = @"
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
<link href="/styles/main.css" rel="stylesheet">
<link href="/styles/theme.css" rel="stylesheet">
<link href="/styles/animations.css" rel="stylesheet">
"@

# Process each HTML file in the converters directory
Get-ChildItem -Path $convertersDir -Filter "*.html" | ForEach-Object {
    Write-Host "Processing $($_.Name)..."
    
    $content = Get-Content $_.FullName -Raw
    
    # Add dark theme attributes and styles
    $content = $content -replace '<html[^>]*>', '<html lang="en" data-theme="dark">'
    
    # Add required CSS links if not present
    if (-not ($content -match '<link href="/styles/theme.css"')) {
        $content = $content -replace '</head>', "$cssLinks`n</head>"
    }
    
    # Add dark theme styles if not present
    if (-not ($content -match '<style>')) {
        $content = $content -replace '</head>', "$darkThemeStyles`n</head>"
    }
    
    # Add animation classes
    $content = $content -replace '<body[^>]*>', '<body class="fade-in">'
    $content = $content -replace '<div class="container[^"]*">', '<div class="container slide-up">'
    $content = $content -replace '<div class="card[^"]*">', '<div class="card fade-in">'
    
    # Write the updated content back to the file
    Set-Content -Path $_.FullName -Value $content -NoNewline
    
    Write-Host "Completed $($_.Name)"
} 