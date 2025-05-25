"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/contexts/DataContext"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PatientFormProps {
  onSuccess?: () => void
}

export default function PatientForm({ onSuccess }: PatientFormProps) {
  const { addPatient, schemes } = useData()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    medicalCondition: "",
    requestedScheme: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (
        !formData.name ||
        !formData.age ||
        !formData.gender ||
        !formData.medicalCondition ||
        !formData.requestedScheme
      ) {
        throw new Error("All fields are required")
      }

      addPatient({
        name: formData.name,
        age: Number.parseInt(formData.age),
        gender: formData.gender,
        medicalCondition: formData.medicalCondition,
        requestedScheme: formData.requestedScheme,
        submittedBy: user?.name || "",
        currentLevel: "hospital",
        status: "pending",
        approvalHistory: [],
        documents: [],
      })

      setFormData({
        name: "",
        age: "",
        gender: "",
        medicalCondition: "",
        requestedScheme: "",
      })

      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Patient</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Patient Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scheme">Requested Scheme</Label>
              <Select
                value={formData.requestedScheme}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, requestedScheme: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select scheme" />
                </SelectTrigger>
                <SelectContent>
                  {schemes
                    .filter((s) => s.isActive)
                    .map((scheme) => (
                      <SelectItem key={scheme.id} value={scheme.name}>
                        {scheme.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Medical Condition</Label>
            <Textarea
              id="condition"
              value={formData.medicalCondition}
              onChange={(e) => setFormData((prev) => ({ ...prev, medicalCondition: e.target.value }))}
              required
              rows={3}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit Patient"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
