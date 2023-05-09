import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import ToastContext from '@/context/toast-context'
import AuthContext from '@/context/auth-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nexenger',
  description: 'This is the RealTime Messenger using NEXT13 App Dir.',
  openGraph: {
    images: '/nexenger-og.avif',
    type: 'website',
    url: 'https://nexenger.vercel.app/',
    locale: 'en',
    countryName: 'Myanmar',
    alternateLocale: 'eng',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@thutasann3',
    images: '/nexenger-og.avif',
  },
  icons: {
    icon: '/nexenger.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthContext>
          <ToastContext />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
