import { CreditCard, Lock, PartyPopper, Smartphone } from 'lucide-react'
import { formatPrice } from '../utils/shop'

export function CheckoutPage({ total, onSubmit, onCancel }) {
  return (
    <div className="page">
      <h1>Finaliser ma commande</h1>
      <div className="panel">
        <h3 className="panel-total">Total à payer : {formatPrice(total)}</h3>
        {/* Netlify Form Structure */}
        <form name="commande" data-netlify="true" onSubmit={onSubmit} className="form">
          <input type="hidden" name="form-name" value="commande" />
          <div className="field">
            <label htmlFor="nom">Nom complet</label>
            <input id="nom" type="text" name="nom" required />
          </div>
          <div className="field">
            <label htmlFor="telephone">Téléphone</label>
            <input id="telephone" type="tel" name="telephone" required />
          </div>
          <div className="field">
            <label htmlFor="adresse">Adresse de livraison</label>
            <textarea id="adresse" name="adresse" required rows="3"></textarea>
          </div>

          <div>
            <p className="pay-title">Moyens de paiement</p>
            <div className="pay-options">
              <div className="pay-option"><Smartphone size={20} /> Mobile Money</div>
              <div className="pay-option"><CreditCard size={20} /> Carte Visa</div>
            </div>
            <p className="pay-note"><Lock size={16} /> Paiement sécurisé (démo)</p>
          </div>

          <button type="submit" className="btn btn-primary btn-full">Confirmer la commande</button>
          <button type="button" onClick={onCancel} className="btn btn-ghost btn-full">Annuler</button>
        </form>
      </div>
    </div>
  )
}

export function SuccessPage({ onBack }) {
  return (
    <div className="page success">
      <h1><PartyPopper size={36} /> Commande confirmée !</h1>
      <p>Merci pour votre achat. Notre équipe prépare vos cadeaux et vous contacte pour la livraison.</p>
      <button onClick={onBack} className="btn btn-forest">Retour à la boutique</button>
    </div>
  )
}
