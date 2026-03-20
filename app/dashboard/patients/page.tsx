"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Users, Plus, X, Mail, Trash2, ChevronRight, Calendar, Gamepad2 } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

interface Patient {
  patient_id: number
  email: string
  total_games: number
  last_played: string | null
}

export default function ManagePatientsPage() {
  const router = useRouter()
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState("")
  const [doctorId, setDoctorId] = useState<number | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) return
    const user = JSON.parse(storedUser)
    setDoctorId(user.user_id)
    fetchPatients(user.user_id)
  }, [])

  const fetchPatients = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/doctor/${id}/patients`)
      const data = await res.json()
      setPatients(Array.isArray(data) ? data : [])
    } catch {
      console.error("Failed to fetch patients")
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!doctorId) return
    setAdding(true)
    setError("")
    try {
      const res = await fetch(`${API_URL}/doctor/add-patient`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctor_id: doctorId, email, password }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.detail || "Failed to add patient")
        return
      }
      await fetchPatients(doctorId)
      setShowModal(false)
      setEmail("")
      setPassword("")
    } catch {
      setError("Could not connect to server")
    } finally {
      setAdding(false)
    }
  }

  const handleRemove = async (patientId: number) => {
    if (!doctorId) return
    await fetch(`${API_URL}/doctor/${doctorId}/patients/${patientId}`, { method: "DELETE" })
    setPatients((prev) => prev.filter((p) => p.patient_id !== patientId))
  }

  const formatDate = (iso: string | null) => {
    if (!iso) return "Never"
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Patients</h1>
          <p className="mt-1 text-muted-foreground">
            Link patient accounts to monitor their cognitive progress.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Patient
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : patients.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-2xl border border-border">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">No patients yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Add a patient using their registered email and password to start monitoring their progress.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add First Patient
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {patients.map((patient) => (
            <div
              key={patient.patient_id}
              className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:border-primary/40 transition-all group"
            >
              <div
                className="flex-1 flex items-center gap-4 cursor-pointer"
                onClick={() => router.push(`/dashboard/patients/${patient.patient_id}`)}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-lg">
                    {patient.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{patient.email}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Gamepad2 className="w-3.5 h-3.5" />
                      {patient.total_games} games played
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Last played: {formatDate(patient.last_played)}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <button
                onClick={() => handleRemove(patient.patient_id)}
                className="p-2 rounded-lg hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors"
                title="Remove patient"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add patient modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-card rounded-2xl border border-border p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Add Patient</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-5">
              Enter the patient's registered email and password to link their account to yours.
            </p>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Patient Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="patient@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Patient Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">{error}</p>
              )}

              <button
                type="submit"
                disabled={adding}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {adding ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mx-auto" />
                ) : "Link Patient"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
