// Script to download real product images from picsum.photos into public/imgs/
// Seeds chosen to match the product visuals (warm, cozy, lifestyle themed)
const https = require('https')
const fs = require('fs')
const path = require('path')

const outDir = path.join(__dirname, '..', 'public', 'imgs')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const images = [
  // id, seed, filename  (seeds chosen to match product aesthetics)
  { file: 'plaid.jpg',      seed: '342' },   // warm textiles / cozy interior
  { file: 'led.jpg',        seed: '240' },   // lights / sparkle
  { file: 'coffret.jpg',    seed: '417' },   // gift / warm objects
  { file: 'chocolat.jpg',   seed: '225' },   // food / hot drink
  { file: 'projecteur.jpg', seed: '366' },   // technology / screen
  { file: 'chaussettes.jpg',seed: '432' },   // fabric / cozy
  { file: 'diffuseur.jpg',  seed: '116' },   // wood / nature interior
  { file: 'camera.jpg',     seed: '392' },   // retro camera
]

let done = 0
images.forEach(({ file, seed }) => {
  const url = `https://picsum.photos/seed/${seed}/600/450`
  const dest = path.join(outDir, file)
  
  if (fs.existsSync(dest)) {
    console.log(`✓ Already exists: ${file}`)
    done++
    if (done === images.length) console.log('\n✅ All images ready in public/imgs/')
    return
  }

  const follow = (url, redirects = 0) => {
    if (redirects > 5) return console.error(`Too many redirects: ${file}`)
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        follow(res.headers.location, redirects + 1)
      } else if (res.statusCode === 200) {
        const ws = fs.createWriteStream(dest)
        res.pipe(ws)
        ws.on('finish', () => {
          console.log(`✓ Downloaded: ${file}`)
          done++
          if (done === images.length) console.log('\n✅ All images ready in public/imgs/')
        })
      } else {
        console.error(`✗ Failed ${file}: HTTP ${res.statusCode}`)
        done++
      }
    }).on('error', err => {
      console.error(`✗ Error ${file}: ${err.message}`)
      done++
    })
  }
  follow(url)
})
