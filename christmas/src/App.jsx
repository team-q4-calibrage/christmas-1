import { useState, useEffect } from 'react'
import {
  ShoppingCart, Gift, Truck, ShieldCheck, Star, MessageCircle,
  Smartphone, Clock, Eye, CreditCard, Sparkles
} from 'lucide-react'
import './theme.css'
import './overlays.css'
import './index.css'
import { products } from './data/products'
import { formatPrice, whatsappLink } from './utils/shop'
import GiftAssistant from './components/GiftAssistant'
import ProductModal from './components/ProductModal'
import CartDrawer from './components/CartDrawer'
import { CheckoutPage, SuccessPage } from './components/Checkout'

const WHATSAPP_HELLO = 'Bonjour ! Je voudrais commander pour Noël 🎄'

const REVIEWS = [
  { name: 'Sophie M.', text: 'Le plaid personnalisé a fait pleurer ma maman de joie. Livraison ultra rapide, qualité au top !' },
  { name: 'Thomas D.', text: "L'étoile polaire rend notre salon magique. Les enfants sont fans. Site très sérieux et clair." },
]

const GUARANTEES = [
  { icon: Truck, title: 'Livré avant Noël', text: 'Pour toute commande avant le 20 décembre' },
  { icon: MessageCircle, title: 'Commande WhatsApp', text: 'Sans compte à créer' },
  { icon: ShieldCheck, title: 'Satisfait ou remboursé', text: '30 jours pour changer d’avis' },
  { icon: CreditCard, title: 'Paiement simple', text: 'Mobile Money ou carte Visa' },
]

// Calculés une seule fois pour que la neige ne "saute" pas à chaque rendu
const SNOWFLAKES = [...Array(18)].map(() => ({
  left: `${Math.random() * 100}%`,
  animationDuration: `${Math.random() * 4 + 7}s`,
  animationDelay: `${Math.random() * 7}s`,
  fontSize: `${Math.random() * 0.8 + 0.5}rem`,
}))

const Snowflakes = () => SNOWFLAKES.map((style, i) => (
  <span key={i} className="snowflake" style={style} aria-hidden="true">❅</span>
))

// Pas de backend : la commande est envoyée sous forme de message WhatsApp pré-rempli
const buildOrderMessage = (form, cart, total) => [
  'Bonjour, je souhaite passer commande 🎄',
  '',
  ...cart.map(i => `• ${i.name} × ${i.qty} — ${formatPrice(i.price * i.qty)}`),
  `Total : ${formatPrice(total)}`,
  '',
  `Nom : ${form.get('nom')}`,
  `Téléphone : ${form.get('telephone')}`,
  `Adresse : ${form.get('adresse')}`,
].join('\n')

