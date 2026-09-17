import { Link } from 'react-router-dom'
import SummaryCard from '../components/SummaryCard'
import IssueList from '../components/IssueList'

function Dashboard({ issues, onDelete }) {
  const counts = {
    total: issues.length,
    open: issues.filter((issue) => issue.status === 'Open').length,
    progress: issues.filter((issue) => issue.status === 'In Progress').length,
    closed: issues.filter((issue) => issue.status === 'Closed').length,
  }

  return (
    <main className="page-shell">
      <section className="page-heading dashboard-heading">
        <div><p className="eyebrow">Workspace overview</p><h1>Issue Tracker</h1><p>Monitor and manage project issues.</p></div>
        <Link className="primary-button" to="/issues/new"><span>+</span> Add Issue</Link>
      </section>
      <section className="summary-grid" aria-label="Issue statistics">
        <SummaryCard label="Total Issues" value={counts.total} tone="total" />
        <SummaryCard label="Open" value={counts.open} tone="open" />
        <SummaryCard label="In Progress" value={counts.progress} tone="progress" />
        <SummaryCard label="Closed" value={counts.closed} tone="closed" />
      </section>
      <section className="content-section">
        <div className="section-heading"><div><p className="eyebrow">Activity</p><h2>Recent Issues</h2></div><Link className="link-arrow" to="/issues">View all issues <span>→</span></Link></div>
        <IssueList issues={issues.slice(0, 4)} onDelete={onDelete} />
      </section>
    </main>
  )
}

export default Dashboard
