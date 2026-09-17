const statusClass = {
  Open: 'status-open',
  'In Progress': 'status-progress',
  Closed: 'status-closed',
}

function StatusBadge({ status }) {
  return <span className={`status-badge ${statusClass[status] || 'status-unknown'}`}>{status || 'Unknown'}</span>
}

export default StatusBadge