function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) ?? []
    } catch {
      return []
    }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [view, setView] = useState('home') // 'home', 'checkout', 'success'
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    try { localStorage.setItem('cart', JSON.stringify(cart)) } catch { /* stockage indisponible */ }
  }, [cart])

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item))
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
    setIsCartOpen(true)
    setSelectedProduct(null)
  }

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id))

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  const handleCheckout = (e) => {
    e.preventDefault()
    const message = buildOrderMessage(new FormData(e.target), cart, cartTotal)
    window.open(whatsappLink(message), '_blank', 'noopener')
    setView('success')
    setCart([])
  }

  if (view === 'success') return <SuccessPage onBack={() => setView('home')} />
  if (view === 'checkout') {
    return <CheckoutPage total={cartTotal} onSubmit={handleCheckout} onCancel={() => setView('home')} />
  }

  return (
    <>
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />

      <div className="announce">
        🎄 Dernières commandes le <strong>20 décembre</strong> pour une livraison avant le réveillon
      </div>

      <header className="site-header">
        <div className="wrap">
          <div className="logo"><Sparkles size={20} className="logo-star" /><span>L'Atelier de <em>Noël</em></span></div>
          <nav className="nav">
            <a href="#produits">Cadeaux</a>
            <a href="#assistant">Assistant Cadeau</a>
            <a href="#livraison">Livraison</a>
            <button onClick={() => setIsCartOpen(true)} className="btn btn-forest btn-sm">
              <ShoppingCart size={16} /> Panier <span className="cart-count">{cartCount}</span>
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <Snowflakes />
          <div className="wrap">
            <div className="hero-text">
              <span className="eyebrow">Collection Noël 2026</span>
              <h1>Offrez la <em>magie</em> de Noël, sans le casse-tête</h1>
              <p>Des cadeaux choisis avec soin pour chaque budget et livrés à temps pour le réveillon.</p>
              <div className="btn-row">
                <a href="#produits" className="btn btn-primary">Découvrir les cadeaux</a>
                <a href="#assistant" className="btn btn-outline-light">Trouver mon cadeau</a>
              </div>
              <p className="urgency">
                <Clock size={16} aria-hidden="true" />
                Dernière commande le 20 décembre pour une livraison avant le 24
              </p>
            </div>
            <div className="hero-visual">
              <div className="hero-frame">
                <img src="/imgs/hero.jpg" alt="Cadeaux emballés en papier rouge avec rubans dorés et branches de sapin" className="hero-img" />
                <div className="hero-seal"><span><strong>2026</strong>Édition Noël</span></div>
              </div>
            </div>
          </div>
          <div className="lights" aria-hidden="true" />
        </section>

        <div className="proof-bar">
          <div className="wrap">
            {GUARANTEES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="proof-item">
                <span className="proof-icon"><Icon size={18} /></span>
                <div><strong>{title}</strong><span>{text}</span></div>
              </div>
            ))}
          </div>
        </div>

        <section className="section assistant" id="assistant">
          <div className="wrap">
            <div className="assistant-text">
              <span className="eyebrow">Assistant Cadeau</span>
              <h2>Pas d'idée ? Laissez-vous <em>guider</em>.</h2>
              <p>Trois questions sur le budget, la personne et ses envies — puis une suggestion prête à commander, ici ou directement sur WhatsApp.</p>
            </div>
            <GiftAssistant onAddToCart={addToCart} />
          </div>
        </section>

        <section id="produits" className="section products">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">La sélection</span>
              <h2>Nos cadeaux de <em>Noël</em></h2>
              <span className="ornament"><Star size={12} fill="currentColor" /></span>
            </div>
            <div className="product-grid">
              {products.map((product, idx) => (
                <article key={product.id} className="card" style={{ animationDelay: `${idx * 60}ms` }}>
                  <button className="card-photo" onClick={() => setSelectedProduct(product)} aria-label={`Aperçu : ${product.name}`}>
                    <img src={product.image} alt={product.name} loading="lazy" />
                    {product.badge && <span className="card-badge">{product.badge}</span>}
                    <span className="card-preview"><Eye size={14} /> Aperçu</span>
                  </button>
                  <div className="card-body">
                    <h3><button onClick={() => setSelectedProduct(product)}>{product.name}</button></h3>
                    <p className="card-desc">{product.description}</p>
                    <div className="card-footer">
                      <div className="price-row">
                        <span className="price-new">{formatPrice(product.price)}</span>
                        {product.originalPrice && <span className="price-old">{formatPrice(product.originalPrice)}</span>}
                      </div>
                      <button onClick={() => addToCart(product)} className="btn btn-primary btn-full">
                        <ShoppingCart size={16} /> Ajouter au panier
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Témoignages</span>
              <h2>Ils ont adoré leur <em>Noël</em></h2>
              <span className="ornament"><Star size={12} fill="currentColor" /></span>
            </div>
            <div className="review-grid">
              {REVIEWS.map(review => (
                <figure key={review.name} className="review">
                  <p>{review.text}</p>
                  <figcaption className="review-head">
                    <strong>{review.name}</strong>
                    <span className="stars" aria-label="5 étoiles sur 5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section help">
          <Snowflakes />
          <div className="wrap">
            <span className="ornament"><Star size={12} fill="currentColor" /></span>
            <h2>Besoin d'un <em>conseil</em> ?</h2>
            <p>Écrivez-nous sur WhatsApp : on vous aide à choisir et on confirme la date de livraison avec vous.</p>
            <a href={whatsappLink(WHATSAPP_HELLO)} target="_blank" rel="noreferrer" className="btn btn-light">
              <MessageCircle size={18} /> Demander conseil
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="livraison">
        <div className="wrap">
          <div className="footer-row">
            <div>
              <div className="footer-brand">L'Atelier de <em>Noël</em></div>
              <p className="footer-desc">Boutique de saison. Commandes par WhatsApp et livraison assurée avant le réveillon.</p>
            </div>
            <div>
              <div className="payment-label">Paiement</div>
              <div className="payment-value">Mobile Money · Visa</div>
            </div>
            <a href={whatsappLink(WHATSAPP_HELLO)} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              <Smartphone size={18} /> Écrire sur WhatsApp
            </a>
          </div>
          <div className="footer-bottom">© 2026 L'Atelier de Noël. Tous droits réservés.</div>
        </div>
      </footer>

      <a href={whatsappLink(WHATSAPP_HELLO)} target="_blank" rel="noreferrer" className="whatsapp-chatbot" title="Contactez-nous sur WhatsApp">
        <MessageCircle size={24} style={{ flexShrink: 0 }} />
        <span className="whatsapp-chatbot-label">Commandez via WhatsApp</span>
      </a>

      <div className="mobile-sticky-btn">
        <a href="#produits" className="btn btn-primary btn-full">
          Voir les cadeaux <Gift size={18} />
        </a>
      </div>

      {isCartOpen && (
        <CartDrawer
          cart={cart}
          total={cartTotal}
          onClose={() => setIsCartOpen(false)}
          onRemove={removeFromCart}
          onCheckout={() => { setIsCartOpen(false); setView('checkout') }}
        />
      )}
    </>
  )
}

export default App
