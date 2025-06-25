import { NextResponse } from "next/server";

export function middleware(request: any) {
  const token = request.cookies.get("token")?.value;
  
  if (!token && (request.nextUrl.pathname.startsWith('/appointment') || 
                 request.nextUrl.pathname.startsWith('/patient-dashboard'))) {
    return NextResponse.redirect(new URL('/user-login', request.url));
  }

  if (token && request.nextUrl.pathname.startsWith('/user-login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/appointment", "/patient-dashboard", "/user-login"],
};

export const runtime = 'edge';