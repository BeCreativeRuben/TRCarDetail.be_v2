import { NextResponse } from 'next/server'
import { sendContactNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await sendContactNotification({ name, email, phone, message })

    return NextResponse.json(
      { message: 'Contact submission received successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing contact:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
