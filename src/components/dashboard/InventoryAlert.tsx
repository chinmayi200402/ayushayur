import { motion } from "framer-motion";
import { AlertTriangle, Package } from "lucide-react";

const lowStockItems = [
  { name: "Dhanwantaram Tailam", stock: 8, category: "Tailam" },
  { name: "Triphala Churna", stock: 5, category: "Churna" },
  { name: "Ksheerabala Tailam", stock: 12, category: "Tailam" },
];

export function InventoryAlert() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-destructive/5 rounded-2xl border border-destructive/20 p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-destructive" />
        </div>
        <h3 className="font-display text-lg font-semibold text-destructive">
          Low Stock Alert
        </h3>
      </div>

      <div className="space-y-3">
        {lowStockItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-center justify-between p-3 bg-background rounded-xl"
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.category}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-destructive">
              {item.stock}%
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
