import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // Only guard admin routes
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Login page itself is public
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  // If Supabase not configured yet, just let dev pass
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return NextResponse.next();
  }

  // IMPORTANT: Bikin response dulu, lalu supabase client harus bisa nulis cookie
  // ke BOTH request (untuk step selanjutnya di middleware) DAN response
  // (untuk dikirim ke browser). Kalau engga, session refresh cookies hilang
  // dan user ke-redirect balik ke /login setelah login sukses. → infinite loop.
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          // Rebuild response so mutated request cookies propagate to
          // downstream handlers, then re-apply Set-Cookie for the client.
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: Do not run code between createServerClient and getUser.
  // Any delay/logic here can break session refresh timing.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all admin routes except static assets
    "/admin/:path*",
  ],
};
