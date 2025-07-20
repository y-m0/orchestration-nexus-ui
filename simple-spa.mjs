import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the index.html content once
const indexPath = path.join(__dirname, 'dist', 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

const server = http.createServer((req, res) => {
  console.log(`📥 Request: ${req.method} ${req.url}`);
  
  try {
    const url = req.url.split('?')[0];
    
    // Serve static assets
    if (url.startsWith('/assets/') || url.endsWith('.ico') || url.endsWith('.svg') || url.endsWith('.txt')) {
      const filePath = path.join(__dirname, 'dist', url);
      if (fs.existsSync(filePath)) {
        const ext = path.extname(filePath);
        const mimeTypes = {
          '.js': 'application/javascript',
          '.css': 'text/css',
          '.ico': 'image/x-icon',
          '.svg': 'image/svg+xml',
          '.txt': 'text/plain'
        };
        
        res.writeHead(200, { 
          'Content-Type': mimeTypes[ext] || 'text/plain',
          'Access-Control-Allow-Origin': '*'
        });
        fs.createReadStream(filePath).pipe(res);
        return;
      }
    }
    
    // For all other routes, serve the SPA
    res.writeHead(200, { 
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(indexContent);
    console.log(`✅ Served SPA for: ${url}`);
    
  } catch (error) {
    console.error(`❌ Error serving ${req.url}:`, error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.on('error', (error) => {
  console.error('❌ Server error:', error);
});

const port = 3001;
server.listen(port, '127.0.0.1', () => {
  console.log(`🚀 SPA Server started successfully!`);
  console.log(`📍 URL: http://localhost:${port}`);
  console.log(`🔄 SPA routing enabled for React Router`);
  console.log(`📁 Serving from: ${path.join(__dirname, 'dist')}`);
});