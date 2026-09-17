import { mockIssues } from '../data/mockIssues'

const STORAGE_KEY = 'mini-issue-tracker-issues'

const readIssues = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : mockIssues
}

const writeIssues = (issues) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(issues))
  return issues
}

export const getIssues = async () => readIssues()

export const getIssue = async (id) => readIssues().find((issue) => issue.id === Number(id))

export const createIssue = async (data) => {
  const issues = readIssues()
  const issue = { ...data, id: Date.now(), status: data.status || 'Open' }
  writeIssues([issue, ...issues])
  return issue
}

export const updateIssue = async (id, data) => {
  const issues = readIssues()
  const updatedIssue = { ...data, id: Number(id) }
  writeIssues(issues.map((issue) => (issue.id === Number(id) ? updatedIssue : issue)))
  return updatedIssue
}

export const deleteIssue = async (id) => {
  const issues = readIssues().filter((issue) => issue.id !== Number(id))
  writeIssues(issues)
  return true
}
