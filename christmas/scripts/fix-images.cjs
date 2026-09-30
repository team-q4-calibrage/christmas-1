// Correction : retélécharge les 2 images échouées avec des URLs alternatives
const https = require('https')
const fs = require('fs')
const path = require('path')

const outDir = path.join(__dirname, '..', 'public', 'imgs')

const images = [
  {
    file: 'plaid.jpg',
    // Plaid laine hiver, couverture douce sur canapé
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=450&fit=crop&auto=format&q=80'
  },
  {
    file: 'diffuseur.jpg',
    // Diffuseur huiles essentielles ambiance zen intérieur
    url: 'https://images.unsplash.com/photo-1608828494541-d1a22b54d3a7?w=600&h=450&fit=crop&auto=format&q=80'
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
        if (++done === total) console.log('\n✅ Correction terminée !')
      })
    } else {
      console.error(`✗ ${file} → HTTP ${res.statusCode}`)
      if (++done === total) console.log('\n⚠️  Terminé.')
    }
  }).on('error', err => {
    console.error(`✗ ${file} → ${err.message}`)
    if (++done === total) console.log('\n⚠️  Terminé.')
  })
}

images.forEach(({ file, url }) => {
  const dest = path.join(outDir, file)
  console.log(`⬇  ${file}`)
  follow(url, dest, file)
})
