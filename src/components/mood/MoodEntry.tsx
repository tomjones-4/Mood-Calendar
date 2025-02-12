import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { MoodSelector, CustomMood } from "@/components/mood/MoodSelector";
import { MoodNote } from "@/components/mood/MoodNote";
import { DayMood } from "@/pages/Index";

interface MoodEntryProps {
  selectedDate: Date;
  moodData: DayMood[];
  setMoodData: (data: DayMood[]) => void;
  customMoods: CustomMood[];
  setCustomMoods: (moods: CustomMood[]) => void;
}

export function MoodEntry({
  selectedDate,
  moodData,
  setMoodData,
  customMoods,
  setCustomMoods,
}: MoodEntryProps) {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const { toast } = useToast();
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
    <Card className="p-6">
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
  );
}
