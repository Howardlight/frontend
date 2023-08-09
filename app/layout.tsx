import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '../redux/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Task Manager",
  description: "This Application was built as a test conducted by DigitalDojo.ai"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={[inter.className, "h-[95vh] w-auto"].join(" ")}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
