import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Clock, User, MapPin, X, AlertTriangle } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Appointment {
  id: number;
  time: string;
  endTime: string;
  therapy: string;
  patient: string;
  patientGender: string;
  therapist: string;
  therapistGender: string;
  room: string;
  duration: number;
  day: number;
}

const therapies = [
  { name: "Abhyanga", duration: 60, genderRestricted: true },
  { name: "Shirodhara", duration: 45, genderRestricted: false },
  { name: "Basti", duration: 90, genderRestricted: true },
  { name: "Nasya", duration: 30, genderRestricted: false },
  { name: "Swedana", duration: 45, genderRestricted: false },
  { name: "Udvartana", duration: 60, genderRestricted: true },
];

const rooms = ["Room 101", "Room 102", "Room 103", "Room 104"];
const therapists = [
  { name: "Dr. Anil", gender: "Male" },
  { name: "Dr. Meera", gender: "Female" },
  { name: "Dr. Rajan", gender: "Male" },
  { name: "Dr. Priya", gender: "Female" },
];

const patients = [
  { name: "Rajesh Kumar", gender: "Male" },
  { name: "Priya Sharma", gender: "Female" },
  { name: "Amit Verma", gender: "Male" },
  { name: "Sunita Devi", gender: "Female" },
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const mockAppointments: Appointment[] = [
  { id: 1, time: "09:00", endTime: "10:00", therapy: "Abhyanga", patient: "Rajesh Kumar", patientGender: "Male", therapist: "Dr. Anil", therapistGender: "Male", room: "Room 101", duration: 60, day: 0 },
  { id: 2, time: "10:30", endTime: "11:15", therapy: "Shirodhara", patient: "Priya Sharma", patientGender: "Female", therapist: "Dr. Meera", therapistGender: "Female", room: "Room 102", duration: 45, day: 0 },
  { id: 3, time: "14:00", endTime: "15:30", therapy: "Basti", patient: "Amit Verma", patientGender: "Male", therapist: "Dr. Rajan", therapistGender: "Male", room: "Room 103", duration: 90, day: 1 },
  { id: 4, time: "09:30", endTime: "10:00", therapy: "Nasya", patient: "Sunita Devi", patientGender: "Female", therapist: "Dr. Priya", therapistGender: "Female", room: "Room 101", duration: 30, day: 2 },
];

export default function Scheduler() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; time: string } | null>(null);
  const [conflict, setConflict] = useState<string | null>(null);
  
  const [newAppointment, setNewAppointment] = useState({
    therapy: "",
    patient: "",
    therapist: "",
    room: "",
    time: "",
    day: 0,
  });

  const getWeekDates = () => {
    const dates = [];
    const start = new Date(currentWeekStart);
    start.setDate(start.getDate() - start.getDay() + 1);
    
    for (let i = 0; i < 6; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const navigateWeek = (direction: number) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + direction * 7);
    setCurrentWeekStart(newDate);
  };

  const getAppointmentsForSlot = (day: number, time: string) => {
    return appointments.filter(
      (apt) => apt.day === day && apt.time === time
    );
  };

  const checkConflicts = () => {
    const selectedTherapy = therapies.find(t => t.name === newAppointment.therapy);
    const selectedPatient = patients.find(p => p.name === newAppointment.patient);
    const selectedTherapist = therapists.find(t => t.name === newAppointment.therapist);

    // Check gender restriction
    if (selectedTherapy?.genderRestricted && selectedPatient && selectedTherapist) {
      if (selectedPatient.gender !== selectedTherapist.gender) {
        return `${selectedTherapy.name} requires same-gender therapist. Please assign a ${selectedPatient.gender.toLowerCase()} therapist.`;
      }
    }

    // Check room availability
    const existingRoomAppointment = appointments.find(
      apt => apt.day === newAppointment.day && 
             apt.time === newAppointment.time && 
             apt.room === newAppointment.room
    );
    if (existingRoomAppointment) {
      return `${newAppointment.room} is already booked at this time.`;
    }

    // Check therapist availability
    const existingTherapistAppointment = appointments.find(
      apt => apt.day === newAppointment.day && 
             apt.time === newAppointment.time && 
             apt.therapist === newAppointment.therapist
    );
    if (existingTherapistAppointment) {
      return `${newAppointment.therapist} is already scheduled at this time.`;
    }

    return null;
  };

  const handleSlotClick = (day: number, time: string) => {
    setSelectedSlot({ day, time });
    setNewAppointment({ ...newAppointment, day, time });
    setShowAddModal(true);
    setConflict(null);
  };

  const handleAddAppointment = () => {
    const conflictMessage = checkConflicts();
    if (conflictMessage) {
      setConflict(conflictMessage);
      return;
    }

    const selectedTherapy = therapies.find(t => t.name === newAppointment.therapy);
    const selectedPatient = patients.find(p => p.name === newAppointment.patient);
    const selectedTherapist = therapists.find(t => t.name === newAppointment.therapist);

    if (selectedTherapy && selectedPatient && selectedTherapist) {
      const [hours, minutes] = newAppointment.time.split(':').map(Number);
      const endMinutes = hours * 60 + minutes + selectedTherapy.duration;
      const endHours = Math.floor(endMinutes / 60);
      const endMins = endMinutes % 60;
      const endTime = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;

      const appointment: Appointment = {
        id: appointments.length + 1,
        time: newAppointment.time,
        endTime,
        therapy: newAppointment.therapy,
        patient: newAppointment.patient,
        patientGender: selectedPatient.gender,
        therapist: newAppointment.therapist,
        therapistGender: selectedTherapist.gender,
        room: newAppointment.room,
        duration: selectedTherapy.duration,
        day: newAppointment.day,
      };

      setAppointments([...appointments, appointment]);
      setShowAddModal(false);
      setNewAppointment({ therapy: "", patient: "", therapist: "", room: "", time: "", day: 0 });
      setConflict(null);
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
              Therapy Scheduler
            </h1>
            <p className="text-muted-foreground mt-1">
              Schedule and manage therapy appointments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateWeek(-1)}
              className="rounded-xl"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="font-medium text-sm">
              {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDates[5].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateWeek(1)}
              className="rounded-xl"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
        >
          {/* Days Header */}
          <div className="grid grid-cols-7 border-b border-border">
            <div className="p-4 border-r border-border bg-muted/30">
              <span className="text-sm font-medium text-muted-foreground">Time</span>
            </div>
            {weekDays.map((day, index) => (
              <div
                key={day}
                className="p-4 text-center border-r border-border last:border-r-0 bg-muted/30"
              >
                <p className="text-sm font-medium text-muted-foreground">{day}</p>
                <p className="text-lg font-semibold text-foreground">
                  {weekDates[index].getDate()}
                </p>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="max-h-[600px] overflow-y-auto">
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-7 border-b border-border last:border-b-0">
                <div className="p-3 border-r border-border bg-muted/10">
                  <span className="text-xs font-medium text-muted-foreground">{time}</span>
                </div>
                {weekDays.map((_, dayIndex) => {
                  const slotAppointments = getAppointmentsForSlot(dayIndex, time);
                  
                  return (
                    <div
                      key={`${dayIndex}-${time}`}
                      onClick={() => handleSlotClick(dayIndex, time)}
                      className="p-1 border-r border-border last:border-r-0 min-h-[60px] hover:bg-muted/30 cursor-pointer transition-colors"
                    >
                      {slotAppointments.map((apt) => (
                        <motion.div
                          key={apt.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-2 rounded-lg bg-primary/20 border border-primary/30 text-xs mb-1"
                        >
                          <p className="font-semibold text-primary truncate">{apt.therapy}</p>
                          <p className="text-muted-foreground truncate">{apt.patient}</p>
                          <p className="text-muted-foreground/70 truncate">{apt.room}</p>
                        </motion.div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4"
        >
          {therapies.slice(0, 4).map((therapy) => (
            <div key={therapy.name} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <span>{therapy.name} ({therapy.duration}min)</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Add Appointment Modal */}
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
                <h2 className="font-display text-xl font-semibold">Schedule Therapy</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {conflict && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 rounded-xl bg-destructive/10 border border-destructive/30 flex items-start gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive">Scheduling Conflict</p>
                    <p className="text-sm text-destructive/80">{conflict}</p>
                  </div>
                </motion.div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Clock className="w-4 h-4" />
                  <span>
                    {weekDays[selectedSlot?.day || 0]}, {selectedSlot?.time}
                  </span>
                </div>

                <div>
                  <Label>Therapy</Label>
                  <Select
                    value={newAppointment.therapy}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, therapy: value })}
                  >
                    <SelectTrigger className="mt-1.5 rounded-xl">
                      <SelectValue placeholder="Select therapy" />
                    </SelectTrigger>
                    <SelectContent>
                      {therapies.map((therapy) => (
                        <SelectItem key={therapy.name} value={therapy.name}>
                          {therapy.name} ({therapy.duration}min)
                          {therapy.genderRestricted && " ⚠️"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Patient</Label>
                  <Select
                    value={newAppointment.patient}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, patient: value })}
                  >
                    <SelectTrigger className="mt-1.5 rounded-xl">
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.name} value={patient.name}>
                          {patient.name} ({patient.gender})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Therapist</Label>
                  <Select
                    value={newAppointment.therapist}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, therapist: value })}
                  >
                    <SelectTrigger className="mt-1.5 rounded-xl">
                      <SelectValue placeholder="Select therapist" />
                    </SelectTrigger>
                    <SelectContent>
                      {therapists.map((therapist) => (
                        <SelectItem key={therapist.name} value={therapist.name}>
                          {therapist.name} ({therapist.gender})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Room</Label>
                  <Select
                    value={newAppointment.room}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, room: value })}
                  >
                    <SelectTrigger className="mt-1.5 rounded-xl">
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room} value={room}>{room}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleAddAppointment}
                  className="w-full mt-4 rounded-xl h-11 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!newAppointment.therapy || !newAppointment.patient || !newAppointment.therapist || !newAppointment.room}
                >
                  Schedule Appointment
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
