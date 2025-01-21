import { useMemo } from "react";
import { format, differenceInDays } from "date-fns";
import { DayMood } from "@/pages/Index";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface MoodAggregatesProps {
  moodData: DayMood[];
}
export function MoodAggregates({ moodData }: MoodAggregatesProps) {
  const stats = useMemo(() => {
    if (!moodData.length) return null;
    const moodCounts: Record<string, number> = {};
    moodData.forEach((day) => {
      moodCounts[day.mood] = (moodCounts[day.mood] || 0) + 1;
    });
    const sortedDates = [...moodData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const streakDays = moodData.length;
    const daysSinceStart = differenceInDays(
      new Date(),
      new Date(sortedDates[0].date)
    );
    const consistency = Math.round((streakDays / (daysSinceStart + 1)) * 100);
    const mostFrequentMood = Object.entries(moodCounts).sort(
      (a, b) => b[1] - a[1]
    )[0];
    return {
      totalEntries: moodData.length,
      mostFrequentMood: mostFrequentMood[0],
      mostFrequentCount: mostFrequentMood[1],
      consistency,
      firstEntry: format(new Date(sortedDates[0].date), "MMMM d, yyyy"),
      lastEntry: format(
        new Date(sortedDates[sortedDates.length - 1].date),
        "MMMM d, yyyy"
      ),
    };
  }, [moodData]);
  if (!stats) {
    return (
      <div className="text-center text-muted-foreground">
        No mood data available yet. Start logging your moods to see insights!
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-2">Overview</h3>
        <div className="space-y-2">
          <p>
            Total entries:{" "}
            <Badge variant="secondary">{stats.totalEntries}</Badge>
          </p>
          <p>
            Most frequent mood: <Badge>{stats.mostFrequentMood}</Badge> (
            {stats.mostFrequentCount} times)
          </p>
          <p>
            Tracking consistency:{" "}
            <Badge variant="outline">{stats.consistency}%</Badge>
          </p>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-medium mb-2">Timeline</h3>
        <div className="space-y-2">
          <p>
            First entry:{" "}
            <span className="text-muted-foreground">{stats.firstEntry}</span>
          </p>
          <p>
            Latest entry:{" "}
            <span className="text-muted-foreground">{stats.lastEntry}</span>
          </p>
        </div>
      </Card>
    </div>
  );
}
