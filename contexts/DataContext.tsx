"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export interface Patient {
  id: string
  name: string
  age: number
  gender: string
  medicalCondition: string
  requestedScheme: string
  submittedBy: string
  currentLevel: "hospital" | "district" | "state" | "super_admin" | "final_approved"
  status: "pending" | "approved" | "rejected"
  approvalHistory: ApprovalStep[]
  documents: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Scheme {
  id: string
  name: string
  description: string
  eligibilityCriteria: string[]
  maxCoverage: number
  isActive: boolean
  createdBy: string
  createdAt: Date
}

export interface ApprovalStep {
  level: "hospital" | "district" | "state" | "super_admin"
  approvedBy: string
  action: "approved" | "rejected"
  comments?: string
  timestamp: Date
}

interface DataContextType {
  patients: Patient[]
  schemes: Scheme[]
  addPatient: (patient: Omit<Patient, "id" | "createdAt" | "updatedAt">) => void
  approvePatient: (patientId: string, approvedBy: string, comments?: string) => void
  rejectPatient: (patientId: string, rejectedBy: string, reason: string) => void
  addScheme: (scheme: Omit<Scheme, "id" | "createdAt">) => void
  updateScheme: (schemeId: string, updates: Partial<Scheme>) => void
  deleteScheme: (schemeId: string) => void
  getPatientsForRole: (role: string) => Patient[]
  getStatistics: (role: string) => any
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([])
  const [schemes, setSchemes] = useState<Scheme[]>([])

  const addPatient = useCallback((patientData: Omit<Patient, "id" | "createdAt" | "updatedAt">) => {
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setPatients((prev) => [...prev, newPatient])
  }, [])

  const approvePatient = useCallback((patientId: string, approvedBy: string, comments?: string) => {
    setPatients((prev) =>
      prev.map((patient) => {
        if (patient.id === patientId) {
          const levelOrder = ["hospital", "district", "state", "super_admin", "final_approved"]
          const currentIndex = levelOrder.indexOf(patient.currentLevel)
          const nextLevel = currentIndex < levelOrder.length - 1 ? levelOrder[currentIndex + 1] : "final_approved"

          const approvalStep: ApprovalStep = {
            level: patient.currentLevel,
            approvedBy,
            action: "approved",
            comments,
            timestamp: new Date(),
          }

          return {
            ...patient,
            currentLevel: nextLevel as any,
            status: nextLevel === "final_approved" ? "approved" : "pending",
            approvalHistory: [...patient.approvalHistory, approvalStep],
            updatedAt: new Date(),
          }
        }
        return patient
      }),
    )
  }, [])

  const rejectPatient = useCallback((patientId: string, rejectedBy: string, reason: string) => {
    setPatients((prev) =>
      prev.map((patient) => {
        if (patient.id === patientId) {
          const approvalStep: ApprovalStep = {
            level: patient.currentLevel,
            approvedBy: rejectedBy,
            action: "rejected",
            comments: reason,
            timestamp: new Date(),
          }

          return {
            ...patient,
            status: "rejected",
            approvalHistory: [...patient.approvalHistory, approvalStep],
            updatedAt: new Date(),
          }
        }
        return patient
      }),
    )
  }, [])

  const addScheme = useCallback((schemeData: Omit<Scheme, "id" | "createdAt">) => {
    const newScheme: Scheme = {
      ...schemeData,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setSchemes((prev) => [...prev, newScheme])
  }, [])

  const updateScheme = useCallback((schemeId: string, updates: Partial<Scheme>) => {
    setSchemes((prev) => prev.map((scheme) => (scheme.id === schemeId ? { ...scheme, ...updates } : scheme)))
  }, [])

  const deleteScheme = useCallback((schemeId: string) => {
    setSchemes((prev) => prev.filter((scheme) => scheme.id !== schemeId))
  }, [])

  const getPatientsForRole = useCallback(
    (role: string) => {
      switch (role) {
        case "data_entry":
          return patients
        case "hospital_admin":
          return patients.filter((p) => p.currentLevel === "hospital" && p.status === "pending")
        case "district_admin":
          return patients.filter((p) => p.currentLevel === "district" && p.status === "pending")
        case "state_admin":
          return patients.filter((p) => p.currentLevel === "state" && p.status === "pending")
        case "super_admin":
          return patients.filter((p) => p.currentLevel === "super_admin" && p.status === "pending")
        default:
          return []
      }
    },
    [patients],
  )

  const getStatistics = useCallback(
    (role: string) => {
      const rolePatients = getPatientsForRole(role)
      const totalPatients = patients.length
      const approvedPatients = patients.filter((p) => p.status === "approved").length
      const rejectedPatients = patients.filter((p) => p.status === "rejected").length
      const pendingPatients = patients.filter((p) => p.status === "pending").length

      return {
        total: totalPatients,
        approved: approvedPatients,
        rejected: rejectedPatients,
        pending: pendingPatients,
        roleSpecific: rolePatients.length,
      }
    },
    [patients, getPatientsForRole],
  )

  const value = {
    patients,
    schemes,
    addPatient,
    approvePatient,
    rejectPatient,
    addScheme,
    updateScheme,
    deleteScheme,
    getPatientsForRole,
    getStatistics,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
