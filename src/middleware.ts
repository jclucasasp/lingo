import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { checkRole } from "./lib/utils";

// const isProtectedRoute = createRouteMatcher(["/learn(.*)", "/shop(.*)", "/courses(.*)", "/leaderboard(.*)", "/challenges(.*)", "/admin(.*)", "/api(.*)"]);
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);

export default clerkMiddleware((auth, request) => {
  
  if (isPublicRoute(request)) return;
  auth().protect();
  
});

// export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};