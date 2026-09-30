import { useEffect } from 'react'
import { ShieldCheck, ShoppingCart, Truck, X } from 'lucide-react'
import { formatPrice } from '../utils/shop'

export default function ProductModal({ product, onClose, onAddToCart }) {
  // Bloque le défilement de la page derrière l'aperçu et ferme avec Échap
  useEffect(() => {
    if (!product) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [product, onClose])

  if (!product) return null

  return (
    <div className="overlay overlay-sheet" onClick={onClose}>
      <div className="modal-content" role="dialog" aria-modal="true" aria-label={product.name} onClick={e => e.stopPropagation()}>
        <div className="modal-media">
          <img src={product.image} alt={product.name} />
          {product.badge && <span className="card-badge">{product.badge}</span>}
          <button onClick={onClose} className="modal-close" aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        <div className="modal-info">
          <span className="eyebrow">Collection Noël</span>
          <h2>{product.name}</h2>
          <p className="modal-desc">{product.description}</p>
          <ul className="modal-perks">
            <li><Truck size={16} /> Livré avant Noël</li>
            <li><ShieldCheck size={16} /> Satisfait ou remboursé 30 jours</li>
          </ul>
          <div className="modal-buy">
            <div className="price-row">
              <span className="price-new">{formatPrice(product.price)}</span>
              {product.originalPrice && <span className="price-old">{formatPrice(product.originalPrice)}</span>}
            </div>
            <button onClick={() => onAddToCart(product)} className="btn btn-primary">
              <ShoppingCart size={18} /> Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
