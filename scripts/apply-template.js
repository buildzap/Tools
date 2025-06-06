const fs = require('fs');
const path = require('path');

// Read the template
const template = fs.readFileSync(path.join(__dirname, '../templates/tool-template.html'), 'utf8');

// Function to process a directory
function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Recursively process subdirectories
            processDirectory(filePath);
        } else if (file.endsWith('.html')) {
            // Process HTML files
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Extract tool information from the existing file
            const toolName = content.match(/<title>(.*?)<\/title>/)?.[1] || 'Tool';
            const toolDescription = content.match(/<meta name="description" content="(.*?)">/)?.[1] || '';
            const toolIcon = content.match(/<i class="(.*?) text-primary/)?.[1] || 'fas fa-tools';
            
            // Extract tool content
            const toolContent = content.match(/<div class="tool-interface">([\s\S]*?)<\/div>/)?.[1] || '';
            const toolInfo = content.match(/<div class="tool-info">([\s\S]*?)<\/div>/)?.[1] || '';
            
            // Replace placeholders in template
            let newContent = template
                .replace('TOOL_NAME', toolName)
                .replace('TOOL_DESCRIPTION', toolDescription)
                .replace('TOOL_ICON', toolIcon)
                .replace('TOOL_CONTENT', toolContent)
                .replace('TOOL_INFO', toolInfo);
            
            // Write the new file
            fs.writeFileSync(filePath, newContent);
            console.log(`Updated: ${filePath}`);
        }
    });
}

// Start processing from the tools directory
const toolsDir = path.join(__dirname, '../tools');
processDirectory(toolsDir); 