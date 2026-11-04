import { useId, useState } from 'react'
import { emi, rupees, yearlySchedule } from '../lib/loan.js'

const LIMITS = {
  amount: { min: 25000, max: 5000000, step: 5000 },
  rate: { min: 8, max: 30, step: 0.25 },
  tenure: { min: 6, max: 60, step: 1 },
}

const clamp = (v, { min, max }) => Math.min(Math.max(v, min), max)

function Field({ label, value, onChange, limits, format, suffix, prefix }) {
  const id = useId()
  const [draft, setDraft] = useState(null)
  const pct = ((value - limits.min) / (limits.max - limits.min)) * 100
  const commit = (raw) => {
    const n = parseFloat(String(raw).replace(/[^0-9.]/g, ''))
    if (!Number.isNaN(n)) onChange(clamp(n, limits))
    setDraft(null)
  }
  return (
    <div className="calc__field">
      <div className="calc__label-row">
        <label htmlFor={id}>{label}</label>
        <div className="calc__input">
          {prefix ? <span>{prefix}</span> : null}
          <input
            type="text"
            inputMode="decimal"
            aria-label={`${label} value`}
            value={draft ?? format(value)}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={(e) => commit(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && commit(e.currentTarget.value)}
          />
          {suffix ? <span>{suffix}</span> : null}
        </div>
      </div>
      <input
        id={id}
        className="range"
        type="range"
        min={limits.min}
        max={limits.max}
        step={limits.step}
        value={value}
        style={{ '--pct': `${pct}%` }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="calc__minmax">
        <span>{prefix}{format(limits.min)}{suffix ? ` ${suffix}` : ''}</span>
        <span>{prefix}{format(limits.max)}{suffix ? ` ${suffix}` : ''}</span>
      </div>
    </div>
  )
}

function Donut({ principal, interest }) {
  const total = principal + interest
  const r = 54
  const c = 2 * Math.PI * r
  const pShare = total ? principal / total : 1
  return (
    <svg className="donut" viewBox="0 0 140 140" role="img" aria-label="Principal versus interest">
      <circle cx="70" cy="70" r={r} fill="none" stroke="var(--c-accent)" strokeWidth="18" />
      <circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke="var(--c-brand)"
        strokeWidth="18"
        strokeDasharray={`${c * pShare} ${c}`}
        transform="rotate(-90 70 70)"
      />
    </svg>
  )
}

const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

export default function EmiCalculator({ compact = false }) {
  const [amount, setAmount] = useState(500000)
  const [rate, setRate] = useState(14)
  const [tenure, setTenure] = useState(36)

  const monthly = emi(amount, rate, tenure)
  const total = monthly * tenure
  const interest = total - amount
  const schedule = compact ? [] : yearlySchedule(amount, rate, tenure)

  return (
    <div className={`calc ${compact ? 'calc--compact' : ''}`}>
      <div className="calc__inputs">
        <Field
          label="Loan amount"
          value={amount}
          onChange={setAmount}
          limits={LIMITS.amount}
          prefix="₹"
          format={(v) => inr.format(v)}
        />
        <Field
          label="Interest rate (p.a.)"
          value={rate}
          onChange={setRate}
          limits={LIMITS.rate}
          suffix="%"
          format={(v) => String(Number(v.toFixed(2)))}
        />
        <Field
          label="Loan tenure"
          value={tenure}
          onChange={(v) => setTenure(Math.round(v))}
          limits={LIMITS.tenure}
          suffix="months"
          format={(v) => String(Math.round(v))}
        />
      </div>

      <div className="calc__result" aria-live="polite">
        <p className="calc__emi-label">Your monthly EMI</p>
        <p className="calc__emi">{rupees(monthly)}</p>
        <div className="calc__chart">
          <Donut principal={amount} interest={interest} />
          <ul className="calc__legend">
            <li>
              <span className="dot dot--brand" /> Principal <strong>{rupees(amount)}</strong>
            </li>
            <li>
              <span className="dot dot--accent" /> Total interest <strong>{rupees(interest)}</strong>
            </li>
            <li className="calc__total">
              Total amount payable <strong>{rupees(total)}</strong>
            </li>
          </ul>
        </div>
        <p className="calc__note">
          Estimate only, based on a reducing-balance rate. It excludes processing fees, GST and other lender charges,
          and is not a loan offer. Your actual EMI and APR are shown in the lender&apos;s Key Facts Statement.
        </p>
      </div>

      {!compact && schedule.length ? (
        <details className="calc__schedule">
          <summary>View year-wise repayment schedule</summary>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Year</th>
                  <th scope="col">Principal paid</th>
                  <th scope="col">Interest paid</th>
                  <th scope="col">Balance at year end</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.year}>
                    <td>Year {row.year}</td>
                    <td>{rupees(row.principal)}</td>
                    <td>{rupees(row.interest)}</td>
                    <td>{rupees(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ) : null}
    </div>
  )
}
