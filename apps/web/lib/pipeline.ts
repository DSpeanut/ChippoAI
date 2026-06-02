export interface Application {
  id: string
  company: string
  role: string
  url: string
  appliedAt: string
  status: string
}

const KEY = "pipeline_applications"

export function getApplications(): Application[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]")
  } catch {
    return []
  }
}

export function addApplication(app: Omit<Application, "id">): Application {
  const applications = getApplications()
  const newApp = { ...app, id: crypto.randomUUID() }
  localStorage.setItem(KEY, JSON.stringify([...applications, newApp]))
  return newApp
}

export function updateStatus(id: string, status: string): void {
  const applications = getApplications().map(a => a.id === id ? { ...a, status } : a)
  localStorage.setItem(KEY, JSON.stringify(applications))
}

export function updateApplication(id: string, fields: Partial<Omit<Application, "id">>): Application {
  const applications = getApplications().map(a => a.id === id ? { ...a, ...fields } : a)
  localStorage.setItem(KEY, JSON.stringify(applications))
  return applications.find(a => a.id === id)!
}

export function removeApplication(id: string): void {
  const applications = getApplications().filter(a => a.id !== id)
  localStorage.setItem(KEY, JSON.stringify(applications))
}
