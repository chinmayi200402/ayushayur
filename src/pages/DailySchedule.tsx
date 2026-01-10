import { motion } from "framer-motion";
import { Clock, User, MapPin, CheckCircle2, Circle } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";

interface ScheduleItem {
  id: number;
  time: string;
  endTime: string;
  therapy: string;
  patient: string;
  room: string;
  therapist: string;
  status: "completed" | "in-progress" | "upcoming";
}

const scheduleItems: ScheduleItem[] = [
  { id: 1, time: "08:00", endTime: "09:00", therapy: "Abhyanga", patient: "Rajesh Kumar", room: "Room 101", therapist: "Dr. Anil", status: "completed" },
  { id: 2, time: "09:00", endTime: "09:45", therapy: "Shirodhara", patient: "Priya Sharma", room: "Room 102", therapist: "Dr. Meera", status: "completed" },
  { id: 3, time: "09:30", endTime: "10:00", therapy: "Nasya", patient: "Sunita Devi", room: "Room 103", therapist: "Dr. Priya", status: "in-progress" },
  { id: 4, time: "10:30", endTime: "12:00", therapy: "Basti", patient: "Amit Verma", room: "Room 101", therapist: "Dr. Rajan", status: "upcoming" },
  { id: 5, time: "11:00", endTime: "12:00", therapy: "Udvartana", patient: "Vikram Singh", room: "Room 102", therapist: "Dr. Anil", status: "upcoming" },
  { id: 6, time: "14:00", endTime: "14:45", therapy: "Swedana", patient: "Rajesh Kumar", room: "Room 103", therapist: "Dr. Meera", status: "upcoming" },
  { id: 7, time: "15:00", endTime: "16:00", therapy: "Abhyanga", patient: "Priya Sharma", room: "Room 101", therapist: "Dr. Priya", status: "upcoming" },
  { id: 8, time: "16:30", endTime: "17:15", therapy: "Shirodhara", patient: "Sunita Devi", room: "Room 102", therapist: "Dr. Rajan", status: "upcoming" },
];

const statusStyles = {
  completed: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    icon: CheckCircle2,
    iconColor: "text-primary",
    label: "Completed",
    labelBg: "bg-primary/20 text-primary",
  },
  "in-progress": {
    bg: "bg-highlight/10",
    border: "border-highlight/30",
    icon: Clock,
    iconColor: "text-highlight",
    label: "In Progress",
    labelBg: "bg-highlight/20 text-highlight",
  },
  upcoming: {
    bg: "bg-muted/50",
    border: "border-border",
    icon: Circle,
    iconColor: "text-muted-foreground",
    label: "Upcoming",
    labelBg: "bg-muted text-muted-foreground",
  },
};

const rooms = ["Room 101", "Room 102", "Room 103"];

export default function DailySchedule() {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const groupedByRoom = rooms.reduce((acc, room) => {
    acc[room] = scheduleItems.filter(item => item.room === room);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

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
              Daily Schedule
            </h1>
            <p className="text-muted-foreground mt-1">{today}</p>
          </div>
          <div className="flex gap-2">
            {Object.entries(statusStyles).map(([key, style]) => (
              <span
                key={key}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${style.labelBg}`}
              >
                {style.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="bg-card rounded-2xl border border-border p-4 text-center">
            <p className="text-3xl font-display font-bold text-primary">
              {scheduleItems.filter(i => i.status === "completed").length}
            </p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-4 text-center">
            <p className="text-3xl font-display font-bold text-highlight">
              {scheduleItems.filter(i => i.status === "in-progress").length}
            </p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-4 text-center">
            <p className="text-3xl font-display font-bold text-muted-foreground">
              {scheduleItems.filter(i => i.status === "upcoming").length}
            </p>
            <p className="text-sm text-muted-foreground">Upcoming</p>
          </div>
        </motion.div>

        {/* Room-wise Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {rooms.map((room, roomIndex) => (
            <motion.div
              key={room}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + roomIndex * 0.1 }}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
            >
              <div className="p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-foreground">{room}</h3>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {groupedByRoom[room].length} appointments today
                </p>
              </div>

              <div className="p-3 space-y-3 max-h-[500px] overflow-y-auto">
                {groupedByRoom[room].length === 0 ? (
                  <p className="text-center text-muted-foreground py-8 text-sm">
                    No appointments
                  </p>
                ) : (
                  groupedByRoom[room].map((item, index) => {
                    const style = statusStyles[item.status];
                    const Icon = style.icon;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className={`p-4 rounded-xl ${style.bg} border ${style.border}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-foreground">{item.therapy}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.time} - {item.endTime}
                            </p>
                          </div>
                          <Icon className={`w-5 h-5 ${style.iconColor}`} />
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <User className="w-3 h-3" />
                            {item.patient}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {item.therapist}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl border border-border p-6 shadow-sm"
        >
          <h3 className="font-display text-lg font-semibold mb-6">Timeline</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-4">
              {scheduleItems.map((item, index) => {
                const style = statusStyles[item.status];
                const Icon = style.icon;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="relative flex gap-4 pl-12"
                  >
                    {/* Timeline dot */}
                    <div className={`absolute left-4 w-5 h-5 rounded-full ${style.bg} border-2 ${style.border} flex items-center justify-center`}>
                      <Icon className={`w-3 h-3 ${style.iconColor}`} />
                    </div>

                    <div className={`flex-1 p-4 rounded-xl ${style.bg} border ${style.border}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{item.therapy}</p>
                          <p className="text-sm text-muted-foreground">{item.patient}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{item.time}</p>
                          <p className="text-xs text-muted-foreground">{item.room}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
