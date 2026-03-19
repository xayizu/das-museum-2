const http = require('http');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../public/css/tank-cursor.css');

const server = http.createServer((req, res) => {
    // CORs
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/save') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const config = JSON.parse(body);
                console.log('Recibida nueva configuración:', config);

                let cssContent = fs.readFileSync(cssPath, 'utf8');

                // Generate new :root block
                const rootVars = Object.entries(config)
                    .filter(([k]) => k.startsWith('--') || k === '--cursor-scale')
                    .map(([k, v]) => `    ${k}: ${v};`)
                    .join('\n');

                const newRoot = `:root {\n${rootVars}\n    --tank-primary: #5d7347;\n    --tank-secondary: #8ba86e;\n    --tank-accent: #c5d6af;\n    --tank-border: #2d381f;\n    --tank-shadow: rgba(0, 0, 0, 0.4);\n    --tank-glow: rgba(139, 168, 110, 0.3);\n}`;

                // Replace the :root block
                cssContent = cssContent.replace(/:root\s*{[\s\S]*?}/, newRoot);

                // Update .tank-body width/height if customized
                if (config['chassis-w']) {
                    cssContent = cssContent.replace(/\.tank-body\s*{[\s\S]*?width:\s*[^;]+;[\s\S]*?height:\s*[^;]+;[\s\S]*?}/, 
                        `.tank-body {\n    position: absolute;\n    transform: translate(calc(-50% + var(--bo-x, 0px)), var(--bo-y, -10px)) rotate(var(--rot-b, 0deg));\n    width: ${config['chassis-w']};\n    height: ${config['chassis-h']};\n}`);
                }

                fs.writeFileSync(cssPath, cssContent);
                console.log('Archivo CSS actualizado correctamente.');

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'ok', message: 'Configuración guardada en CSS' }));
            } catch (err) {
                console.error('Error al guardar:', err);
                res.writeHead(500);
                res.end(JSON.stringify({ status: 'error', message: err.message }));
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = 3456;
server.listen(PORT, '0.0.0.0', () => {
    console.log('----------------------------------------------------');
    console.log(`🚀 SERVIDOR DE GUARDADO ACTIVO`);
    console.log(`📍 URL: http://localhost:${PORT}/save`);
    console.log(`📂 DESTINO: ${cssPath}`);
    console.log('----------------------------------------------------');
});
