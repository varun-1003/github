import { Link, useNavigate, useParams } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'

function IssueDetails({ issues, onDelete }) {
  const { id } = useParams(); const navigate = useNavigate(); const issue = issues.find((item) => item.id === Number(id))
  if (!issue) return <main className="page-shell"><div className="empty-state detail-empty"><span className="empty-icon">?</span><h1>Issue not found</h1><p>This issue may have been deleted or the link is incorrect.</p><Link className="primary-button" to="/issues">Back to Issues</Link></div></main>
  const handleDelete = () => { onDelete(issue.id); navigate('/issues') }
  return <main className="page-shell narrow-shell"><Link className="back-link" to="/issues">← Back to Issues</Link><article className="detail-card"><div className="detail-top"><span className="issue-id">Issue #{issue.id}</span><StatusBadge status={issue.status} /></div><h1>{issue.title}</h1><div className="detail-divider" /><div className="detail-description"><p className="eyebrow">Description</p><p>{issue.description}</p></div><div className="detail-actions"><Link className="secondary-button" to={`/issues/${issue.id}/edit`}>Edit issue</Link><button className="danger-button" type="button" onClick={handleDelete}>Delete issue</button></div></article></main>
}

export default IssueDetails
