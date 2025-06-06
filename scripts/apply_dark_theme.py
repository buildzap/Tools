import os
import re

def apply_dark_theme(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Add dark theme attributes and styles
    content = re.sub(r'<html[^>]*>', '<html lang="en" data-theme="dark">', content)
    
    # Add required CSS links if not present
    css_links = '''
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="/styles/main.css" rel="stylesheet">
    <link href="/styles/theme.css" rel="stylesheet">
    <link href="/styles/animations.css" rel="stylesheet">
    '''
    
    if '<link href="/styles/theme.css"' not in content:
        content = content.replace('</head>', f'{css_links}</head>')

    # Add dark theme styles
    dark_theme_styles = '''
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
    '''
    
    if '<style>' not in content:
        content = content.replace('</head>', f'{dark_theme_styles}</head>')

    # Add animation classes to body and main elements
    content = re.sub(r'<body[^>]*>', '<body class="fade-in">', content)
    content = re.sub(r'<div class="container[^"]*">', '<div class="container slide-up">', content)

    # Add animation classes to cards
    content = re.sub(r'<div class="card[^"]*">', '<div class="card fade-in">', content)

    # Write the updated content back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

def process_directory(directory):
    for filename in os.listdir(directory):
        if filename.endswith('.html'):
            file_path = os.path.join(directory, filename)
            print(f'Processing {filename}...')
            apply_dark_theme(file_path)
            print(f'Completed {filename}')

if __name__ == '__main__':
    converters_dir = os.path.join('tools', 'converters')
    process_directory(converters_dir) 