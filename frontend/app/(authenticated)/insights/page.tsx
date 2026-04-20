import { Sparkles, Calendar, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/ui/tabs";
import { Badge } from "@/lib/components/ui/badge";
import { cn } from "@/lib/components/ui/utils";

interface Insight {
  id: string;
  title: string;
  description: string;
  period: "daily" | "weekly" | "monthly";
  type: "positive" | "warning" | "neutral";
  impact: "high" | "medium" | "low";
  date: string;
}

const mockInsights: Insight[] = [
  {
    id: "1",
    title: "Coffee spending is up 40%",
    description: "You've spent $120 on coffee this week, which is 40% more than your average. Consider brewing coffee at home to save approximately $15/week.",
    period: "weekly",
    type: "warning",
    impact: "medium",
    date: "Apr 7, 2026",
  },
  {
    id: "2",
    title: "Great savings this month!",
    description: "Your entertainment expenses decreased by 25% compared to last month. You've saved $150 by reducing streaming subscriptions.",
    period: "monthly",
    type: "positive",
    impact: "high",
    date: "Apr 1, 2026",
  },
  {
    id: "3",
    title: "Transport costs increasing",
    description: "Daily ride-share usage has increased by 30%. Consider public transportation or carpooling to reduce your monthly transport budget.",
    period: "daily",
    type: "warning",
    impact: "high",
    date: "Apr 7, 2026",
  },
  {
    id: "4",
    title: "You're on track with your budget",
    description: "Your spending this week is aligned with your monthly budget goals. Keep up the good work!",
    period: "weekly",
    type: "positive",
    impact: "low",
    date: "Apr 5, 2026",
  },
  {
    id: "5",
    title: "Grocery shopping pattern detected",
    description: "You tend to spend more on groceries during weekends. Planning your shopping list ahead could help reduce impulse purchases by 15-20%.",
    period: "weekly",
    type: "neutral",
    impact: "medium",
    date: "Apr 3, 2026",
  },
  {
    id: "6",
    title: "Subscription renewal upcoming",
    description: "Your annual gym membership ($600) will renew in 5 days. Make sure you have sufficient balance.",
    period: "daily",
    type: "neutral",
    impact: "high",
    date: "Apr 7, 2026",
  },
];

export function InsightsPage() {
  const getInsightsByPeriod = (period: string) => {
    return mockInsights.filter(insight => insight.period === period);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">AI Insights</h1>
            <p className="text-muted-foreground">Smart analysis of your spending patterns</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Insights</p>
                <p className="text-2xl font-semibold mt-1">{mockInsights.length}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Savings Tips</p>
                <p className="text-2xl font-semibold mt-1">
                  {mockInsights.filter(i => i.type === "warning").length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Good News</p>
                <p className="text-2xl font-semibold mt-1">
                  {mockInsights.filter(i => i.type === "positive").length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights by Period */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Your Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="space-y-4 mt-6">
              {getInsightsByPeriod("daily").map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </TabsContent>
            <TabsContent value="weekly" className="space-y-4 mt-6">
              {getInsightsByPeriod("weekly").map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </TabsContent>
            <TabsContent value="monthly" className="space-y-4 mt-6">
              {getInsightsByPeriod("monthly").map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function InsightCard({ insight }: { insight: Insight }) {
  const typeConfig = {
    positive: {
      bgColor: "bg-emerald-50 border-emerald-200",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      badgeBg: "bg-emerald-100 text-emerald-700",
      icon: TrendingUp,
    },
    warning: {
      bgColor: "bg-amber-50 border-amber-200",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      badgeBg: "bg-amber-100 text-amber-700",
      icon: AlertCircle,
    },
    neutral: {
      bgColor: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      badgeBg: "bg-blue-100 text-blue-700",
      icon: Sparkles,
    },
  };

  const config = typeConfig[insight.type];
  const Icon = config.icon;

  const impactColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-gray-100 text-gray-700",
  };

  return (
    <Card className={cn("border", config.bgColor)}>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", config.iconBg)}>
              <Icon className={cn("w-5 h-5", config.iconColor)} />
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold">{insight.title}</h3>
                <div className="flex gap-2 flex-shrink-0">
                  <Badge variant="outline" className={cn("text-xs", config.badgeBg)}>
                    {insight.period}
                  </Badge>
                  <Badge variant="outline" className={cn("text-xs capitalize", impactColors[insight.impact])}>
                    {insight.impact} impact
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {insight.description}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>{insight.date}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}