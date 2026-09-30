// Télécharge des photos Unsplash spécifiques par ID — vraies photos thématiques Noël
// Chaque ID correspond à une vraie photo vérifiée sur Unsplash
const https = require('https')
const fs = require('fs')
const path = require('path')

const outDir = path.join(__dirname, '..', 'public', 'imgs')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

// IDs Unsplash soigneusement sélectionnés pour chaque produit + ambiance Noël
const images = [
  {
    file: 'plaid.jpg',
    // Plaid / couverture douillette en hiver
    url: 'https://images.unsplash.com/photo-1548449112-96a38a643324?w=600&h=450&fit=crop&auto=format&q=80'
  },
  {
    file: 'led.jpg',
    // Guirlandes LED / lumières de Noël
    url: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=450&fit=crop&auto=format&q=80'
  },
  {
    file: 'coffret.jpg',
    // Coffret cadeau de Noël avec ruban
    url: 'https://images.unsplash.com/photo-1512474932049-78ac69ede12c?w=600&h=450&fit=crop&auto=format&q=80'
  },
  {
    file: 'chocolat.jpg',
    // Tasse de chocolat chaud avec guimauves, hiver
    url: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&h=450&fit=crop&auto=format&q=80'
  },
  {
    file: 'projecteur.jpg',
    // Projecteur portable / cinéma maison soirée
    url: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=600&h=450&fit=crop&auto=format&q=80'
  },
  {
    file: 'chaussettes.jpg',
    // Chaussettes de Noël laine, accrochées à la cheminée
    url: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600&h=450&fit=crop&auto=format&q=80'
  },
  {
    file: 'diffuseur.jpg',
    // Diffuseur huiles essentielles bois, ambiance cosy
    url: 'https://images.unsplash.com/photo-1616594266690-c3b8b4ae3b43?w=600&h=450&fit=crop&auto=format&q=80'
  },
  {
    file: 'camera.jpg',
    // Appareil photo instantané type Fuji Instax, rétro
    url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=450&fit=crop&auto=format&q=80'
  },
]

let done = 0
const total = images.length

const follow = (url, dest, file, redirects = 0) => {
  if (redirects > 8) return console.error(`✗ Trop de redirections : ${file}`)
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      follow(res.headers.location, dest, file, redirects + 1)
    } else if (res.statusCode === 200) {
      const ws = fs.createWriteStream(dest)
      res.pipe(ws)
      ws.on('finish', () => {
        console.log(`✓ ${file}`)
        if (++done === total) console.log('\n✅ Toutes les images sont prêtes dans public/imgs/')
      })
    } else {
      console.error(`✗ ${file} → HTTP ${res.statusCode}`)
      if (++done === total) console.log('\n⚠️  Terminé avec des erreurs.')
    }
  }).on('error', err => {
    console.error(`✗ ${file} → ${err.message}`)
    if (++done === total) console.log('\n⚠️  Terminé avec des erreurs.')
  })
}

images.forEach(({ file, url }) => {
  const dest = path.join(outDir, file)
  console.log(`⬇  Téléchargement : ${file}`)
  follow(url, dest, file)
})
