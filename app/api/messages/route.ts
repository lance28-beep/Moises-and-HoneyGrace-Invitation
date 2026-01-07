import { type NextRequest, NextResponse } from "next/server"

// Google Apps Script URL for Messages sheet
const MESSAGES_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwiNUXUr7I3DYwf1XJyQhVf--WX16Z3DXtLEsUYol0i11NVxYp7l8CDhX3ZiDamj-gt/exec'

export interface Message {
  timestamp: string
  name: string
  message: string
}

// GET: Fetch all messages from Google Sheets
export async function GET() {
  try {
    const response = await fetch(MESSAGES_SCRIPT_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to fetch from Google Script:', response.status, response.statusText)
      }
      throw new Error(`Failed to fetch messages: ${response.status} ${response.statusText}`)
    }

    // Check if response is actually JSON before parsing
    const contentType = response.headers.get('content-type') || ''
    const responseText = await response.text()
    
    // Check if response is HTML (error page)
    if (responseText.trim().toLowerCase().startsWith('<!doctype') || 
        responseText.trim().toLowerCase().startsWith('<html') ||
        !contentType.includes('application/json')) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Google Script returned HTML instead of JSON. Response preview:', responseText.substring(0, 200))
      }
      throw new Error('Google Apps Script returned an error page. Please check the script URL and permissions.')
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to parse JSON response:', parseError, 'Response text:', responseText.substring(0, 500))
      }
      throw new Error('Invalid JSON response from Google Apps Script')
    }

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Raw Google Sheets response:', JSON.stringify(data, null, 2))
    }

    // Handle various response formats from Google Sheets
    const possibleRows = (data && (data.GoogleSheetData ?? data.rows ?? data.values ?? data)) as unknown
    
    if (!Array.isArray(possibleRows)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn("Unexpected messages payload shape; expected an array. Received:", typeof possibleRows, possibleRows)
      }
      return NextResponse.json([], { status: 200 })
    }

    const rows = possibleRows as string[][]
    
    if (rows.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.log('No rows found in Google Sheets response')
      }
      return NextResponse.json([], { status: 200 })
    }

    // Extract header row
    const [header, ...entries] = rows
    
    if (!Array.isArray(header)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn("Unexpected header row format:", header)
      }
      return NextResponse.json([], { status: 200 })
    }

    // Find column indices (case-insensitive)
    const idxName = header.findIndex((h: string) => typeof h === "string" && h.toLowerCase().includes("name"))
    const idxMsg = header.findIndex((h: string) => typeof h === "string" && h.toLowerCase().includes("message"))
    const idxTime = header.findIndex((h: string) => typeof h === "string" && h.toLowerCase().includes("timestamp"))

    if (process.env.NODE_ENV === 'development') {
      console.log('Column indices found:', { idxName, idxMsg, idxTime, header })
    }

    const safeIdxName = idxName >= 0 ? idxName : 0
    const safeIdxMsg = idxMsg >= 0 ? idxMsg : 1
    const safeIdxTime = idxTime >= 0 ? idxTime : 2

    // Parse and filter messages
    const parsed: Message[] = entries
      .filter((row: unknown) => Array.isArray(row))
      .map((row: string[]) => ({
        timestamp: row[safeIdxTime] ?? "",
        name: row[safeIdxName] ?? "",
        message: row[safeIdxMsg] ?? "",
      }))
      .filter((m) => m.name || m.message || m.timestamp)
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Parsed ${parsed.length} messages from ${entries.length} entries`)
    }
    
    return NextResponse.json(parsed, { status: 200 })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching messages:', error)
    }
    return NextResponse.json(
      { error: 'Failed to fetch messages', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// POST: Add a new message (if you want to enable posting from dashboard)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, message } = body

    // Validation
    if (!name || !message || typeof name !== "string" || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    if (name.trim().length === 0 || message.trim().length === 0) {
      return NextResponse.json({ error: "Name and message cannot be empty" }, { status: 400 })
    }

    // Post to Google Sheets
    const response = await fetch(MESSAGES_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      if (process.env.NODE_ENV === 'development') {
        console.error('POST error response:', errorText.substring(0, 200))
      }
      throw new Error('Failed to post message to Google Sheets')
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type') || ''
    const responseText = await response.text()
    
    if (responseText.trim().toLowerCase().startsWith('<!doctype') || 
        responseText.trim().toLowerCase().startsWith('<html') ||
        !contentType.includes('application/json')) {
      if (process.env.NODE_ENV === 'development') {
        console.error('POST: Google Script returned HTML instead of JSON')
      }
      // Some Google Apps Scripts return success even with HTML, so we'll return success
      return NextResponse.json({ success: true }, { status: 201 })
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch {
      // If parsing fails, assume success for POST operations
      data = { success: true }
    }
    
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
    console.error("Error posting message:", error)
    }
    return NextResponse.json({ error: "Failed to post message" }, { status: 500 })
  }
}
