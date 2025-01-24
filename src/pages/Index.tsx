import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MoodCalendar } from "@/components/MoodCalendar";
import { MoodSearch } from "@/components/MoodSearch";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Plus, Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const DEFAULT_MOODS = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😡", label: "Angry" },
  { emoji: "🤩", label: "Excited" },
  { emoji: "😴", label: "Tired" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "🥰", label: "Loved" },
];

export interface CustomMood {
  emoji: string;
  label: string;
}

export interface DayMood {
  date: Date;
  mood: string;
  note?: string;
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
  const [newMoodEmoji, setNewMoodEmoji] = useState("");
  const [newMoodLabel, setNewMoodLabel] = useState("");
  const [achievements, setAchievements] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("customMoods", JSON.stringify(customMoods));
  }, [customMoods]);

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

  const handleAddCustomMood = () => {
    if (!newMoodEmoji || !newMoodLabel) {
      toast({
        title: "Please fill in both fields",
        variant: "destructive",
      });
      return;
    }
    setCustomMoods((prev) => [
      ...prev,
      { emoji: newMoodEmoji, label: newMoodLabel },
    ]);
    setNewMoodEmoji("");
    setNewMoodLabel("");
    toast({
      title: "Custom mood added!",
      description: `Added ${newMoodEmoji} ${newMoodLabel} to your moods.`,
    });
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
      // Remove any existing mood for the selected date
      const filtered = prev.filter(
        (mood) =>
          new Date(mood.date).toDateString() !== selectedDate.toDateString()
      );
      return [...filtered, newMood];
    });

    // TODO - implement persistence when saving mood

    toast({
      title: "Mood saved!",
      description: "Your mood has been recorded",
    });

    // Reset form
    setSelectedMood("");
    setNote("");
  };

  const allMoods = [...DEFAULT_MOODS, ...customMoods];

  // console.log("State for Index component:\n");
  // console.log("selectedDate = " + selectedDate + "\n");
  // console.log("selectedMood = " + selectedMood + "\n");
  // console.log("moodData = " + moodData + "\n");

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
          <h3 className="text-lg font-medium mb-4">
            Record mood for {format(selectedDate, "MMMM d, yyyy")}
          </h3>

          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm text-muted-foreground">Select Mood</h4>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Custom
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Custom Mood</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="emoji">Emoji</label>
                    <Input
                      id="emoji"
                      value={newMoodEmoji}
                      onChange={(e) => setNewMoodEmoji(e.target.value)}
                      placeholder="Enter an emoji (e.g., 🌟)"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="label">Label</label>
                    <Input
                      id="label"
                      value={newMoodLabel}
                      onChange={(e) => setNewMoodLabel(e.target.value)}
                      placeholder="Enter a label"
                    />
                  </div>
                  <Button onClick={handleAddCustomMood}>Add Mood</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {allMoods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.emoji)}
                className={`mood-emoji ${
                  selectedMood === mood.emoji
                    ? "scale-110 ring-2 ring-primary rounded-full"
                    : ""
                }`}
                aria-label={mood.label}
                aria-pressed={selectedMood === mood.emoji}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs mt-1">{mood.label}</span>
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Add a note about your day... (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mb-4"
          />

          <Button onClick={handleSave} className="w-full">
            Save Today's Mood
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Index;
