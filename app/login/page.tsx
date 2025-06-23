import { LoginForm } from "@/components/auth/login-form"
import { Suspense } from "react" // Import Suspense
import { Loader2 } from "lucide-react" // For a loading spinner

// A simple loading component for the fallback
function LoginFormLoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full max-w-md mx-auto h-[480px] bg-card/80 backdrop-blur-lg border-border/40 shadow-2xl rounded-lg">
      {/* Adjust height (h-[480px]) to roughly match the LoginForm's height */}
      <Loader2 className="h-10 w-10 animate-spin text-brand" />
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-12 bg-gradient-to-br from-background via-neutral-900 to-background">
      {/* <BeamsBackground /> Optional: Add your preferred background component */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div> {/* Subtle overlay */}
      <div className="relative z-10 w-full px-4">
        <Suspense fallback={<LoginFormLoadingFallback />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
