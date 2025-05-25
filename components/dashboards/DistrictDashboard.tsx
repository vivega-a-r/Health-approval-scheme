"use client"

import { useData } from "@/contexts/DataContext"
import DashboardLayout from "@/components/DashboardLayout"
import StatsCard from "@/components/StatsCard"
import PendingApprovalsTable from "@/components/PendingApprovalsTable"
import { Users, Clock, CheckCircle, XCircle } from "lucide-react"

export default function DistrictDashboard() {
  const { getPatientsForRole, getStatistics } = useData()
  const pendingPatients = getPatientsForRole("district_admin")
  const stats = getStatistics("district_admin")

  return (
    <DashboardLayout title="District Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            title="Pending Approvals"
            value={pendingPatients.length}
            icon={Clock}
            description="Hospital-approved patients"
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
          <h2 className="text-xl font-semibold mb-4">District Level Approvals</h2>
          <p className="text-gray-600 mb-4">Review patients that have been approved by hospital administrators</p>
          <PendingApprovalsTable patients={pendingPatients} showActions={true} />
        </div>
      </div>
    </DashboardLayout>
  )
}
