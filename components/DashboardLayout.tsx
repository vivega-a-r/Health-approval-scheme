"use client"

import type React from "react"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { LogOut, User, Bell } from "lucide-react"

interface DashboardLayoutProps {
  title: string
  children: React.ReactNode
}

export default function DashboardLayout({ title, children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {user?.role.replace("_", " ").toUpperCase()}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
