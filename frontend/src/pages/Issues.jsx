import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import IssueList from '../components/IssueList'

function Issues({ issues, onDelete }) {
  const location = useLocation()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const filteredIssues = useMemo(() => issues.filter((issue) => {
    const matchesSearch = `${issue.title} ${issue.description}`.toLowerCase().includes(search.toLowerCase())
    return matchesSearch && (status === 'All' || issue.status === status)
  }), [issues, search, status])
  const clearFilters = () => { setSearch(''); setStatus('All') }

  return (
    <main className="page-shell">
      <section className="page-heading"><div><p className="eyebrow">Project backlog</p><h1>Issues</h1><p>View, search, filter and manage all issues.</p></div><Link className="primary-button" to="/issues/new"><span>+</span> Add Issue</Link></section>
      {location.state?.message && <div className="success-message" role="status">{location.state.message}</div>}
      <section className="filter-panel">
        <label className="search-field"><span className="sr-only">Search issues</span><span className="search-icon">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title or description..." /></label>
        <label className="select-field"><span className="sr-only">Filter by status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option><option>Open</option><option>In Progress</option><option>Closed</option></select></label>
      </section>
      <div className="results-bar"><span>Showing <strong>{filteredIssues.length}</strong> {filteredIssues.length === 1 ? 'issue' : 'issues'}</span>{(search || status !== 'All') && <button className="clear-button" type="button" onClick={clearFilters}>Clear filters</button>}</div>
      <IssueList issues={filteredIssues} onDelete={onDelete} />
    </main>
  )
}

export default Issues
