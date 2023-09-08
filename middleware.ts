// Resource: https://clerk.com/docs/nextjs/middleware#auth-middleware
// Copy the middleware code as it is from the above resource

import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  // An array of public routes that don't require authentication.
  publicRoutes: ['/', '/api/webhook/clerk'],

  // An array of routes to be ignored by the authentication middleware.
  ignoredRoutes: ['/api/webhook/clerk'],

  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // redirect them to organization selection page
    if(auth.userId && !auth.orgId && req.nextUrl.pathname !== "/api/webhook/clerk"){
      const orgSelection = new URL('/api/webhook/clerk', req.url)
      return NextResponse.redirect(orgSelection)
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};