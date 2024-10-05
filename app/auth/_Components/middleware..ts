import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user is authenticated (for example, using cookies or headers)
  const isAuthenticated = request.cookies.get('access_token'); 

  const loginPage = '/auth/login'; // Path to your login page

  // Protect specific routes by checking the user's authentication
  if (!isAuthenticated && request.nextUrl.pathname !== loginPage) {
    // Redirect unauthenticated users to login page
    return NextResponse.redirect(new URL(loginPage, request.url));
  }

  // If user is authenticated, continue with the request
  return NextResponse.next();
}

// This is the matcher to specify which paths the middleware should apply to.
export const config = {
  matcher: ['/'], // protect routes
};
