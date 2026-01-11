import { motion } from "framer-motion";
import { AlertTriangle, Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function InventoryAlert() {
  const { data: lowStockItems = [], isLoading } = useQuery({
    queryKey: ["low-stock-inventory"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .order("quantity", { ascending: true })
        .limit(5);
      
      if (error) throw error;
      
      // Filter items where quantity is below min_stock_level
      return (data || []).filter(item => item.quantity < item.min_stock_level);
    },
  });

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-destructive/5 rounded-2xl border border-destructive/20 p-4 md:p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </div>
          <h3 className="font-display text-base md:text-lg font-semibold text-destructive">
            Low Stock Alert
          </h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-background/50 rounded-xl animate-pulse" />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-destructive/5 rounded-2xl border border-destructive/20 p-4 md:p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-destructive" />
        </div>
        <h3 className="font-display text-base md:text-lg font-semibold text-destructive">
          Low Stock Alert
        </h3>
      </div>

      {lowStockItems.length === 0 ? (
        <p className="text-sm text-muted-foreground">All items are well stocked!</p>
      ) : (
        <div className="space-y-3">
          {lowStockItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-background rounded-xl"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Package className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{item.item_name}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <span className="text-sm font-semibold text-destructive">
                  {item.quantity} {item.unit}
                </span>
                <p className="text-xs text-muted-foreground">
                  Min: {item.min_stock_level}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
