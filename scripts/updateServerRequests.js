const fs = require('fs');
const path = require('path');

// Función para actualizar un archivo
function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Patrón para encontrar imports de getServerSession y authOptions
    const sessionImportPattern = /import\s*{\s*getServerSession\s*}\s*from\s*["']next-auth["']/g;
    const authOptionsImportPattern = /import\s*{\s*authOptions\s*}\s*from\s*["'][^"']*\/api\/auth\/\[\.\.\.nextauth\]\/route["']/g;
    
    // Patrón para reemplazar las funciones de fetch
    const fetchPattern = /async function fetch\w+\s*\(\s*\)\s*{\s*const session = await getServerSession\(authOptions\)\s*if \(!session\) throw new Error\("No authenticated user"\)\s*const tenantId = session\.user\.tenantId\s*const res = await fetch\(\`\$\{process\.env\.NEXT_PUBLIC_API_URL\}\/([^`]+)\`, \{\s*headers: \{\s*'x-tenant-id': tenantId,\s*\}\s*\}\)\s*return res\.json\(\)\s*}/g;
    
    // Reemplazar imports
    content = content.replace(sessionImportPattern, 'import { getServerTenantId } from "@/utils"');
    content = content.replace(authOptionsImportPattern, '');
    
    // Reemplazar funciones de fetch
    content = content.replace(fetchPattern, (match, endpoint) => {
      return `async function fetch${endpoint.charAt(0).toUpperCase() + endpoint.slice(1).replace(/[-_]/g, '')} () {
  const tenantId = await getServerTenantId()
  const res = await fetch(\`\${process.env.NEXT_PUBLIC_API_URL}/${endpoint}\`, {
    headers: {
      'x-tenant-id': tenantId,
    }
  })
  return res.json()
}`;
    });
    
    // Patrón para generateMetadata
    const metadataPattern = /const session = await getServerSession\(authOptions\)\s*if \(!session\) throw new Error\("No authenticated user"\)\s*const tenantId = session\.user\.tenantId/g;
    content = content.replace(metadataPattern, 'const tenantId = await getServerTenantId()');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Función para buscar archivos recursivamente
function findFiles(dir, pattern) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findFiles(fullPath, pattern));
    } else if (stat.isFile() && pattern.test(item)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Archivos a actualizar
const appFiles = findFiles('./app', /\.tsx?$/);
const componentFiles = findFiles('./components', /\.tsx?$/);

const allFiles = [...appFiles, ...componentFiles];

console.log('🚀 Starting server request updates...\n');

let updatedCount = 0;
let errorCount = 0;

allFiles.forEach(file => {
  if (updateFile(file)) {
    updatedCount++;
  } else {
    errorCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`✅ Updated: ${updatedCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log(`📁 Total processed: ${allFiles.length} files`);

