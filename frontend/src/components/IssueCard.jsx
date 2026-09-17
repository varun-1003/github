import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

function IssueCard({ issue, onDelete }) {
  return (
    <article className="issue-card">
      <div className="issue-card-main">
        <div className="issue-card-heading">
          <span className="issue-id">#{String(issue.id).slice(-4)}</span>
          <StatusBadge status={issue.status} />
        </div>
        <h3>{issue.title}</h3>
        <p>{issue.description}</p>
      </div>
      <div className="issue-actions">
        <Link className="text-button" to={`/issues/${issue.id}`}>View</Link>
        <Link className="text-button" to={`/issues/${issue.id}/edit`}>Edit</Link>
        <button className="text-button danger-text" type="button" onClick={() => onDelete(issue.id)}>Delete</button>
      </div>
    </article>
  )
}

export default IssueCard
