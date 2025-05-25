"use client"

import { useData } from "@/contexts/DataContext"
import DashboardLayout from "@/components/DashboardLayout"
import StatsCard from "@/components/StatsCard"
import PendingApprovalsTable from "@/components/PendingApprovalsTable"
import { Users, Clock, CheckCircle, XCircle } from "lucide-react"

export default function HospitalDashboard() {
  const { getPatientsForRole, getStatistics } = useData()
  const pendingPatients = getPatientsForRole("hospital_admin")
  const stats = getStatistics("hospital_admin")

  return (
    <DashboardLayout title="Hospital Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            title="Pending Approvals"
            value={pendingPatients.length}
            icon={Clock}
            description="Awaiting your approval"
            color="yellow"
          />
          <StatsCard
            title="Total Patients"
            value={stats.total}
            icon={Users}
            description="All patients in system"
            color="blue"
          />
          <StatsCard
            title="Approved"
            value={stats.approved}
            icon={CheckCircle}
            description="Successfully approved"
            color="green"
          />
          <StatsCard
            title="Rejected"
            value={stats.rejected}
            icon={XCircle}
            description="Rejected applications"
            color="red"
          />
        </div>

        {/* Pending Approvals */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
          <PendingApprovalsTable patients={pendingPatients} showActions={true} />
        </div>
      </div>
    </DashboardLayout>
  )
}
