import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoodTrends } from "@/components/mood/MoodTrends";
import { MoodAggregates } from "@/components/mood/MoodAggregates";
import { DayMood } from "./Index";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Statistics = () => {
  // Get moodData from localStorage or another source
  const moodData: DayMood[] = JSON.parse(
    localStorage.getItem("moodData") || "[]"
  ).map((item: any) => ({
    ...item,
    date: new Date(item.date),
  }));
  const favoriteDays = moodData.filter((day) => day.favorite);

  return (
    <div className="container py-8 space-y-8 animate-fade-in">
      <h1 className="text-4xl font-bold">Mood Statistics</h1>
      <Card className="w-full p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Mood Trends</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <MoodTrends moodData={moodData} />
        </CardContent>
      </Card>
      <div className="grid gap-8">
        <MoodAggregates moodData={moodData} />
        {favoriteDays.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Favorite Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteDays.map((day) => (
                  <Card key={day.date.toString()} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">
                          {format(new Date(day.date), "MMMM d, yyyy")}
                        </p>
                        <p className="text-2x1 mt-1">{day.mood}</p>
                      </div>
                      <Star className="h-4 w-4 text-yellow-500" />
                    </div>
                    {day.note && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                        {day.note}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
export default Statistics;
