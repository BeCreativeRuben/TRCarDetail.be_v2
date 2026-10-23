import { NextResponse } from 'next/server'
import { sendContactNotification } from '@/lib/email'
import { singleMailbox } from '@/lib/single-mailbox'

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

    // Auto-reply goes only to this one address. The business inbox is chosen server-side.
    const recipient = singleMailbox(email)
    if (!recipient) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    await sendContactNotification({ name, email: recipient, phone, message })

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
