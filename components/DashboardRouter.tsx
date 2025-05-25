"use client"

import { useAuth } from "@/contexts/AuthContext"
import FacilityDashboard from "@/components/dashboards/FacilityDashboard"
import HospitalDashboard from "@/components/dashboards/HospitalDashboard"
import DistrictDashboard from "@/components/dashboards/DistrictDashboard"
import StateDashboard from "@/components/dashboards/StateDashboard"
import SuperAdminDashboard from "@/components/dashboards/SuperAdminDashboard"

export default function DashboardRouter() {
  const { user } = useAuth()

  if (!user) return null

  switch (user.role) {
    case "data_entry":
      return <FacilityDashboard />
    case "hospital_admin":
      return <HospitalDashboard />
    case "district_admin":
      return <DistrictDashboard />
    case "state_admin":
      return <StateDashboard />
    case "super_admin":
      return <SuperAdminDashboard />
    default:
      return <div>Invalid user role</div>
  }
}
