import { useState } from "react";
import { motion } from "framer-motion";
import { User, Calendar, Check, ChevronDown, ChevronUp, Utensils, Heart } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DayPlan {
  day: number;
  therapy: string;
  diet: string;
  vitals: {
    pulse: string;
    bp: string;
    appetite: string;
  };
  completed: boolean;
}

const patients = [
  { id: 1, name: "Rajesh Kumar", prakriti: "Vata-Pitta", treatmentDays: 7 },
  { id: 2, name: "Priya Sharma", prakriti: "Pitta-Kapha", treatmentDays: 14 },
  { id: 3, name: "Amit Verma", prakriti: "Kapha", treatmentDays: 7 },
];

const defaultJourney: DayPlan[] = [
  { day: 1, therapy: "Snehapana (Internal Oleation)", diet: "Manda (Rice water)", vitals: { pulse: "72", bp: "120/80", appetite: "Normal" }, completed: true },
  { day: 2, therapy: "Snehapana (Increased dose)", diet: "Manda", vitals: { pulse: "74", bp: "118/78", appetite: "Reduced" }, completed: true },
  { day: 3, therapy: "Snehapana (Maximum dose)", diet: "Peya (Rice gruel)", vitals: { pulse: "70", bp: "122/82", appetite: "Low" }, completed: true },
  { day: 4, therapy: "Abhyanga + Swedana", diet: "Vilepi (Thick rice gruel)", vitals: { pulse: "68", bp: "120/80", appetite: "Improving" }, completed: false },
  { day: 5, therapy: "Virechana (Purgation)", diet: "Peya", vitals: { pulse: "", bp: "", appetite: "" }, completed: false },
  { day: 6, therapy: "Samsarjana Krama Day 1", diet: "Manda", vitals: { pulse: "", bp: "", appetite: "" }, completed: false },
  { day: 7, therapy: "Samsarjana Krama Day 2", diet: "Vilepi + Mudga Yusha", vitals: { pulse: "", bp: "", appetite: "" }, completed: false },
];

export default function TreatmentJourney() {
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [journey, setJourney] = useState<DayPlan[]>(defaultJourney);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const patient = patients.find(p => p.name === selectedPatient);
  const currentDay = journey.filter(d => d.completed).length + 1;
  const progress = (journey.filter(d => d.completed).length / journey.length) * 100;

  const handleCompleteSession = (dayIndex: number) => {
    const newJourney = [...journey];
    newJourney[dayIndex].completed = true;
    setJourney(newJourney);
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
              Treatment Journey
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and manage patient treatment progress
            </p>
          </div>
          <div className="w-full md:w-72">
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.name}>
                    {p.name} ({p.treatmentDays} days)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {!selectedPatient ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-2xl border border-border p-12 text-center"
          >
            <User className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">Select a Patient</h3>
            <p className="text-muted-foreground">
              Choose a patient to view their treatment journey
            </p>
          </motion.div>
        ) : (
          <>
            {/* Patient Info & Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-display text-xl font-semibold">
                    {selectedPatient.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-semibold">{selectedPatient}</h2>
                    <p className="text-muted-foreground">Prakriti: {patient?.prakriti}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Treatment Progress</span>
                    <span className="font-medium">Day {currentDay} of {journey.length}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {journey.filter(d => d.completed).length} sessions completed
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-6">
                <h3 className="font-display text-lg font-semibold mb-4">Today's Session</h3>
                {journey[currentDay - 1] && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Day {currentDay}</span>
                    </div>
                    <p className="font-semibold">{journey[currentDay - 1]?.therapy}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Utensils className="w-4 h-4" />
                      <span>{journey[currentDay - 1]?.diet}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Journey Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-sm"
            >
              <h3 className="font-display text-lg font-semibold mb-6">Treatment Timeline</h3>

              <div className="space-y-4">
                {journey.map((day, index) => {
                  const isExpanded = expandedDay === index;
                  const isCurrent = index === currentDay - 1;

                  return (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className={`rounded-xl border overflow-hidden transition-all ${
                        day.completed
                          ? "bg-primary/5 border-primary/20"
                          : isCurrent
                          ? "bg-highlight/5 border-highlight/30"
                          : "bg-muted/30 border-border"
                      }`}
                    >
                      <button
                        onClick={() => setExpandedDay(isExpanded ? null : index)}
                        className="w-full p-4 flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                              day.completed
                                ? "bg-primary text-primary-foreground"
                                : isCurrent
                                ? "bg-highlight text-highlight-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {day.completed ? <Check className="w-5 h-5" /> : day.day}
                          </div>
                          <div>
                            <p className="font-semibold">
                              Day {day.day}: {day.therapy}
                            </p>
                            <p className="text-sm text-muted-foreground">{day.diet}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {isCurrent && !day.completed && (
                            <span className="px-2 py-1 bg-highlight/20 text-highlight text-xs font-medium rounded-lg">
                              Today
                            </span>
                          )}
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 pb-4 border-t border-border/50"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="p-4 bg-background rounded-xl">
                              <p className="text-xs text-muted-foreground mb-1">Pulse Rate</p>
                              <p className="font-semibold">{day.vitals.pulse || "—"} BPM</p>
                            </div>
                            <div className="p-4 bg-background rounded-xl">
                              <p className="text-xs text-muted-foreground mb-1">Blood Pressure</p>
                              <p className="font-semibold">{day.vitals.bp || "—"}</p>
                            </div>
                            <div className="p-4 bg-background rounded-xl">
                              <p className="text-xs text-muted-foreground mb-1">Appetite</p>
                              <p className="font-semibold">{day.vitals.appetite || "—"}</p>
                            </div>
                          </div>

                          {!day.completed && isCurrent && (
                            <Button
                              onClick={() => handleCompleteSession(index)}
                              className="w-full mt-4 rounded-xl bg-primary text-primary-foreground"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Complete Session
                            </Button>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
