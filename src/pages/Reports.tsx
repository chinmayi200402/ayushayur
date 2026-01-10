import { motion } from "framer-motion";
import { BarChart3, Users, Calendar, Utensils, FileText, TrendingUp } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const therapyStats = [
  { name: "Abhyanga", count: 45 },
  { name: "Shirodhara", count: 38 },
  { name: "Basti", count: 25 },
  { name: "Nasya", count: 32 },
  { name: "Swedana", count: 28 },
  { name: "Udvartana", count: 15 },
];

const doshaDistribution = [
  { name: "Vata", value: 35, color: "hsl(25, 54%, 46%)" },
  { name: "Pitta", value: 40, color: "hsl(0, 72%, 51%)" },
  { name: "Kapha", value: 25, color: "hsl(115, 37%, 25%)" },
];

const kitchenList = [
  { diet: "Manda (Rice water)", count: 8 },
  { diet: "Peya (Rice gruel)", count: 12 },
  { diet: "Vilepi (Thick gruel)", count: 6 },
  { diet: "Mudga Yusha", count: 4 },
  { diet: "Khichdi", count: 10 },
];

export default function Reports() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Admin Insights & Reports
          </h1>
          <p className="text-muted-foreground mt-1">
            Analytics and operational reports for your center
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Patients This Month", value: 48, icon: Users, color: "primary" },
            { label: "Therapies Completed", value: 183, icon: Calendar, color: "accent" },
            { label: "Revenue", value: "₹4.2L", icon: TrendingUp, color: "highlight" },
            { label: "Avg. Treatment Days", value: 8.5, icon: BarChart3, color: "earth" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              className="bg-card rounded-2xl border border-border p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-display font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}/20 flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Therapy Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-6 shadow-sm"
          >
            <h3 className="font-display text-lg font-semibold mb-6">Therapy Sessions This Month</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={therapyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Dosha Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-card rounded-2xl border border-border p-6 shadow-sm"
          >
            <h3 className="font-display text-lg font-semibold mb-6">Patient Prakriti Distribution</h3>
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={doshaDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {doshaDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {doshaDistribution.map((dosha) => (
                <div key={dosha.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dosha.color }}
                  />
                  <span className="text-sm text-muted-foreground">{dosha.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Chef's Kitchen List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-accent/10 to-highlight/10 rounded-2xl border border-accent/20 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <Utensils className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">Chef's Kitchen List</h3>
              <p className="text-sm text-muted-foreground">Daily diet requirements for all patients</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {kitchenList.map((item, index) => (
              <motion.div
                key={item.diet}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + index * 0.05 }}
                className="bg-card rounded-xl p-4 text-center shadow-sm"
              >
                <p className="text-3xl font-display font-bold text-accent">{item.count}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.diet}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Generate Discharge Summary
                </h3>
                <p className="text-sm text-muted-foreground">
                  Create printable discharge reports for patients
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-highlight/20 flex items-center justify-center group-hover:bg-highlight/30 transition-colors">
                <BarChart3 className="w-6 h-6 text-highlight" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-highlight transition-colors">
                  Monthly Revenue Report
                </h3>
                <p className="text-sm text-muted-foreground">
                  View detailed financial analytics
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
