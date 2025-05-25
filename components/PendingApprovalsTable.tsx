"use client"

import { useState } from "react"
import { useData, type Patient } from "@/contexts/DataContext"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Eye } from "lucide-react"

interface PendingApprovalsTableProps {
  patients: Patient[]
  showActions?: boolean
}

export default function PendingApprovalsTable({ patients, showActions = true }: PendingApprovalsTableProps) {
  const { approvePatient, rejectPatient } = useData()
  const { user } = useAuth()
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [comments, setComments] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")

  const handleApprove = (patientId: string) => {
    if (user) {
      approvePatient(patientId, user.name, comments)
      setComments("")
    }
  }

  const handleReject = (patientId: string) => {
    if (user && rejectionReason.trim()) {
      rejectPatient(patientId, user.name, rejectionReason)
      setRejectionReason("")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "yellow"
      case "approved":
        return "green"
      case "rejected":
        return "red"
      default:
        return "gray"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {showActions ? "Pending Approvals" : "Patient Records"} ({patients.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {patients.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No patients found</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Medical Condition</TableHead>
                  <TableHead>Requested Scheme</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Current Level</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell className="capitalize">{patient.gender}</TableCell>
                    <TableCell className="max-w-xs truncate">{patient.medicalCondition}</TableCell>
                    <TableCell>{patient.requestedScheme}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(patient.status) as any}>{patient.status}</Badge>
                    </TableCell>
                    <TableCell className="capitalize">{patient.currentLevel.replace("_", " ")}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Patient Details</DialogTitle>
                            </DialogHeader>
                            {selectedPatient && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Name</Label>
                                    <p className="font-medium">{selectedPatient.name}</p>
                                  </div>
                                  <div>
                                    <Label>Age</Label>
                                    <p>{selectedPatient.age}</p>
                                  </div>
                                  <div>
                                    <Label>Gender</Label>
                                    <p className="capitalize">{selectedPatient.gender}</p>
                                  </div>
                                  <div>
                                    <Label>Submitted By</Label>
                                    <p>{selectedPatient.submittedBy}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label>Medical Condition</Label>
                                  <p>{selectedPatient.medicalCondition}</p>
                                </div>
                                <div>
                                  <Label>Requested Scheme</Label>
                                  <p>{selectedPatient.requestedScheme}</p>
                                </div>
                                <div>
                                  <Label>Approval History</Label>
                                  {selectedPatient.approvalHistory.length > 0 ? (
                                    <div className="space-y-2">
                                      {selectedPatient.approvalHistory.map((step, index) => (
                                        <div key={index} className="p-2 bg-gray-50 rounded">
                                          <div className="flex justify-between">
                                            <span className="font-medium capitalize">{step.level} Level</span>
                                            <Badge variant={step.action === "approved" ? "default" : "destructive"}>
                                              {step.action}
                                            </Badge>
                                          </div>
                                          <p className="text-sm text-gray-600">By: {step.approvedBy}</p>
                                          {step.comments && (
                                            <p className="text-sm text-gray-600">Comments: {step.comments}</p>
                                          )}
                                          <p className="text-xs text-gray-500">{step.timestamp.toLocaleString()}</p>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-gray-500">No approval history yet</p>
                                  )}
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {showActions && patient.status === "pending" && (
                          <>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="default" size="sm">
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Approve Patient</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <p>Are you sure you want to approve {patient.name}?</p>
                                  <div>
                                    <Label htmlFor="comments">Comments (Optional)</Label>
                                    <Textarea
                                      id="comments"
                                      value={comments}
                                      onChange={(e) => setComments(e.target.value)}
                                      placeholder="Add any comments..."
                                    />
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button
                                      onClick={() => handleApprove(patient.id)}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      Approve
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Reject Patient</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <p>Are you sure you want to reject {patient.name}?</p>
                                  <div>
                                    <Label htmlFor="reason">Rejection Reason (Required)</Label>
                                    <Textarea
                                      id="reason"
                                      value={rejectionReason}
                                      onChange={(e) => setRejectionReason(e.target.value)}
                                      placeholder="Please provide a reason for rejection..."
                                      required
                                    />
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button
                                      onClick={() => handleReject(patient.id)}
                                      variant="destructive"
                                      disabled={!rejectionReason.trim()}
                                    >
                                      Reject
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
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
  )
}
