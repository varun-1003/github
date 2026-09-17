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
  useEffect(() => { getIssues().then(setIssues) }, [])
  const handleAdd = async (data) => { const created = await createIssue(data); setIssues((current) => [created, ...current]) }
  const handleUpdate = async (id, data) => { const updated = await updateIssue(id, data); setIssues((current) => current.map((issue) => issue.id === id ? updated : issue)) }
  const handleDelete = async (id) => { if (!window.confirm('Delete this issue? This action cannot be undone.')) return; await deleteIssue(id); setIssues((current) => current.filter((issue) => issue.id !== id)) }

  return <BrowserRouter><Navbar /><Routes>
    <Route path="/" element={<Dashboard issues={issues} onDelete={handleDelete} />} />
    <Route path="/issues" element={<Issues issues={issues} onDelete={handleDelete} />} />
    <Route path="/issues/new" element={<AddIssue onAdd={handleAdd} />} />
    <Route path="/issues/:id" element={<IssueDetails issues={issues} onDelete={handleDelete} />} />
    <Route path="/issues/:id/edit" element={<EditIssue issues={issues} onUpdate={handleUpdate} />} />
  </Routes></BrowserRouter>
}

export default App
