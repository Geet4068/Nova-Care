import { NextResponse } from "next/server";

export function middleware(request: any) {
  const token = request.cookies.get("token")?.value;
  
  // Protected routes
  if (!token && request.nextUrl.pathname.startsWith('/appointment', '/patient-dashboard')) {
    return NextResponse.redirect(new URL('/user-login', request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith('/doctor-dashboard')) {
    return NextResponse.redirect(new URL('/doctor-login', request.url));
  }

  // Prevent accessing login page when logged in
  // if (token && request.nextUrl.pathname.startsWith('/user-login')) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/appointment", "/user-login", "/doctor-dashboard", "/doctor-login"],
};

// export const runtime = 'edge';