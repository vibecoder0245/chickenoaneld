// components/admin/QuickActionsWrapper.tsx
"use client";

import QuickActionsClient from "./quick-actions-client";

/**
 * Tiny client wrapper so the server page doesn't need to
 * pass any function props. All interactivity lives inside
 * QuickActionsClient itself.
 */
export default function QuickActionsWrapper() {
  return <QuickActionsClient />;
}
