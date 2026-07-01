import { NextResponse, type NextRequest } from 'next/server'

import { isLocale, resolveLocale } from '@/lib/i18n'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const maybeLocale = pathname.split('/')[1]
  if (isLocale(maybeLocale)) return NextResponse.next()

  const locale = resolveLocale({
    cookie: request.cookies.get('bc-locale')?.value,
    country:
      request.headers.get('x-vercel-ip-country') ??
      request.headers.get('cf-ipcountry'),
    acceptLanguage: request.headers.get('accept-language'),
  })

  const target = request.nextUrl.clone()
  target.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(target)
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|images).*)',
  ],
}
