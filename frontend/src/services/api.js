const API_BASE_URL = 'http://localhost:5000/api/issues'

const handleResponse = async (response) => {
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed with status ${response.status}`
    )
  }

  return data
}

export const getIssues = async () => {
  const response = await fetch(API_BASE_URL)
  return handleResponse(response)
}

export const getIssue = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`)
  return handleResponse(response)
}

export const createIssue = async (data) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
    }),
  })

  return handleResponse(response)
}

export const updateIssue = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      status: data.status,
    }),
  })

  return handleResponse(response)
}

export const deleteIssue = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  return handleResponse(response)
}