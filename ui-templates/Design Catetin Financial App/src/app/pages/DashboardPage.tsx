import { TrendingUp, TrendingDown, Wallet, Sparkles, Filter } from "lucide-react";
import { motion } from "motion/react";
import { SummaryCard } from "../components/SummaryCard";
import { InsightCard } from "../components/InsightCard";
import { TransactionList, Transaction } from "../components/TransactionList";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data
const spendingData = [
  { date: "Mon", amount: 120 },
  { date: "Tue", amount: 85 },
  { date: "Wed", amount: 200 },
  { date: "Thu", amount: 95 },
  { date: "Fri", amount: 150 },
  { date: "Sat", amount: 300 },
  { date: "Sun", amount: 180 },
];

const categoryData = [
  { name: "Food", value: 450, color: "#f59e0b" },
  { name: "Shopping", value: 320, color: "#8b5cf6" },
  { name: "Transport", value: 180, color: "#3b82f6" },
  { name: "Entertainment", value: 120, color: "#ec4899" },
  { name: "Home", value: 200, color: "#10b981" },
];

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "Apr 7, 2026",
    category: "food",
    amount: 45.50,
    notes: "Lunch at Cafe Rosa",
    type: "expense",
  },
  {
    id: "2",
    date: "Apr 7, 2026",
    category: "transport",
    amount: 15.00,
    notes: "Uber to office",
    type: "expense",
  },
  {
    id: "3",
    date: "Apr 6, 2026",
    category: "income",
    amount: 3500.00,
    notes: "Monthly salary",
    type: "income",
  },
  {
    id: "4",
    date: "Apr 6, 2026",
    category: "shopping",
    amount: 89.99,
    notes: "New headphones",
    type: "expense",
  },
  {
    id: "5",
    date: "Apr 5, 2026",
    category: "food",
    amount: 32.00,
    notes: "Grocery shopping",
    type: "expense",
  },
];

export function DashboardPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome back, John! 👋</h1>
        <p className="text-muted-foreground">Here's your financial overview for this week</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          title="Total Income"
          value="$5,240"
          trend={{ value: "12% from last month", isPositive: true }}
          icon={TrendingUp}
          iconColor="bg-emerald-100 text-emerald-600"
        />
        <SummaryCard
          title="Total Expense"
          value="$2,845"
          trend={{ value: "8% from last month", isPositive: false }}
          icon={TrendingDown}
          iconColor="bg-red-100 text-red-600"
        />
        <SummaryCard
          title="Balance"
          value="$2,395"
          trend={{ value: "18% from last month", isPositive: true }}
          icon={Wallet}
          iconColor="bg-blue-100 text-blue-600"
        />
      </div>

      {/* AI Insight */}
      <InsightCard 
        insight="Your spending increased this week due to frequent food purchases and online shopping. Consider meal prepping to reduce food expenses by 20-30%."
        period="This week"
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Line Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Spending Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Expense by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
        <TransactionList transactions={mockTransactions} />
      </div>
    </motion.div>
  );
}