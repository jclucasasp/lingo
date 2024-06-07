import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/learn(.*)"]);

export default clerkMiddleware((auth, request)=> {
  if(isProtectedRoute(request)){
    auth().protect();
  }
});

// export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};