import { ShoppingBag, Coffee, Car, Home, Smartphone, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "./ui/utils";

export interface Transaction {
  id: string;
  date: string;
  category: string;
  amount: number;
  notes: string;
  type: "income" | "expense";
}

interface TransactionListProps {
  transactions: Transaction[];
}

const categoryIcons: Record<string, any> = {
  shopping: ShoppingBag,
  food: Coffee,
  transport: Car,
  home: Home,
  entertainment: Smartphone,
  income: TrendingUp,
};

const categoryColors: Record<string, string> = {
  shopping: "bg-purple-100 text-purple-600",
  food: "bg-orange-100 text-orange-600",
  transport: "bg-blue-100 text-blue-600",
  home: "bg-green-100 text-green-600",
  entertainment: "bg-pink-100 text-pink-600",
  income: "bg-emerald-100 text-emerald-600",
};

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const Icon = categoryIcons[transaction.category] || ShoppingBag;
  const colorClass = categoryColors[transaction.category] || "bg-gray-100 text-gray-600";

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", colorClass)}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{transaction.notes}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <p className="text-xs text-muted-foreground">{transaction.date}</p>
          <Badge variant="outline" className="text-xs capitalize">
            {transaction.category}
          </Badge>
        </div>
      </div>
      <div className="text-right">
        <p className={cn(
          "font-semibold",
          transaction.type === "income" ? "text-emerald-600" : "text-foreground"
        )}>
          {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
