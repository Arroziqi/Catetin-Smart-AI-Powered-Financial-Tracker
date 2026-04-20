import { Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface InsightCardProps {
  insight: string;
  period?: string;
}

export function InsightCard({ insight, period = "This week" }: InsightCardProps) {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 shadow-sm">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm">AI Insight</h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {period}
              </span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {insight}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
