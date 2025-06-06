import os
import re

# Path to the template file
template_path = os.path.join(os.path.dirname(__file__), '../templates/tool-template.html')
with open(template_path, 'r', encoding='utf-8') as f:
    template = f.read()

# Function to process a directory
def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Extract tool information from the existing file
                tool_name = re.search(r'<title>(.*?)</title>', content)
                tool_name = tool_name.group(1) if tool_name else 'Tool'
                
                tool_description = re.search(r'<meta name="description" content="(.*?)">', content)
                tool_description = tool_description.group(1) if tool_description else ''
                
                tool_icon = re.search(r'<i class="(.*?) text-primary', content)
                tool_icon = tool_icon.group(1) if tool_icon else 'fas fa-tools'
                
                # Extract tool content
                tool_content_match = re.search(r'<div class="tool-interface">([\s\S]*?)</div>', content)
                tool_content = tool_content_match.group(1) if tool_content_match else ''
                
                tool_info_match = re.search(r'<div class="tool-info">([\s\S]*?)</div>', content)
                tool_info = tool_info_match.group(1) if tool_info_match else ''
                
                # Replace placeholders in template
                new_content = template.replace('TOOL_NAME', tool_name)
                new_content = new_content.replace('TOOL_DESCRIPTION', tool_description)
                new_content = new_content.replace('TOOL_ICON', tool_icon)
                new_content = new_content.replace('TOOL_CONTENT', tool_content)
                new_content = new_content.replace('TOOL_INFO', tool_info)
                
                # Write the new file
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Updated: {file_path}')

# Start processing from the tools directory
tools_dir = os.path.join(os.path.dirname(__file__), '../tools')
process_directory(tools_dir) 