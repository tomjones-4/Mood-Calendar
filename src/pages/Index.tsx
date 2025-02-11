import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MoodCalendar } from "@/components/mood/MoodCalendar";
import { format } from "date-fns";
import { Star, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DailyAffirmation } from "@/components/DailyAffirmation";
import { MoodSearch } from "@/components/mood/MoodSearch";
import { MoodSelector, CustomMood } from "@/components/mood/MoodSelector";
import { MoodNote } from "@/components/mood/MoodNote";

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
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [moodData, setMoodData] = useState<DayMood[]>([]);
  const [customMoods, setCustomMoods] = useState<CustomMood[]>(() => {
    const saved = localStorage.getItem("customMoods");
    return saved ? JSON.parse(saved) : [];
  });
  const [achievements, setAchievements] = useState<string[]>([]);
  const { toast } = useToast();

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

    if (monthEntries.length >= 30 && !achievements.includes("Monthly Master")) {
      setAchievements((prev) => [...prev, "Monthly Master"]);
      toast({
        title: "Achievement Unlocked! 🏆",
        description: "Monthly Master: Logged moods for 30 days!",
      });
    }

    if (monthEntries.length >= 7 && !achievements.includes("Week Warrior")) {
      setAchievements((prev) => [...prev, "Week Warrior"]);
      toast({
        title: "Achievement Unlocked! 🏆",
        description: "Week Warrior: Logged moods for 7 consecutive days!",
      });
    }
  };

  const handleSave = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        variant: "destructive",
      });
      return;
    }

    const newMood: DayMood = {
      date: selectedDate,
      mood: selectedMood,
      note: note || undefined,
    };

    setMoodData((prev) => {
      const filtered = prev.filter(
        (mood) =>
          new Date(mood.date).toDateString() !== selectedDate.toDateString()
      );
      return [...filtered, newMood];
    });

    toast({
      title: "Mood saved!",
      description: "Your mood has been recorded.",
    });

    setSelectedMood("");
    setNote("");
  };

  const toggleFavorite = () => {
    setMoodData((prev) => {
      const newMoodData = prev.map((mood) =>
        format(mood.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
          ? { ...mood, favorite: !mood.favorite }
          : mood
      );
      return newMoodData;
    });

    toast({
      title: "Favorite updated",
      description: "Your favorite days collection has been updated.",
    });
  };

  const isFavorite = moodData.find(
    (mood) =>
      format(mood.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  )?.favorite;

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">How are you feeling today?</h1>
        {achievements.length > 0 && (
          <div className="flex gap-2">
            {achievements.map((achievement) => (
              <Badge
                key={achievement}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <Award className="w-4 h-4" />
                {achievement}
              </Badge>
            ))}
          </div>
        )}
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

        <Card className="p-6 order-1 md:order-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              Record mood for {format(selectedDate, "MMMM d, yyyy")}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFavorite}
              className={`${
                isFavorite ? "text-yellow-500" : "text-muted-foreground"
              }`}
              disabled={
                !moodData.some(
                  (mood) =>
                    format(mood.date, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd")
                )
              }
            >
              <Star className="h-5 w-5" />
            </Button>
          </div>

          <MoodSelector
            selectedMood={selectedMood}
            setSelectedMood={setSelectedMood}
            customMoods={customMoods}
            setCustomMoods={setCustomMoods}
          />

          <MoodNote note={note} setNote={setNote} />

          <Button onClick={handleSave} className="w-full">
            Save Mood
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Index;
