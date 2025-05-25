"use client"

import { useAuth } from "@/contexts/AuthContext"
import LoginForm from "@/components/LoginForm"
import DashboardRouter from "@/components/DashboardRouter"

export default function HomePage() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <DashboardRouter />
}
