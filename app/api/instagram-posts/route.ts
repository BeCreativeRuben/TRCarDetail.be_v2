import { NextResponse } from 'next/server'

const INSTAGRAM_GRAPH_VERSION = 'v21.0'

/** Cache API response 5 min so we don't hit Instagram every request */
export const revalidate = 300

/** Extract shortcode from permalink: https://www.instagram.com/p/SHORTCODE/ */
function shortcodeFromPermalink(permalink: string): string | null {
  if (!permalink || typeof permalink !== 'string') return null
  const match = permalink.match(/\/p\/([A-Za-z0-9_-]+)/)
  return match ? match[1] : null
}

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID

  if (!accessToken || !userId) {
    return NextResponse.json(
      { shortcodes: [], error: 'Instagram API not configured' },
      { status: 200 }
    )
  }

  const url = new URL(
    `https://graph.facebook.com/${INSTAGRAM_GRAPH_VERSION}/${userId}/media`
  )
  url.searchParams.set('fields', 'permalink')
  url.searchParams.set('limit', '3')
  url.searchParams.set('access_token', accessToken)

  try {
    const res = await fetch(url.toString())
    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { shortcodes: [], error: data?.error?.message || 'Instagram API error' },
        { status: 200 }
      )
    }

    const items = data?.data ?? []
    const shortcodes = items
      .map((item: { permalink?: string }) => shortcodeFromPermalink(item.permalink))
      .filter((s: string | null): s is string => Boolean(s))

    return NextResponse.json({ shortcodes })
  } catch (e) {
    return NextResponse.json(
      { shortcodes: [], error: e instanceof Error ? e.message : 'Request failed' },
      { status: 200 }
    )
  }
}
