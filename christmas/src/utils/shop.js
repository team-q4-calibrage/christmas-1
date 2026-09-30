// Changer ces deux constantes suffit pour passer en F CFA ('XOF') ou modifier le numéro.
const CURRENCY = 'EUR'
// Format international sans « + » : indicatif Bénin (229) + 01 53 50 88 12
const WHATSAPP_NUMBER = '2290153508812'

const priceFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: CURRENCY })

export const formatPrice = (amount) => priceFormatter.format(amount)

export const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
