import { useState } from 'react'
import { ArrowRight, Smartphone } from 'lucide-react'
import { products } from '../data/products'
import { formatPrice, whatsappLink } from '../utils/shop'

const STEPS = [
  {
    label: 'Budget',
    question: 'Quel est votre budget ?',
    choices: [
      { text: 'Moins de 30 €', max: 30 },
      { text: 'Entre 30 € et 60 €', min: 30, max: 60 },
      { text: 'Pas de limite' },
    ],
  },
  {
    label: 'Pour qui',
    question: 'Pour qui est ce cadeau ?',
    choices: [{ text: 'Un(e) ami(e)' }, { text: 'De la famille' }, { text: 'Mon partenaire' }],
  },
  {
    label: 'Envie',
    question: "Qu'est-ce qu'ils aiment le plus ?",
    choices: [{ text: 'La décoration' }, { text: 'La gourmandise' }, { text: 'La technologie' }],
  },
]

const pickRecommendation = ({ min = 0, max = Infinity }) => {
  const inBudget = products.filter(p => p.price >= min && p.price <= max)
  const pool = inBudget.length > 0 ? inBudget : products
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function GiftAssistant({ onAddToCart }) {
  const [step, setStep] = useState(0)
  const [budget, setBudget] = useState({})
  const [recommendation, setRecommendation] = useState(null)

  const choose = (choice) => {
    if (step === 0) setBudget(choice)
    if (step === STEPS.length - 1) setRecommendation(pickRecommendation(budget))
    setStep(step + 1)
  }

  const restart = () => {
    setStep(0)
    setBudget({})
    setRecommendation(null)
  }

  const current = STEPS[step]

  return (
    <div className="assistant-panel">
      <div className="steps">
        {STEPS.map((s, i) => (
          <div key={s.label} style={{ display: 'contents' }}>
            {i > 0 && <ArrowRight size={18} className="step-arrow" aria-hidden="true" />}
            <div className={`step ${i === step ? 'is-active' : ''} ${i < step ? 'is-done' : ''}`}>
              <div className="label">Étape {i + 1}</div>
              <div className="value">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {current && (
        <>
          <p className="question">{current.question}</p>
          <div className="choices">
            {current.choices.map(choice => (
              <button key={choice.text} onClick={() => choose(choice)} className="btn btn-choice">
                {choice.text}
              </button>
            ))}
          </div>
        </>
      )}

      {recommendation && (
        <>
          <p className="question">Notre recommandation pour vous :</p>
          <div className="reco">
            <img src={recommendation.image} alt={recommendation.name} />
            <div>
              <h4>{recommendation.name}</h4>
              <p className="price-new">{formatPrice(recommendation.price)}</p>
              <div className="reco-actions">
                <button onClick={() => { onAddToCart(recommendation); restart() }} className="btn btn-primary btn-sm">
                  Ajouter au panier
                </button>
                <a
                  href={whatsappLink(`Bonjour, je souhaite commander : ${recommendation.name}`)}
                  target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-sm"
                >
                  <Smartphone size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button onClick={restart} className="btn btn-ghost btn-sm">Recommencer</button>
          </div>
        </>
      )}
    </div>
  )
}
