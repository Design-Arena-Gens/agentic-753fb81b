import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NFL Games This Week',
  description: 'View all upcoming NFL games this week',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
