import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddIssue({ onAdd }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', description: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const handleSubmit = async (event) => {
    event.preventDefault()
    const title = form.title.trim(); const description = form.description.trim()
    if (!title || !description) { setError('Please provide both a title and description.'); return }
    setError('')
    setIsSubmitting(true)
    try {
      await onAdd({ title, description, status: 'Open' })
      navigate('/issues', { state: { message: 'Issue created successfully.' } })
    } catch (requestError) {
      setError(requestError.message || 'Unable to create the issue.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return <main className="page-shell narrow-shell"><section className="page-heading"><div><p className="eyebrow">New work item</p><h1>Add Issue</h1><p>Capture a problem for the team to pick up.</p></div></section><form className="form-card" onSubmit={handleSubmit} noValidate>{error && <div className="form-error" role="alert">{error}</div>}<label>Title<input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Search results are empty" autoFocus /></label><label>Description<textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe what is happening and where..." rows="7" /></label><div className="form-actions"><button className="secondary-button" type="button" onClick={() => navigate('/issues')} disabled={isSubmitting}>Cancel</button><button className="primary-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create issue'}</button></div></form></main>
}

export default AddIssue
