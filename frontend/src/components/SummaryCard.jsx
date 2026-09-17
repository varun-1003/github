function SummaryCard({ label, value, tone }) {
  return (
    <article className={`summary-card summary-${tone}`}>
      <div className="summary-dot" aria-hidden="true" />
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  )
}

export default SummaryCard
