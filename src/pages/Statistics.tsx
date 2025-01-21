import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoodTrends } from "@/components/mood/MoodTrends";
import { MoodAggregates } from "@/components/mood/MoodAggregates";
import { DayMood } from "./Index";
const Statistics = () => {
  const [moodData] = useState<DayMood[]>(() => {
    const saved = localStorage.getItem("moodData");
    return saved ? JSON.parse(saved) : [];
  });
  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">Mood Statistics</h1>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="aggregates">Aggregates</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Mood Trends Over Time
            </h2>
            <MoodTrends moodData={moodData} />
          </Card>
        </TabsContent>

        <TabsContent value="aggregates" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Mood Insights</h2>
            <MoodAggregates moodData={moodData} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Statistics;
