import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Search, AlertTriangle, TrendingDown, Filter } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface InventoryItem {
  id: number;
  name: string;
  category: "Tailam" | "Churna" | "Kashayam" | "Gulika" | "Arishtam";
  stock: number;
  unit: string;
  lastRestocked: string;
}

const inventoryItems: InventoryItem[] = [
  { id: 1, name: "Dhanwantaram Tailam", category: "Tailam", stock: 8, unit: "liters", lastRestocked: "2024-01-05" },
  { id: 2, name: "Ksheerabala Tailam", category: "Tailam", stock: 45, unit: "liters", lastRestocked: "2024-01-10" },
  { id: 3, name: "Mahamasha Tailam", category: "Tailam", stock: 28, unit: "liters", lastRestocked: "2024-01-08" },
  { id: 4, name: "Triphala Churna", category: "Churna", stock: 5, unit: "kg", lastRestocked: "2024-01-03" },
  { id: 5, name: "Ashwagandha Churna", category: "Churna", stock: 72, unit: "kg", lastRestocked: "2024-01-12" },
  { id: 6, name: "Trikatu Churna", category: "Churna", stock: 35, unit: "kg", lastRestocked: "2024-01-07" },
  { id: 7, name: "Dasamoola Kashayam", category: "Kashayam", stock: 62, unit: "liters", lastRestocked: "2024-01-09" },
  { id: 8, name: "Rasnadi Kashayam", category: "Kashayam", stock: 12, unit: "liters", lastRestocked: "2024-01-04" },
  { id: 9, name: "Brahmi Gulika", category: "Gulika", stock: 88, unit: "bottles", lastRestocked: "2024-01-11" },
  { id: 10, name: "Dasamoolarishtam", category: "Arishtam", stock: 55, unit: "liters", lastRestocked: "2024-01-06" },
];

const categoryColors = {
  Tailam: "bg-accent/20 text-accent border-accent/30",
  Churna: "bg-primary/20 text-primary border-primary/30",
  Kashayam: "bg-highlight/20 text-highlight border-highlight/30",
  Gulika: "bg-earth/20 text-earth border-earth/30",
  Arishtam: "bg-muted text-muted-foreground border-border",
};

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...new Set(inventoryItems.map(item => item.category))];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventoryItems.filter(item => item.stock < 15);
  const totalItems = inventoryItems.length;
  const healthyStock = inventoryItems.filter(item => item.stock >= 50).length;

  const getStockColor = (stock: number) => {
    if (stock < 10) return "bg-destructive";
    if (stock < 25) return "bg-highlight";
    if (stock < 50) return "bg-accent";
    return "bg-primary";
  };

  const getStockLabel = (stock: number) => {
    if (stock < 10) return "Critical";
    if (stock < 25) return "Low";
    if (stock < 50) return "Moderate";
    return "Good";
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Inventory Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage Ayurvedic medicines and supplies
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">{totalItems}</p>
                <p className="text-xs text-muted-foreground">Total Items</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">{healthyStock}</p>
                <p className="text-xs text-muted-foreground">Healthy Stock</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-highlight/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-highlight" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">{lowStockItems.length}</p>
                <p className="text-xs text-muted-foreground">Low Stock</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">{inventoryItems.filter(i => i.stock < 10).length}</p>
                <p className="text-xs text-muted-foreground">Critical</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-destructive/5 rounded-2xl border border-destructive/20 p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <h3 className="font-semibold text-destructive">Low Stock Alert</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-background rounded-xl p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <span className="text-sm font-bold text-destructive">{item.stock}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-11 rounded-xl"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Inventory Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left p-4 font-semibold text-sm">Item Name</th>
                  <th className="text-left p-4 font-semibold text-sm">Category</th>
                  <th className="text-left p-4 font-semibold text-sm">Stock Level</th>
                  <th className="text-left p-4 font-semibold text-sm">Status</th>
                  <th className="text-left p-4 font-semibold text-sm">Last Restocked</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.03 }}
                    className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                          <Package className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                          categoryColors[item.category]
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 w-48">
                      <div className="space-y-1">
                        <Progress
                          value={item.stock}
                          className={`h-2 [&>div]:${getStockColor(item.stock)}`}
                        />
                        <p className="text-xs text-muted-foreground">
                          {item.stock}% ({item.unit})
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                          item.stock < 10
                            ? "bg-destructive/20 text-destructive"
                            : item.stock < 25
                            ? "bg-highlight/20 text-highlight"
                            : item.stock < 50
                            ? "bg-accent/20 text-accent"
                            : "bg-primary/20 text-primary"
                        }`}
                      >
                        {getStockLabel(item.stock)}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(item.lastRestocked).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
