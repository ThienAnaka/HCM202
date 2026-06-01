export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const target = process.env.CHAT_API_TARGET || 'https://macaroni-hunting-mutation.ngrok-free.dev/api/chat'
  const basicAuth = process.env.CHAT_BASIC_AUTH

  if (!basicAuth) {
    return res.status(500).json({ error: 'Missing CHAT_BASIC_AUTH' })
  }

  let payload = req.body
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload)
    } catch (error) {
      return res.status(400).json({ error: 'Invalid JSON body' })
    }
  }

  try {
    const upstream = await fetch(target, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify(payload),
    })

    const contentType = upstream.headers.get('content-type') || 'application/json'
    const text = await upstream.text()

    res.status(upstream.status)
    res.setHeader('Content-Type', contentType)
    return res.send(text)
  } catch (error) {
    return res.status(502).json({ error: 'Upstream request failed' })
  }
}
