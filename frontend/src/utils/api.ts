const API_BASE_URL = '/api'

export async function createBooking(booking: any) {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  })
  return response.json()
}

export async function getAvailability(date: string) {
  const response = await fetch(`${API_BASE_URL}/bookings/availability?date=${date}`)
  return response.json()
}

export async function submitContact(formData: any) {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  return response.json()
}

export async function getServices() {
  const response = await fetch(`${API_BASE_URL}/services`)
  return response.json()
}
