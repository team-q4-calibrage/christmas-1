import { ShieldCheck, ShoppingCart, X } from 'lucide-react'
import { formatPrice } from '../utils/shop'

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" aria-label={product.name} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="icon-btn modal-close" aria-label="Fermer">
          <X size={26} />
        </button>

        <div className="modal-grid">
          <img src={product.image} alt={product.name} />
          <div className="modal-info">
            {product.badge && <span className="tag">{product.badge}</span>}
            <h2>{product.name}</h2>
            <p style={{ color: 'var(--ink-soft)' }}>{product.description}</p>
            <div className="price-row">
              <span className="price-new">{formatPrice(product.price)}</span>
              {product.originalPrice && <span className="price-old">{formatPrice(product.originalPrice)}</span>}
            </div>
            <p className="guarantee"><ShieldCheck size={18} /> Garantie 30 jours · Livraison avant Noël</p>
            <button onClick={() => onAddToCart(product)} className="btn btn-primary btn-full">
              Ajouter au panier <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
