import { motion } from "framer-motion";
import { User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const recentPatients = [
  { id: 1, name: "Rajesh Kumar", age: 45, prakriti: "Vata-Pitta", status: "In Treatment", avatar: "RK" },
  { id: 2, name: "Priya Sharma", age: 32, prakriti: "Pitta-Kapha", status: "Scheduled", avatar: "PS" },
  { id: 3, name: "Amit Verma", age: 58, prakriti: "Kapha", status: "In Treatment", avatar: "AV" },
  { id: 4, name: "Sunita Devi", age: 41, prakriti: "Vata", status: "Completed", avatar: "SD" },
];

const statusColors = {
  "In Treatment": "bg-primary/20 text-primary",
  "Scheduled": "bg-highlight/20 text-highlight",
  "Completed": "bg-accent/20 text-accent",
};

export function RecentPatients() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-semibold">Recent Patients</h3>
        <Link
          to="/patients"
          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {recentPatients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-medium text-sm">
              {patient.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                {patient.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {patient.age} yrs • {patient.prakriti}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                statusColors[patient.status as keyof typeof statusColors]
              }`}
            >
              {patient.status}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
