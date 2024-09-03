import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SITE_META } from '@/_constants/constants'
import FirebaseWrapProvider from '@/_provider/FirebaseWrapProvider'
import Header from '@/_components/Header'
import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_META.siteUrl),
  title: {
    template: `%s | ${SITE_META.siteTitle}`,
    default: SITE_META.siteTitle,
  },
  description: SITE_META.siteDesc,
  alternates: {
    canonical: SITE_META.siteUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <FirebaseWrapProvider>
          <Header />
          <main className='container m-2 mx-auto border-2 p-2'>{children}</main>
        </FirebaseWrapProvider>
      </body>
    </html>
  )
}
