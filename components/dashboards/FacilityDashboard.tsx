"use client"

import { useState } from "react"
import { useData } from "@/contexts/DataContext"
import DashboardLayout from "@/components/DashboardLayout"
import StatsCard from "@/components/StatsCard"
import PatientForm from "@/components/PatientForm"
import PendingApprovalsTable from "@/components/PendingApprovalsTable"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Users, FileText, Clock, Plus } from "lucide-react"

export default function FacilityDashboard() {
  const { patients, getStatistics } = useData()
  const [showAddPatient, setShowAddPatient] = useState(false)
  const stats = getStatistics("data_entry")

  const submittedPatients = patients.filter((p) => p.submittedBy === "Data Entry Operator")

  return (
    <DashboardLayout title="Facility Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            title="Total Submitted"
            value={submittedPatients.length}
            icon={Users}
            description="Patients submitted by facility"
            color="blue"
          />
          <StatsCard
            title="Pending at Hospital"
            value={submittedPatients.filter((p) => p.currentLevel === "hospital" && p.status === "pending").length}
            icon={Clock}
            description="Awaiting hospital approval"
            color="yellow"
          />
          <StatsCard
            title="In Progress"
            value={submittedPatients.filter((p) => p.status === "pending").length}
            icon={FileText}
            description="Currently in approval process"
            color="blue"
          />
          <StatsCard
            title="Final Approved"
            value={submittedPatients.filter((p) => p.status === "approved").length}
            icon={Users}
            description="Completed approvals"
            color="green"
          />
        </div>

        {/* Add Patient Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Patient Management</h2>
          <Dialog open={showAddPatient} onOpenChange={setShowAddPatient}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
              </DialogHeader>
              <PatientForm onSuccess={() => setShowAddPatient(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Patient Records Table */}
        <PendingApprovalsTable patients={submittedPatients} showActions={false} />
      </div>
    </DashboardLayout>
  )
}
