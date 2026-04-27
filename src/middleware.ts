import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // If it's an admin route, only run Supabase auth logic, bypass next-intl completely
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return await updateSession(request)
  }

  // For frontend routes, apply next-intl routing
  const response = intlMiddleware(request)
  return response
}

export const config = {
  matcher: [
    // Enable a match for all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /images, /favicon.ico, etc.
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
