"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signupUserAction, validateLicenseKeyAction } from "@/actions/auth" // Import Server Actions
import { useAuth } from "@/contexts/auth-context" // Import useAuth
import { CheckCircle, XCircle } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full" aria-disabled={pending}>
      {pending ? "Creating Account..." : "Create Account"}
    </Button>
  )
}

const initialSignupState = {
  success: false,
  user: undefined,
  error: null as string | null,
}

export function SignupForm() {
  const router = useRouter()
  const { login: loginContext } = useAuth() // Get login function from context

  const [state, formAction] = useFormState(signupUserAction, initialSignupState)
  const [licenseKey, setLicenseKey] = useState("")
  const [licenseKeyStatus, setLicenseKeyStatus] = useState<"idle" | "validating" | "valid" | "invalid">("idle")
  const [licenseKeyMessage, setLicenseKeyMessage] = useState<string | null>(null)
  const [isLicenseKeyChecked, setIsLicenseKeyChecked] = useState(false)

  useEffect(() => {
    if (state.success && state.user) {
      loginContext(state.user) // Update auth context
      router.push("/dashboard") // Redirect on successful signup
    }
  }, [state, loginContext, router])

  const handleLicenseKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLicenseKey(e.target.value)
    setLicenseKeyStatus("idle")
    setLicenseKeyMessage(null)
    setIsLicenseKeyChecked(false)
  }

  const handleValidateLicense = async () => {
    if (!licenseKey) {
      setLicenseKeyStatus("invalid")
      setLicenseKeyMessage("License key cannot be empty.")
      setIsLicenseKeyChecked(true)
      return
    }
    setLicenseKeyStatus("validating")
    setLicenseKeyMessage(null)
    try {
      const result = await validateLicenseKeyAction(licenseKey)
      if (result.isValid) {
        setLicenseKeyStatus("valid")
        setLicenseKeyMessage("License key is valid!")
      } else {
        setLicenseKeyStatus("invalid")
        setLicenseKeyMessage(result.message || "Invalid license key.")
      }
    } catch (error) {
      setLicenseKeyStatus("invalid")
      setLicenseKeyMessage("Error validating license key.")
    }
    setIsLicenseKeyChecked(true)
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-lg border-border/40 shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold text-brand">Create an Account</CardTitle>
        <CardDescription className="text-muted-foreground">Join us! Enter your details below.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6 p-6">
          {state.error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Choose a unique username"
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
              placeholder="Create a strong password"
              required
              className="bg-input/50 border-border/30 focus:border-brand"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="licenseKey">License Key</Label>
            <div className="flex items-center gap-2">
              <Input
                id="licenseKey"
                name="licenseKey"
                type="text"
                placeholder="Enter your license key"
                required
                value={licenseKey}
                onChange={handleLicenseKeyChange}
                className="bg-input/50 border-border/30 focus:border-brand flex-grow"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleValidateLicense}
                disabled={licenseKeyStatus === "validating"}
                className="shrink-0 border-brand text-brand hover:bg-brand/10"
              >
                {licenseKeyStatus === "validating" ? "Checking..." : "Check Key"}
              </Button>
            </div>
            {isLicenseKeyChecked && licenseKeyMessage && (
              <div
                className={`mt-2 text-sm flex items-center gap-1 ${licenseKeyStatus === "valid" ? "text-green-500" : "text-red-500"}`}
              >
                {licenseKeyStatus === "valid" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                {licenseKeyMessage}
              </div>
            )}
            {isLicenseKeyChecked && licenseKeyStatus !== "valid" && (
              <p className="text-xs text-red-500 mt-1">A valid license key is required to create an account.</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 p-6 pt-0">
          <SubmitButton />
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-brand hover:underline hover:text-brand/80 transition-colors"
            >
              Log In
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
