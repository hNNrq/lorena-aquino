// Gera index.html a partir de _template.html, embutindo as fotos em base64.
// O Artifact bloqueia imagem externa, então tudo tem que ir inline.
//
//   node montar.js
//
// Depois: republicar o index.html NO MESMO caminho de arquivo pra manter a URL.

const fs = require('fs');
const path = require('path');

const dir = __dirname;
const A = (f) => path.join(dir, 'assets', f);

function dataURI(file) {
  const ext = path.extname(file).toLowerCase();
  const mime = ext === '.png' ? 'image/png'
             : ext === '.webp' ? 'image/webp'
             : 'image/jpeg';
  return `data:${mime};base64,` + fs.readFileSync(A(file)).toString('base64');
}

// WhatsApp real dela, com mensagem já preenchida
const WA = 'https://wa.me/5531975100796?text=' + encodeURIComponent(
  'Oi, Lorena! Vim pelo site. Queria saber sobre atendimento.'
);

let html = fs.readFileSync(path.join(dir, '_template.html'), 'utf8');

html = html
  .split('__FOTO_HERO__').join(dataURI('sobre.jpg'))        // retrato do hero
  .split('__FOTO_SOBRE__').join(dataURI('card-sobre.jpg'))  // consultório, seção "sobre"
  .split('__WA__').join(WA);

const restantes = html.match(/__[A-Z_]+__/g);
if (restantes) {
  console.error('Marcadores não substituídos:', [...new Set(restantes)].join(', '));
  process.exit(1);
}

const out = path.join(dir, 'index.html');
fs.writeFileSync(out, html, 'utf8');
console.log('ok ->', out, (fs.statSync(out).size / 1024).toFixed(0) + ' KB');
