import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { MoodCalendar } from "@/components/mood/MoodCalendar";
import { MoodSearch } from "@/components/mood/MoodSearch";
import { CustomMood } from "@/components/mood/MoodSelector";
import { DailyAffirmation } from "@/components/DailyAffirmation";
import { MoodEntry } from "@/components/mood/MoodEntry";
import { AchievementsBanner } from "@/components/AchievementsBanner";

export interface DayMood {
  date: Date;
  mood: string;
  note?: string;
  favorite?: boolean;
  weather?: {
    description: string;
    temperature: number;
    conditions: string;
  };
  location?: {
    city: string;
    country: string;
  };
}

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [moodData, setMoodData] = useState<DayMood[]>([]);
  const [customMoods, setCustomMoods] = useState<CustomMood[]>(() => {
    const saved = localStorage.getItem("customMoods");
    return saved ? JSON.parse(saved) : [];
  });
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    const savedMoodData = localStorage.getItem("moodData");
    if (savedMoodData) {
      setMoodData(
        JSON.parse(savedMoodData).map((item: any) => ({
          ...item,
          date: new Date(item.date),
        }))
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("moodData", JSON.stringify(moodData));
  }, [moodData]);

  useEffect(() => {
    checkAchievements();
  }, [moodData]);

  const checkAchievements = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthEntries = moodData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getMonth() === currentMonth &&
        entryDate.getFullYear() === currentYear
      );
    });

    const newAchievements: string[] = [];

    if (monthEntries.length >= 30 && !achievements.includes("Monthly Master")) {
      newAchievements.push("Monthly Master");
    }

    if (monthEntries.length >= 7 && !achievements.includes("Week Warrior")) {
      newAchievements.push("Week Warrior");
    }

    if (newAchievements.length > 0) {
      setAchievements((prev) => [...prev, ...newAchievements]);
    }
  };

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">How are you feeling today?</h1>
        <AchievementsBanner achievements={achievements} />
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr,400px]">
        <div className="space-y-8 order-2 md:order-1">
          <DailyAffirmation />
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Mood Calendar</h2>
            <MoodCalendar
              moodData={moodData}
              setMoodData={setMoodData}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </Card>

          <MoodSearch moodData={moodData} />
        </div>
        <div className="order-1 md:order-2">
          <MoodEntry
            selectedDate={selectedDate}
            moodData={moodData}
            setMoodData={setMoodData}
            customMoods={customMoods}
            setCustomMoods={setCustomMoods}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
