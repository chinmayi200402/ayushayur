import { motion } from "framer-motion";
import { Clock, MapPin, User } from "lucide-react";

const todaySchedule = [
  {
    id: 1,
    time: "09:00 AM",
    therapy: "Abhyanga",
    patient: "Rajesh Kumar",
    room: "Room 101",
    therapist: "Dr. Anil",
    duration: "60 min",
  },
  {
    id: 2,
    time: "10:30 AM",
    therapy: "Shirodhara",
    patient: "Priya Sharma",
    room: "Room 102",
    therapist: "Dr. Meera",
    duration: "45 min",
  },
  {
    id: 3,
    time: "12:00 PM",
    therapy: "Basti",
    patient: "Amit Verma",
    room: "Room 103",
    therapist: "Dr. Anil",
    duration: "90 min",
  },
  {
    id: 4,
    time: "02:30 PM",
    therapy: "Nasya",
    patient: "Sunita Devi",
    room: "Room 101",
    therapist: "Dr. Meera",
    duration: "30 min",
  },
];

export function TodaySchedule() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-semibold">Today's Schedule</h3>
        <span className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </span>
      </div>

      <div className="space-y-4">
        {todaySchedule.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="relative pl-6 pb-4 last:pb-0 border-l-2 border-border last:border-transparent"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
            
            <div className="bg-muted/30 rounded-xl p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-foreground">{item.therapy}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <User className="w-3 h-3" />
                    {item.patient}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">{item.time}</p>
                  <p className="text-xs text-muted-foreground">{item.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.room}
                </span>
                <span>{item.therapist}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
