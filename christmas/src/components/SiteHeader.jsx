import { useState } from 'react'
import { Menu, ShoppingCart, Sparkles, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#produits', label: 'Cadeaux' },
  { href: '#assistant', label: 'Assistant Cadeau' },
  { href: '#livraison', label: 'Livraison & contact' },
]

export default function SiteHeader({ cartCount, onOpenCart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="wrap">
        <div className="logo"><Sparkles size={20} className="logo-star" /><span>L'Atelier de <em>Noël</em></span></div>
        <nav className="nav" aria-label="Menu principal">
          {NAV_LINKS.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="nav header-actions">
          <button onClick={onOpenCart} className="btn btn-forest btn-sm" aria-label={`Panier, ${cartCount} article(s)`}>
            <ShoppingCart size={16} /><span className="cart-label">Panier</span><span className="cart-count">{cartCount}</span>
          </button>
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Menu mobile">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>{link.label}</a>
          ))}
        </nav>
      )}
    </header>
  )
}
