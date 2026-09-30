import { Lock, ShoppingCart, Trash2, X } from 'lucide-react'
import { formatPrice } from '../utils/shop'

export default function CartDrawer({ cart, total, onClose, onRemove, onCheckout }) {
  return (
    <div className="overlay" onClick={onClose}>
      <aside className="cart-sidebar" aria-label="Panier" onClick={e => e.stopPropagation()}>
        <div className="cart-head">
          <h2><ShoppingCart size={22} /> Panier</h2>
          <button onClick={onClose} className="icon-btn" aria-label="Fermer le panier">
            <X size={26} />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="cart-empty">Votre panier est vide.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div style={{ flex: 1 }}>
                    <h4>{item.name}</h4>
                    <div className="cart-item-row">
                      <span className="cart-item-price">
                        {formatPrice(item.price)} <small>× {item.qty}</small>
                      </span>
                      <button onClick={() => onRemove(item.id)} className="icon-btn cart-remove" aria-label={`Retirer ${item.name}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-foot">
              <div className="cart-total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button onClick={onCheckout} className="btn btn-primary btn-full">
                Passer la commande <Lock size={16} />
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
