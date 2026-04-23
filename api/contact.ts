import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const YOUR_EMAIL = 'muni.uiux@gmail.com'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    // Send the form submission to you
    await resend.emails.send({
      from: 'Portfolio <contact@munigoutham.com>',
      to: YOUR_EMAIL,
      replyTo: email,
      subject: `Portfolio: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #333;">New message from your portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    })

    // Send acknowledgement to the sender
    await resend.emails.send({
      from: 'Muni Goutham <contact@munigoutham.com>',
      to: email,
      subject: 'Thanks for reaching out!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #333;">Hey ${name},</h2>
          <p>Thanks for reaching out through my portfolio. I've received your message and will get back to you soon.</p>
          <p style="color: #666; margin-top: 24px;">Best,<br/>Muni Goutham</p>
        </div>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return res.status(500).json({ error: 'Failed to send message' })
  }
}
