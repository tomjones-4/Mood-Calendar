import { useMemo } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { DayMood } from "@/pages/Index";
interface MoodTrendsProps {
  moodData: DayMood[];
}
const MOOD_VALUES: Record<string, number> = {
  "😊": 5, // Happy
  "😢": 1, // Sad
  "😐": 3, // Neutral
  "😡": 1, // Angry
  "🤩": 5, // Excited
  "😴": 2, // Tired
  "😰": 2, // Anxious
  "🥰": 5, // Loved
};
export function MoodTrends({ moodData }: MoodTrendsProps) {
  const chartData = useMemo(() => {
    const currentDate = new Date();
    const firstDay = startOfMonth(currentDate);
    const lastDay = endOfMonth(currentDate);

    const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });

    return daysInMonth.map((date) => {
      const mood = moodData.find(
        (m) =>
          format(new Date(m.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      );

      return {
        date: format(date, "MMM d"),
        value: mood ? MOOD_VALUES[mood.mood] || 3 : null,
        mood: mood?.mood || null,
      };
    });
  }, [moodData]);
  return (
    <div className="w-full h-[400px]">
      <ChartContainer
        config={{
          line: {
            theme: {
              light: "hsl(var(--primary))",
              dark: "hsl(var(--primary))",
            },
          },
        }}
      >
        <LineChart data={chartData}>
          <XAxis dataKey="date" interval={6} tick={{ fontSize: 12 }} />
          <YAxis
            domain={[0, 6]}
            ticks={[1, 2, 3, 4, 5]}
            tick={{ fontSize: 12 }}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const data = payload[0].payload;
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">{data.date}</span>
                    {data.mood && (
                      <span className="text-right">{data.mood}</span>
                    )}
                  </div>
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={2}
            dot={{ strokeWidth: 2 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
