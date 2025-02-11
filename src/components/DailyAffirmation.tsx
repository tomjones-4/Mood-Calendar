import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
const affirmations = [
  "You are stronger than you know",
  "Today is full of possibilities",
  "Small steps forward are still progress",
  "You are worthy of happiness and peace",
  "Your feelings are valid and important",
  "Your presence makes a difference",
  "You have the power to create change",
  "Every day is a fresh start",
  "Your perspective is unique and valuable",
  "You are capable of amazing things",
];
export function DailyAffirmation() {
  const todayAffirmation = useMemo(() => {
    const today = new Date();
    const index = (today.getDate() + today.getMonth()) % affirmations.length;
    return affirmations[index];
  }, []);
  return (
    <Card className="bg-primary/5">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Quote className="h-6 w-6 text-primary" />
          <p className="text-lg font-medium italic">{todayAffirmation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
