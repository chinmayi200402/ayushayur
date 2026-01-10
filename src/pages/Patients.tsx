import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Filter, User, Phone, Calendar, Activity, ChevronRight, X } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact: string;
  bloodGroup: string;
  prakriti: string | null;
  status: "In Treatment" | "Scheduled" | "Completed" | "New";
  avatar: string;
  createdAt: string;
}

const mockPatients: Patient[] = [
  { id: 1, name: "Rajesh Kumar", age: 45, gender: "Male", contact: "+91 98765 43210", bloodGroup: "O+", prakriti: "Vata-Pitta", status: "In Treatment", avatar: "RK", createdAt: "2024-01-05" },
  { id: 2, name: "Priya Sharma", age: 32, gender: "Female", contact: "+91 87654 32109", bloodGroup: "A+", prakriti: "Pitta-Kapha", status: "Scheduled", avatar: "PS", createdAt: "2024-01-08" },
  { id: 3, name: "Amit Verma", age: 58, gender: "Male", contact: "+91 76543 21098", bloodGroup: "B+", prakriti: "Kapha", status: "In Treatment", avatar: "AV", createdAt: "2024-01-10" },
  { id: 4, name: "Sunita Devi", age: 41, gender: "Female", contact: "+91 65432 10987", bloodGroup: "AB+", prakriti: "Vata", status: "Completed", avatar: "SD", createdAt: "2024-01-02" },
  { id: 5, name: "Vikram Singh", age: 52, gender: "Male", contact: "+91 54321 09876", bloodGroup: "O-", prakriti: null, status: "New", avatar: "VS", createdAt: "2024-01-12" },
];

const statusColors = {
  "In Treatment": "bg-primary/20 text-primary border-primary/30",
  "Scheduled": "bg-highlight/20 text-highlight border-highlight/30",
  "Completed": "bg-accent/20 text-accent border-accent/30",
  "New": "bg-muted text-muted-foreground border-border",
};

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    bloodGroup: "",
  });

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPatient = () => {
    if (newPatient.name && newPatient.age && newPatient.gender) {
      const patient: Patient = {
        id: patients.length + 1,
        name: newPatient.name,
        age: parseInt(newPatient.age),
        gender: newPatient.gender,
        contact: newPatient.contact,
        bloodGroup: newPatient.bloodGroup,
        prakriti: null,
        status: "New",
        avatar: newPatient.name.split(" ").map(n => n[0]).join("").toUpperCase(),
        createdAt: new Date().toISOString().split("T")[0],
      };
      setPatients([patient, ...patients]);
      setNewPatient({ name: "", age: "", gender: "", contact: "", bloodGroup: "" });
      setShowAddModal(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-3xl font-semibold text-foreground">
              Patient Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all patients at your center
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Patient
          </motion.button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search patients by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-11 rounded-xl border-border bg-card"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-muted text-muted-foreground rounded-xl font-medium text-sm hover:bg-muted/80 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </motion.div>

        {/* Patient Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPatients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-semibold text-lg">
                  {patient.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {patient.age} yrs • {patient.gender}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                        statusColors[patient.status]
                      }`}
                    >
                      {patient.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-3.5 h-3.5" />
                  {patient.contact}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Activity className="w-3.5 h-3.5" />
                  {patient.prakriti || "Assessment pending"}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  Registered: {patient.createdAt}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
                  {patient.bloodGroup}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Patient Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl border border-border p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold">Add New Patient</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    className="mt-1.5 rounded-xl"
                    placeholder="Enter patient name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={newPatient.age}
                      onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                      className="mt-1.5 rounded-xl"
                      placeholder="Age"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={newPatient.gender}
                      onValueChange={(value) => setNewPatient({ ...newPatient, gender: value })}
                    >
                      <SelectTrigger className="mt-1.5 rounded-xl">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    value={newPatient.contact}
                    onChange={(e) => setNewPatient({ ...newPatient, contact: e.target.value })}
                    className="mt-1.5 rounded-xl"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select
                    value={newPatient.bloodGroup}
                    onValueChange={(value) => setNewPatient({ ...newPatient, bloodGroup: value })}
                  >
                    <SelectTrigger className="mt-1.5 rounded-xl">
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                        <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleAddPatient}
                  className="w-full mt-4 rounded-xl h-11 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Add Patient
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
