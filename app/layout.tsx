import Script from 'next/script'
import type { ReactNode } from 'react'

import './globals.css'

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html>
      <body>{children}</body>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
          </Script>
        </>
      ) : null}
    </html>
  )
}
