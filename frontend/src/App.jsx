import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { createIssue, deleteIssue, getIssues, updateIssue } from './services/api'
import Dashboard from './pages/Dashboard'
import Issues from './pages/Issues'
import AddIssue from './pages/AddIssue'
import IssueDetails from './pages/IssueDetails'
import EditIssue from './pages/EditIssue'

function App() {
  const [issues, setIssues] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [operationError, setOperationError] = useState('')

  useEffect(() => {
    let isMounted = true

    getIssues()
      .then((data) => {
        if (isMounted) setIssues(data)
      })
      .catch((error) => {
        if (isMounted) setLoadError(error.message || 'Unable to load issues.')
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => { isMounted = false }
  }, [])

  const handleAdd = async (data) => {
    const created = await createIssue(data)
    setIssues((current) => [created, ...current])
  }

  const handleUpdate = async (id, data) => {
    const updated = await updateIssue(id, data)
    setIssues((current) => current.map((issue) => issue.id === id ? updated : issue))
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this issue? This action cannot be undone.')) return

    setOperationError('')
    try {
      await deleteIssue(id)
      setIssues((current) => current.filter((issue) => issue.id !== id))
    } catch (error) {
      setOperationError(error.message || 'Unable to delete the issue.')
    }
  }

  return <BrowserRouter><Navbar />{operationError && <div className="form-error" role="alert">{operationError}</div>}{isLoading ? <main className="page-shell"><div className="empty-state"><h1>Loading issues...</h1><p>Please wait while the issue list loads.</p></div></main> : loadError ? <main className="page-shell"><div className="empty-state"><h1>Unable to load issues</h1><p>{loadError}</p></div></main> : <Routes>
    <Route path="/" element={<Dashboard issues={issues} onDelete={handleDelete} />} />
    <Route path="/issues" element={<Issues issues={issues} onDelete={handleDelete} />} />
    <Route path="/issues/new" element={<AddIssue onAdd={handleAdd} />} />
    <Route path="/issues/:id" element={<IssueDetails issues={issues} onDelete={handleDelete} />} />
    <Route path="/issues/:id/edit" element={<EditIssue issues={issues} onUpdate={handleUpdate} />} />
  </Routes>}</BrowserRouter>
}

export default App
