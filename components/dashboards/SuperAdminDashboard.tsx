"use client"

import { useState } from "react"
import { useData } from "@/contexts/DataContext"
import { useAuth } from "@/contexts/AuthContext"
import DashboardLayout from "@/components/DashboardLayout"
import StatsCard from "@/components/StatsCard"
import PendingApprovalsTable from "@/components/PendingApprovalsTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, CheckCircle, Plus, Settings, Trash2, Edit } from "lucide-react"

export default function SuperAdminDashboard() {
  const { getPatientsForRole, getStatistics, schemes, addScheme, updateScheme, deleteScheme } = useData()
  const { user } = useAuth()
  const [showAddScheme, setShowAddScheme] = useState(false)
  const [editingScheme, setEditingScheme] = useState<any>(null)
  const [schemeForm, setSchemeForm] = useState({
    name: "",
    description: "",
    eligibilityCriteria: "",
    maxCoverage: "",
    isActive: true,
  })

  const pendingPatients = getPatientsForRole("super_admin")
  const stats = getStatistics("super_admin")

  const handleAddScheme = () => {
    if (user && schemeForm.name && schemeForm.description) {
      addScheme({
        name: schemeForm.name,
        description: schemeForm.description,
        eligibilityCriteria: schemeForm.eligibilityCriteria.split("\n").filter((c) => c.trim()),
        maxCoverage: Number.parseInt(schemeForm.maxCoverage) || 0,
        isActive: schemeForm.isActive,
        createdBy: user.name,
      })
      setSchemeForm({
        name: "",
        description: "",
        eligibilityCriteria: "",
        maxCoverage: "",
        isActive: true,
      })
      setShowAddScheme(false)
    }
  }

  const handleEditScheme = () => {
    if (editingScheme && schemeForm.name && schemeForm.description) {
      updateScheme(editingScheme.id, {
        name: schemeForm.name,
        description: schemeForm.description,
        eligibilityCriteria: schemeForm.eligibilityCriteria.split("\n").filter((c) => c.trim()),
        maxCoverage: Number.parseInt(schemeForm.maxCoverage) || 0,
        isActive: schemeForm.isActive,
      })
      setEditingScheme(null)
      setSchemeForm({
        name: "",
        description: "",
        eligibilityCriteria: "",
        maxCoverage: "",
        isActive: true,
      })
    }
  }

  const startEdit = (scheme: any) => {
    setEditingScheme(scheme)
    setSchemeForm({
      name: scheme.name,
      description: scheme.description,
      eligibilityCriteria: scheme.eligibilityCriteria.join("\n"),
      maxCoverage: scheme.maxCoverage.toString(),
      isActive: scheme.isActive,
    })
  }

  return (
    <DashboardLayout title="Super Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            title="Final Approvals"
            value={pendingPatients.length}
            icon={Clock}
            description="State-approved patients"
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
            title="Completed"
            value={stats.approved}
            icon={CheckCircle}
            description="Final approved"
            color="green"
          />
          <StatsCard
            title="Active Schemes"
            value={schemes.filter((s) => s.isActive).length}
            icon={Settings}
            description="Available schemes"
            color="blue"
          />
        </div>

        {/* Scheme Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Health Scheme Management</CardTitle>
              <Dialog open={showAddScheme} onOpenChange={setShowAddScheme}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Scheme
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Health Scheme</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="schemeName">Scheme Name</Label>
                      <Input
                        id="schemeName"
                        value={schemeForm.name}
                        onChange={(e) => setSchemeForm((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter scheme name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="schemeDescription">Description</Label>
                      <Textarea
                        id="schemeDescription"
                        value={schemeForm.description}
                        onChange={(e) => setSchemeForm((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter scheme description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="eligibility">Eligibility Criteria (one per line)</Label>
                      <Textarea
                        id="eligibility"
                        value={schemeForm.eligibilityCriteria}
                        onChange={(e) => setSchemeForm((prev) => ({ ...prev, eligibilityCriteria: e.target.value }))}
                        placeholder="Enter eligibility criteria, one per line"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxCoverage">Maximum Coverage Amount</Label>
                      <Input
                        id="maxCoverage"
                        type="number"
                        value={schemeForm.maxCoverage}
                        onChange={(e) => setSchemeForm((prev) => ({ ...prev, maxCoverage: e.target.value }))}
                        placeholder="Enter maximum coverage amount"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowAddScheme(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddScheme}>Add Scheme</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {schemes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No schemes created yet. Add your first health scheme to get started.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Scheme Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Max Coverage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created By</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schemes.map((scheme) => (
                      <TableRow key={scheme.id}>
                        <TableCell className="font-medium">{scheme.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{scheme.description}</TableCell>
                        <TableCell>${scheme.maxCoverage.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={scheme.isActive ? "default" : "secondary"}>
                            {scheme.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>{scheme.createdBy}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => startEdit(scheme)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Edit Health Scheme</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="editSchemeName">Scheme Name</Label>
                                    <Input
                                      id="editSchemeName"
                                      value={schemeForm.name}
                                      onChange={(e) => setSchemeForm((prev) => ({ ...prev, name: e.target.value }))}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="editSchemeDescription">Description</Label>
                                    <Textarea
                                      id="editSchemeDescription"
                                      value={schemeForm.description}
                                      onChange={(e) =>
                                        setSchemeForm((prev) => ({ ...prev, description: e.target.value }))
                                      }
                                      rows={3}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="editEligibility">Eligibility Criteria</Label>
                                    <Textarea
                                      id="editEligibility"
                                      value={schemeForm.eligibilityCriteria}
                                      onChange={(e) =>
                                        setSchemeForm((prev) => ({ ...prev, eligibilityCriteria: e.target.value }))
                                      }
                                      rows={4}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="editMaxCoverage">Maximum Coverage</Label>
                                    <Input
                                      id="editMaxCoverage"
                                      type="number"
                                      value={schemeForm.maxCoverage}
                                      onChange={(e) =>
                                        setSchemeForm((prev) => ({ ...prev, maxCoverage: e.target.value }))
                                      }
                                    />
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id="editIsActive"
                                      checked={schemeForm.isActive}
                                      onChange={(e) =>
                                        setSchemeForm((prev) => ({ ...prev, isActive: e.target.checked }))
                                      }
                                    />
                                    <Label htmlFor="editIsActive">Active</Label>
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline" onClick={() => setEditingScheme(null)}>
                                      Cancel
                                    </Button>
                                    <Button onClick={handleEditScheme}>Update Scheme</Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="destructive" size="sm" onClick={() => deleteScheme(scheme.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Final Approvals */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Final Approvals</h2>
          <p className="text-gray-600 mb-4">
            Review patients that have been approved by state administrators for final approval
          </p>
          <PendingApprovalsTable patients={pendingPatients} showActions={true} />
        </div>
      </div>
    </DashboardLayout>
  )
}
