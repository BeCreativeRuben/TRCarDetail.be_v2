export interface ContactSubmission {
  id?: number
  name: string
  email: string
  phone?: string
  message: string
  status?: 'new' | 'read' | 'replied'
  createdAt?: string
}
