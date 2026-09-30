import { useState, useEffect } from 'react'
import { 
  ShoppingCart, Gift, Truck, Award, ShieldCheck, 
  Star, MessageCircle, CreditCard, Smartphone, 
  Lock, Trash2, X, Zap, Clock, Sparkles, PartyPopper 
} from 'lucide-react'
import './index.css'
import { products } from './data/products'

// Snowflakes Component
const Snowflakes = () => {
  return (
    <>
      {[...Array(15)].map((_, i) => (
        <div key={i} className="snowflake" style={{ 
          left: `${Math.random() * 100}vw`, 
          animationDuration: `${Math.random() * 3 + 5}s`,
          animationDelay: `${Math.random() * 5}s`,
          fontSize: `${Math.random() * 1 + 0.5}rem`
        }}>
          ❅
        </div>
      ))}
    </>
  )
}

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })
  
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [view, setView] = useState('home') // 'home', 'checkout', 'success'

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
  }

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id))
  
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0)

  const handleCheckout = (e) => {
    e.preventDefault()
    setView('success')
    setCart([])
  }

  if (view === 'success') {
    return (
      <div className="container py-5 text-center">
        <Snowflakes />
        <h1 className="text-primary mb-4 d-flex align-center justify-center gap-3">
          <PartyPopper size={40} /> Commande Confirmée !
        </h1>
        <p className="mb-4" style={{ fontSize: '1.2rem' }}>Merci pour votre achat. Vos cadeaux magiques sont en route !</p>
        <button onClick={() => setView('home')} className="btn btn-primary">Retour à la boutique</button>
      </div>
    )
  }

  if (view === 'checkout') {
    return (
      <div className="container py-5">
        <h1 className="text-center text-primary mb-4">Finaliser ma commande</h1>
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 className="mb-4">Total à payer : {cartTotal.toFixed(2)} €</h3>
          <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Nom complet</label>
              <input type="text" required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Téléphone</label>
              <input type="tel" required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Adresse de livraison</label>
              <textarea required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}></textarea>
            </div>
            
            <div className="mt-4 mb-4">
              <p className="mb-4 text-center"><strong>Moyens de paiement sécurisés</strong></p>
              <div className="d-flex justify-between align-center gap-3">
                <div className="d-flex align-center gap-3 justify-center" style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', flex: 1, border: '1px solid #ddd' }}>
                  <CreditCard className="text-primary" /> Carte Bancaire
                </div>
                <div className="d-flex align-center gap-3 justify-center" style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', flex: 1, border: '1px solid #ddd' }}>
                  <Smartphone className="text-primary" /> Mobile Money
                </div>
              </div>
              <p className="text-center mt-4 d-flex align-center justify-center gap-3" style={{ color: '#165B33', fontSize: '0.95rem', fontWeight: 'bold' }}>
                <Lock size={18} /> Paiement 100% sécurisé
              </p>
            </div>

            <button type="submit" className="btn btn-accent btn-full pulse-anim" style={{ fontSize: '1.2rem' }}>
              Confirmer la commande
            </button>
            <button type="button" onClick={() => setView('home')} className="btn" style={{ background: 'transparent', border: '1px solid #ccc' }}>
              Annuler
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <>
      <Snowflakes />
      
      {/* Header */}
      <header style={{ padding: '15px 0', background: 'white', position: 'sticky', top: 0, zIndex: 10, boxShadow: 'var(--shadow-sm)' }}>
        <nav className="container d-flex justify-between align-center">
          <h1 className="text-primary d-flex align-center gap-3" style={{ fontSize: '1.5rem', margin: 0 }}>
            <Sparkles size={24} /> Éclat d'Hiver
          </h1>
          <button onClick={() => setIsCartOpen(true)} className="btn btn-secondary d-flex align-center gap-3" style={{ background: 'var(--color-secondary)', color: 'white', padding: '10px 20px' }}>
            <ShoppingCart size={20} /> Panier ({cart.reduce((sum, item) => sum + item.qty, 0)})
          </button>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', padding: '80px 20px', background: 'linear-gradient(135deg, var(--color-primary), #901113)', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <span style={{ display: 'inline-block', background: 'var(--color-accent)', color: 'var(--color-text-dark)', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '1px' }}>
              OFFRE SPÉCIALE FÊTES
            </span>
            <h2 style={{ fontSize: '3rem', marginBottom: '20px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>L'Art d'Offrir, Tout Simplement.</h2>
            <p style={{ fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto 30px', opacity: 0.9 }}>
              Offrez la magie avec nos cadeaux cocooning, tech et éco-responsables. Profitez de nos offres avant rupture de stock !
            </p>
            
            {/* Countdown */}
            <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'inline-block', padding: '20px 30px', borderRadius: '15px', marginBottom: '40px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <p className="d-flex align-center justify-center gap-3" style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px' }}>
                <Clock size={20} /> Fin des promotions dans :
              </p>
              <div className="d-flex gap-4 justify-between" style={{ fontSize: '2rem', fontWeight: '900', fontFamily: 'var(--font-heading)' }}>
                <div className="text-center">02<span style={{ fontSize: '0.9rem', fontWeight: 'normal', display: 'block', textTransform: 'uppercase' }}>Jours</span></div>
                <div>:</div>
                <div className="text-center">14<span style={{ fontSize: '0.9rem', fontWeight: 'normal', display: 'block', textTransform: 'uppercase' }}>Heures</span></div>
                <div>:</div>
                <div className="text-center">36<span style={{ fontSize: '0.9rem', fontWeight: 'normal', display: 'block', textTransform: 'uppercase' }}>Min</span></div>
              </div>
            </div>
            <br />
            
            <a href="#produits" className="btn btn-accent pulse-anim d-inline-flex align-center gap-3" style={{ fontSize: '1.2rem', padding: '18px 40px' }}>
              J'en profite à -50% <Gift size={24} />
            </a>
          </div>
        </section>

        {/* Guarantees */}
        <section className="container py-5">
          <div className="d-flex gap-3 justify-between" style={{ flexWrap: 'wrap' }}>
            <div className="text-center" style={{ flex: '1 1 250px' }}>
              <div style={{ color: 'var(--color-primary)', display: 'flex', justifyContent: 'center', marginBottom: '15px' }}><Truck size={48} /></div>
              <h4 className="mb-4">Livraison Express</h4>
              <p style={{ color: '#666' }}>Garantie avant Noël pour toute commande passée aujourd'hui.</p>
            </div>
            <div className="text-center" style={{ flex: '1 1 250px' }}>
              <div style={{ color: 'var(--color-primary)', display: 'flex', justifyContent: 'center', marginBottom: '15px' }}><Award size={48} /></div>
              <h4 className="mb-4">Qualité Premium</h4>
              <p style={{ color: '#666' }}>Des produits soigneusement sélectionnés pour émerveiller.</p>
            </div>
            <div className="text-center" style={{ flex: '1 1 250px' }}>
              <div style={{ color: 'var(--color-primary)', display: 'flex', justifyContent: 'center', marginBottom: '15px' }}><ShieldCheck size={48} /></div>
              <h4 className="mb-4">Satisfait ou Remboursé</h4>
              <p style={{ color: '#666' }}>30 jours pour changer d'avis en toute tranquillité.</p>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="produits" className="container py-5" style={{ background: 'var(--color-bg-light)' }}>
          <h2 className="text-center text-primary" style={{ fontSize: '2.5rem', marginBottom: '50px' }}>Nos Cadeaux Magiques</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {products.map(product => (
              <article key={product.id} className="card">
                <div style={{ position: 'relative' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '280px', objectFit: 'cover' }} loading="lazy" />
                  {product.badge && (
                    <span className="badge" style={{ position: 'absolute', top: '15px', right: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div style={{ padding: '25px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: 'var(--color-text-dark)' }}>{product.name}</h3>
                  <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '20px', minHeight: '60px' }}>{product.description}</p>
                  
                  <div className="d-flex align-center gap-3 mb-4">
                    <span style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--color-primary)' }}>{product.price} €</span>
                    {product.originalPrice && (
                      <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '1.2rem' }}>{product.originalPrice} €</span>
                    )}
                  </div>
                  
                  <button onClick={() => addToCart(product)} className="btn btn-primary btn-full mb-4 d-flex align-center gap-3 justify-center">
                    Ajouter au panier <ShoppingCart size={20} />
                  </button>
                  
                  <p className="text-center d-flex align-center justify-center gap-3" style={{ fontSize: '0.9rem', color: '#d9534f', fontWeight: 'bold' }}>
                    <Zap size={16} /> Vite ! Plus que {product.stock} en stock.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="container py-5">
          <h2 className="text-center mb-4" style={{ fontSize: '2rem' }}>Ils ont adoré leur Noël</h2>
          <div className="d-flex gap-4" style={{ flexWrap: 'wrap' }}>
            <div className="card" style={{ padding: '30px', flex: '1 1 300px', borderTop: '4px solid var(--color-accent)' }}>
              <div className="d-flex align-center justify-between mb-4">
                <strong>Sophie M.</strong>
                <div className="d-flex gap-3" style={{ color: 'var(--color-accent)' }}>
                  <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                </div>
              </div>
              <p style={{ fontStyle: 'italic', color: '#555', lineHeight: 1.8 }}>"Le plaid personnalisé a fait pleurer ma maman de joie. Qualité incroyable et livraison ultra rapide ! Je commanderai encore l'année prochaine."</p>
            </div>
            <div className="card" style={{ padding: '30px', flex: '1 1 300px', borderTop: '4px solid var(--color-accent)' }}>
              <div className="d-flex align-center justify-between mb-4">
                <strong>Thomas D.</strong>
                <div className="d-flex gap-3" style={{ color: 'var(--color-accent)' }}>
                  <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                </div>
              </div>
              <p style={{ fontStyle: 'italic', color: '#555', lineHeight: 1.8 }}>"L'étoile polaire rend notre salon magique. Les enfants sont fans et l'application est super simple. Site très sérieux, je recommande les yeux fermés."</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: '#1A1A1A', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ marginBottom: '40px' }}>
            <a href="https://wa.me/33600000000?text=Bonjour,%20j'ai%20une%20question%20sur%20vos%20produits" target="_blank" rel="noreferrer" className="btn btn-whatsapp d-inline-flex align-center gap-3">
              <MessageCircle size={24} /> Une question ? Contactez-nous sur WhatsApp
            </a>
          </div>
          <p style={{ color: '#888' }}>© 2026 Éclat d'Hiver. Tous droits réservés.</p>
          <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '15px' }}>
            <span className="d-inline-flex align-center gap-3"><Lock size={14} /> Paiement 100% sécurisé</span> | Contact : support@eclatdhiver.fr 
          </p>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="mobile-sticky-btn">
        <a href="#produits" className="btn btn-accent btn-full pulse-anim d-flex align-center gap-3 justify-center">
          Acheter Maintenant <Gift size={20} />
        </a>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-between align-center mb-4 pb-3" style={{ borderBottom: '1px solid #eee' }}>
              <h2 className="d-flex align-center gap-3"><ShoppingCart size={24} /> Mon Panier</h2>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <X size={28} />
              </button>
            </div>
            
            {cart.length === 0 ? (
              <p className="text-center mt-4 text-secondary">Votre panier est vide.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 70px)' }}>
                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
                  {cart.map(item => (
                    <div key={item.id} className="d-flex gap-3 align-center mb-4 pb-3" style={{ borderBottom: '1px solid #f5f5f5' }}>
                      <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '10px' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', lineHeight: 1.2 }}>{item.name}</h4>
                        <div className="d-flex justify-between align-center">
                          <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{item.price} € <span style={{ color: '#999', fontWeight: 'normal', fontSize: '0.9rem' }}>x {item.qty}</span></span>
                          <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', padding: '5px' }}>
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '2px solid #eee' }}>
                  <div className="d-flex justify-between align-center mb-4" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    <span>Total:</span>
                    <span className="text-primary">{cartTotal.toFixed(2)} €</span>
                  </div>
                  <button onClick={() => { setIsCartOpen(false); setView('checkout'); }} className="btn btn-primary btn-full pulse-anim d-flex align-center gap-3 justify-center" style={{ fontSize: '1.1rem' }}>
                    Passer la commande <Lock size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default App
