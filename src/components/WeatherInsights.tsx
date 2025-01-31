import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DayMood } from "@/pages/Index";
import { Cloud, Sun, CloudRain } from "lucide-react";

interface WeatherInsightsProps {
  moodData: DayMood[];
}
export function WeatherInsights({ moodData }: WeatherInsightsProps) {
  const weatherAnalysis = useMemo(() => {
    const weatherMoods: Record<
      string,
      { count: number; totalMoodValue: number }
    > = {};

    moodData.forEach((day) => {
      if (day.weather) {
        if (!weatherMoods[day.weather.conditions]) {
          weatherMoods[day.weather.conditions] = {
            count: 0,
            totalMoodValue: 0,
          };
        }

        weatherMoods[day.weather.conditions].count++;
        weatherMoods[day.weather.conditions].totalMoodValue += moodValue;
      }
    });

    return Object.entries(weatherMoods).map(([condition, data]) => ({
      condition,
      averageMood: data.totalMoodValue / data.count,
      count: data.count,
    }));
  }, [moodData]);
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case "rain":
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };
  if (!weatherAnalysis.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weather Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No weather data available yet. Start logging your moods to see how
            weather affects your mood!
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weatherAnalysis.map(({ condition, averageMood, count }) => (
            <div
              key={condition}
              className="flex items-center justify-between p-2 rounded-lg bg-accent/50"
            >
              <div className="flex items-center gap-2">
                {getWeatherIcon(condition)}
                <span className="font-medium">{condition}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Average mood: {averageMood.toFixed(1)} ({count} entries)
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
