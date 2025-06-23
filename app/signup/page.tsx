import { SignupForm } from "@/components/auth/signup-form"
// import { BeamsBackground } from '@/components/beams-background';

export default function SignupPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-12 bg-gradient-to-br from-background via-neutral-900 to-background">
      {/* <BeamsBackground /> Optional: Add your preferred background component */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div> {/* Subtle overlay */}
      <div className="relative z-10 w-full px-4">
        <SignupForm />
      </div>
    </div>
  )
}
