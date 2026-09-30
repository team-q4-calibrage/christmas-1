import { useState, useEffect } from 'react'
import {
  ShoppingCart, Gift, Truck, ShieldCheck, Star, MessageCircle,
  Smartphone, Clock, Eye, CreditCard
} from 'lucide-react'
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

// Calculés une seule fois pour que la neige ne "saute" pas à chaque rendu
const SNOWFLAKES = [...Array(15)].map(() => ({
  left: `${Math.random() * 100}%`,
  animationDuration: `${Math.random() * 4 + 6}s`,
  animationDelay: `${Math.random() * 6}s`,
  fontSize: `${Math.random() * 0.8 + 0.5}rem`,
}))

const Snowflakes = () => SNOWFLAKES.map((style, i) => (
  <span key={i} className="snowflake" style={style} aria-hidden="true">❅</span>
))

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [view, setView] = useState('home') // 'home', 'checkout', 'success'
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
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

    // Netlify Forms hidden submission handling (Simulated since we don't actually post in Dev mode)
    const formData = new FormData(e.target)
    formData.append("form-name", "commande")
    formData.append("panier", JSON.stringify(cart.map(i => `${i.name} (x${i.qty})`)))

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    }).then(() => {
      // Ignore errors in dev
    }).catch(() => {})

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

      <header className="site-header">
        <div className="wrap">
          <div className="logo">L'Atelier de Noël</div>
          <nav className="nav">
            <a href="#produits">Coffrets</a>
            <a href="#assistant">Assistant Cadeau</a>
            <a href="#livraison">Livraison</a>
            <button onClick={() => setIsCartOpen(true)} className="btn btn-forest btn-sm">
              <ShoppingCart size={16} /> Panier · {cartCount}
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <Snowflakes />
          <div className="wrap">
            <div className="hero-text">
              <span className="eyebrow">Édition de Noël 2026</span>
              <h1>Le cadeau parfait, sans le casse-tête</h1>
              <p>Des cadeaux pensés pour chaque budget, choisis en 30 secondes par notre Assistant Cadeau, livrés à temps pour le réveillon.</p>
              <div className="btn-row">
                <a href="#assistant" className="btn btn-primary">Je trouve mon cadeau</a>
                <a href={whatsappLink(WHATSAPP_HELLO)} target="_blank" rel="noreferrer" className="btn btn-outline-light">
                  Commander sur WhatsApp
                </a>
              </div>
              <p className="urgency">
                <Clock size={16} aria-hidden="true" />
                Dernière commande le 20 décembre pour une livraison avant le 24
              </p>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="gift">
                <span className="box" /><span className="rv" /><span className="rh" /><span className="bow" />
              </div>
            </div>
          </div>
        </section>

        <div className="proof-bar">
          <span><Truck size={16} /> Livraison garantie avant Noël</span>
          <span><ShieldCheck size={16} /> Satisfait ou remboursé 30 jours</span>
          <span><CreditCard size={16} /> Mobile Money &amp; Visa</span>
        </div>

        <section className="section assistant" id="assistant">
          <div className="wrap">
            <div className="assistant-text">
              <h2>Pas d'idée de cadeau ? Laissez-vous guider.</h2>
              <p>Trois questions sur le budget, la personne et ses envies — puis une suggestion prête à commander, ici ou directement sur WhatsApp.</p>
            </div>
            <GiftAssistant onAddToCart={addToCart} />
          </div>
        </section>

        <section id="produits" className="section products">
          <div className="wrap">
            <h2 className="section-title">Nos cadeaux du moment</h2>
            <div className="product-grid">
              {products.map((product, idx) => (
                <article
                  key={product.id}
                  className="card"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <button className="card-photo" onClick={() => setSelectedProduct(product)} aria-label={`Aperçu : ${product.name}`}>
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <span className="card-preview"><Eye size={14} /> Aperçu</span>
                  </button>
                  <div className="card-body">
                    {product.badge && <span className="tag">{product.badge}</span>}
                    <h3><button onClick={() => setSelectedProduct(product)}>{product.name}</button></h3>
                    <p className="card-desc">{product.description}</p>
                    <div className="card-footer">
                      <div className="price-row">
                        <span className="price-new">{formatPrice(product.price)}</span>
                        {product.originalPrice && <span className="price-old">{formatPrice(product.originalPrice)}</span>}
                      </div>
                      <button onClick={() => addToCart(product)} className="btn btn-primary btn-full">
                        Ajouter au panier
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
            <h2 className="section-title">Ils ont adoré leur Noël</h2>
            <div className="review-grid">
              {REVIEWS.map(review => (
                <div key={review.name} className="review">
                  <div className="review-head">
                    <strong>{review.name}</strong>
                    <div className="stars" aria-label="5 étoiles sur 5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                  </div>
                  <p>« {review.text} »</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section help">
          <h2>Besoin d'un conseil avant de commander ?</h2>
          <p>Écrivez-nous sur WhatsApp : on vous aide à choisir et on confirme la date de livraison avec vous.</p>
          <div className="gift gift-sm" aria-hidden="true">
            <span className="box" /><span className="rv" /><span className="rh" /><span className="bow" />
          </div>
          <a href={whatsappLink(WHATSAPP_HELLO)} target="_blank" rel="noreferrer" className="btn btn-light">
            Demander conseil
          </a>
        </section>
      </main>

      <footer className="site-footer" id="livraison">
        <div className="wrap">
          <div className="footer-row">
            <div>
              <div className="footer-brand">L'Atelier de Noël</div>
              <p className="footer-desc">Boutique de saison. Commandes traitées par formulaire et WhatsApp, livraison assurée avant le réveillon.</p>
            </div>
            <div>
              <div className="payment-label">Moyens de paiement (démo)</div>
              <div className="payment-value">Mobile Money · Visa · Paiement sécurisé</div>
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
