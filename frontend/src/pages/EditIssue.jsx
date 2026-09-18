import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditIssue({ issues, onUpdate }) {
  const { id } = useParams(); const navigate = useNavigate(); const issue = issues.find((item) => item.id === Number(id))
  const [form, setForm] = useState(issue ? { title: issue.title, description: issue.description, status: issue.status } : null)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  if (!issue || !form) return <main className="page-shell"><div className="empty-state detail-empty"><h1>Issue not found</h1><Link className="primary-button" to="/issues">Back to Issues</Link></div></main>
  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const handleSubmit = async (event) => {
    event.preventDefault()
    const title = form.title.trim(); const description = form.description.trim()
    if (!title || !description || !form.status) { setError('Please complete every field.'); return }
    setError('')
    setIsSubmitting(true)
    try {
      await onUpdate(issue.id, { title, description, status: form.status })
      navigate(`/issues/${issue.id}`)
    } catch (requestError) {
      setError(requestError.message || 'Unable to update the issue.')
    } finally {
      setIsSubmitting(false)
    }
  }
  return <main className="page-shell narrow-shell"><section className="page-heading"><div><p className="eyebrow">Issue #{issue.id}</p><h1>Edit Issue</h1><p>Update the details or move this issue to a new status.</p></div></section><form className="form-card" onSubmit={handleSubmit} noValidate>{error && <div className="form-error" role="alert">{error}</div>}<label>Title<input name="title" value={form.title} onChange={handleChange} /></label><label>Description<textarea name="description" value={form.description} onChange={handleChange} rows="7" /></label><label>Status<select name="status" value={form.status} onChange={handleChange}><option>Open</option><option>In Progress</option><option>Closed</option></select></label><div className="form-actions"><Link className="secondary-button" to={`/issues/${issue.id}`} aria-disabled={isSubmitting}>Cancel</Link><button className="primary-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save changes'}</button></div></form></main>
}

export default EditIssue
