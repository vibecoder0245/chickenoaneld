"use server"

import { VALID_LICENSE_KEYS } from "@/lib/valid-license-keys"
import type { User } from "@/types/user"

// IMPORTANT: This is a mock in-memory "database".
// In a real app, use a proper database.
const MOCK_USERS_DB: User[] = [
  {
    id: "0",
    username: "defaultUser",
    email: undefined,
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Default",
  },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function validateLicenseKeyAction(licenseKey: string): Promise<{ isValid: boolean; message?: string }> {
  await delay(300)
  if (VALID_LICENSE_KEYS.includes(licenseKey.trim())) {
    return { isValid: true }
  }
  return { isValid: false, message: "Invalid or expired license key." }
}

// Type for the state used with useFormState in signup form
export type SignupFormState = {
  success: boolean
  user?: User
  error?: string | null
}

export async function signupUserAction(prevState: SignupFormState, formData: FormData): Promise<SignupFormState> {
  await delay(700)

  const username = formData.get("username") as string
  const password = formData.get("password") as string // In real app, HASH this securely.
  const licenseKey = formData.get("licenseKey") as string

  if (!username || !password || !licenseKey) {
    return { success: false, error: "Username, password, and license key are required." }
  }

  // Re-validate license key on the server as client-side checks can be bypassed
  const licenseValidation = await validateLicenseKeyAction(licenseKey)
  if (!licenseValidation.isValid) {
    return {
      success: false,
      error: licenseValidation.message || "License key validation failed. Please ensure it's correct.",
    }
  }

  if (MOCK_USERS_DB.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    return { success: false, error: "This username is already taken. Please choose another." }
  }

  const newUser: User = {
    id: String(MOCK_USERS_DB.length + 1), // Simple ID generation for mock
    username,
    email: undefined, // Email is optional
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}`, // Generate avatar URL
  }
  MOCK_USERS_DB.push(newUser) // Add to mock DB

  // console.log("Mock DB after signup:", MOCK_USERS_DB)
  return { success: true, user: newUser }
}

// Type for the state used with useFormState in login form
export type LoginFormState = {
  success: boolean
  user?: User
  error?: string | null
}

export async function loginUserAction(prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  await delay(500)

  const identifier = formData.get("identifier") as string // Username
  const password = formData.get("password") as string // In real app, compare with hashed password.

  if (!identifier || !password) {
    return { success: false, error: "Username and password are required." }
  }

  const foundUser = MOCK_USERS_DB.find((u) => u.username.toLowerCase() === identifier.toLowerCase())

  if (foundUser) {
    // Simulate password check (in real app, compare hashed passwords)
    // For this simulation, any password for a found user is "correct"
    // console.log("Mock DB at login:", MOCK_USERS_DB)
    return { success: true, user: foundUser }
  }

  return { success: false, error: "Invalid credentials. Please check your username and password." }
}
