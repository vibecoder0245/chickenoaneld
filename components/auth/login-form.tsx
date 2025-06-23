"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { loginUserAction } from "@/actions/auth" // Import the Server Action
import { useAuth } from "@/contexts/auth-context" // Import useAuth

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full" aria-disabled={pending}>
      {pending ? "Logging in..." : "Log In"}
    </Button>
  )
}

const initialState = {
  success: false,
  user: undefined,
  error: null as string | null,
}

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login: loginContext } = useAuth() // Get login function from context

  const [state, formAction] = useFormState(loginUserAction, initialState)

  useEffect(() => {
    if (state.success && state.user) {
      loginContext(state.user) // Update auth context
      router.push("/dashboard") // Redirect on successful login
    }
  }, [state, loginContext, router])

  // Handle initial error from query params (e.g., if redirected from a protected route)
  useEffect(() => {
    const queryError = searchParams.get("error")
    if (queryError && !state.error) {
      // This is a bit of a hack to show initial query param errors
      // Ideally, the server action state would be the single source of truth
      // For now, we'll update the state if a query error exists and no form error exists
      // This won't work perfectly if the user submits the form and gets an error, then refreshes
      // A more robust solution might involve a separate state for query errors.
      // For simplicity, we'll just show it if no form error is present.
      if (initialState.error !== queryError) {
        // Avoid infinite loop if query error is the same
        // @ts-ignore // Temporary to update state for query param error
        formAction(new FormData()) // Trigger a dummy action to reset state if needed or just set error directly
      }
    }
  }, [searchParams, state.error])

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-lg border-border/40 shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold text-brand">Welcome Back!</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6 p-6">
          {(state.error || searchParams.get("error")) && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error || searchParams.get("error")}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="identifier">Username</Label>
            <Input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="e.g., cool_gamer_123"
              required
              className="bg-input/50 border-border/30 focus:border-brand"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="bg-input/50 border-border/30 focus:border-brand"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 p-6 pt-0">
          <div className="w-full">
            <SubmitButton />
          </div>
          <Link
            href="#" // Placeholder for password recovery
            className="text-sm text-muted-foreground hover:text-brand hover:underline transition-colors self-center"
          >
            Forgot your password?
          </Link>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-brand hover:underline hover:text-brand/80 transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
