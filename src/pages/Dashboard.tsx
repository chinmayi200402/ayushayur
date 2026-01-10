import { motion } from "framer-motion";
import { Users, Calendar, Activity, Package, TrendingUp, Heart } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/ui/stat-card";
import { RecentPatients } from "@/components/dashboard/RecentPatients";
import { TodaySchedule } from "@/components/dashboard/TodaySchedule";
import { InventoryAlert } from "@/components/dashboard/InventoryAlert";

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2"
        >
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Welcome back, <span className="text-gradient">Dr. Admin</span>
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening at your Ayurvedic center today
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Patients"
            value={124}
            subtitle="12 new this week"
            icon={Users}
            trend={{ value: 8, positive: true }}
            variant="primary"
            delay={0.1}
          />
          <StatCard
            title="Today's Appointments"
            value={18}
            subtitle="4 completed"
            icon={Calendar}
            variant="accent"
            delay={0.15}
          />
          <StatCard
            title="Active Treatments"
            value={32}
            subtitle="Panchakarma in progress"
            icon={Heart}
            variant="highlight"
            delay={0.2}
          />
          <StatCard
            title="Inventory Items"
            value={156}
            subtitle="3 low stock alerts"
            icon={Package}
            delay={0.25}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Patients */}
          <div className="lg:col-span-1">
            <RecentPatients />
          </div>

          {/* Today's Schedule */}
          <div className="lg:col-span-1">
            <TodaySchedule />
          </div>

          {/* Inventory Alert */}
          <div className="lg:col-span-1">
            <InventoryAlert />
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-primary/10 via-accent/10 to-highlight/10 rounded-2xl p-6 border border-primary/20"
        >
          <h3 className="font-display text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              + New Patient
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 bg-accent text-accent-foreground rounded-xl font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Schedule Therapy
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 bg-highlight text-highlight-foreground rounded-xl font-medium text-sm hover:bg-highlight/90 transition-colors"
            >
              Prakriti Assessment
            </motion.button>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
