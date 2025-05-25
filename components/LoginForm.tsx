"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield } from "lucide-react"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login({ username, password })
    } catch (err) {
      setError("Invalid credentials. Please check your username and password.")
    } finally {
      setLoading(false)
    }
  }

  const predefinedCredentials = [
    { role: "Super Admin", username: "super_admin", password: "Admin@123" },
    { role: "State Admin", username: "state_admin", password: "Admin@123" },
    { role: "District Admin", username: "district_admin", password: "Admin@123" },
    { role: "Hospital Admin", username: "hospital_admin", password: "Admin@123" },
    { role: "Data Entry", username: "data_entry", password: "User@123" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Healthcare Approval System</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demo Credentials</CardTitle>
            <CardDescription>Use these predefined credentials to test different user roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {predefinedCredentials.map((cred, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-sm text-gray-900">{cred.role}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Username: <span className="font-mono">{cred.username}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Password: <span className="font-mono">{cred.password}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      setUsername(cred.username)
                      setPassword(cred.password)
                    }}
                  >
                    Use Credentials
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
