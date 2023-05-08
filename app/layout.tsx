import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import ToastContext from '@/context/toast-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nexenger',
  description: 'This is the RealTime Messenger using NEXT13 App Dir.',
  icons: {
    icon: '/nexenger.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ToastContext />
        {children}
      </body>
    </html>
  )
}
