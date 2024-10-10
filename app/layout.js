import './globals.css'

export const metadata = {
  title: 'AI Code Styler',
  description: 'Enhance your HTML with AI-generated CSS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}