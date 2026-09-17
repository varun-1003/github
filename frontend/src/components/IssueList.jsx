import IssueCard from './IssueCard'

function IssueList({ issues, onDelete }) {
  if (!issues.length) {
    return <div className="empty-state"><span className="empty-icon">∅</span><h3>No issues found</h3><p>Try changing your search or status filter.</p></div>
  }

  return <div className="issue-list">{issues.map((issue) => <IssueCard key={issue.id} issue={issue} onDelete={onDelete} />)}</div>
}

export default IssueList
