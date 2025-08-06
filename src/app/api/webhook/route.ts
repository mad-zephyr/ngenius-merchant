import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()

  console.log('WEBHOOK POST REQUEST: ', { ...data })

  return NextResponse.json({ data: 'ok', status: 201 })
}
