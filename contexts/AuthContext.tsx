"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface User {
  id: string
  username: string
  name: string
  email: string
  role: "data_entry" | "hospital_admin" | "district_admin" | "state_admin" | "super_admin"
  facilityId?: string
  permissions: string[]
}

interface LoginCredentials {
  username: string
  password: string
}

interface AuthContextType {
  user: User | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  hasPermission: (permission: string) => boolean
}

const PREDEFINED_USERS: User[] = [
  {
    id: "1",
    username: "super_admin",
    name: "Super Administrator",
    email: "super.admin@healthcare.gov",
    role: "super_admin",
    permissions: ["all"],
  },
  {
    id: "2",
    username: "state_admin",
    name: "State Administrator",
    email: "state.admin@healthcare.gov",
    role: "state_admin",
    permissions: ["state_approval", "view_all_patients", "generate_reports"],
  },
  {
    id: "3",
    username: "district_admin",
    name: "District Administrator",
    email: "district.admin@healthcare.gov",
    role: "district_admin",
    permissions: ["district_approval", "view_district_patients"],
  },
  {
    id: "4",
    username: "hospital_admin",
    name: "Hospital Administrator",
    email: "hospital.admin@healthcare.gov",
    role: "hospital_admin",
    permissions: ["hospital_approval", "view_hospital_patients"],
  },
  {
    id: "5",
    username: "data_entry",
    name: "Data Entry Operator",
    email: "data.entry@healthcare.gov",
    role: "data_entry",
    permissions: ["create_patient", "edit_own_patients"],
  },
]

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const validateCredentials = (username: string, password: string): User | null => {
    const validCredentials: Record<string, string> = {
      super_admin: "Admin@123",
      state_admin: "Admin@123",
      district_admin: "Admin@123",
      hospital_admin: "Admin@123",
      data_entry: "User@123",
    }

    if (validCredentials[username] === password) {
      return PREDEFINED_USERS.find((user) => user.username === username) || null
    }
    return null
  }

  const login = async (credentials: LoginCredentials): Promise<void> => {
    const authenticatedUser = validateCredentials(credentials.username, credentials.password)
    if (!authenticatedUser) {
      throw new Error("Invalid credentials")
    }
    setUser(authenticatedUser)
  }

  const logout = () => {
    setUser(null)
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return user.permissions.includes("all") || user.permissions.includes(permission)
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    hasPermission,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
