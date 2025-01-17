import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MoodCalendar } from "@/components/MoodCalendar";
import { format } from "date-fns";

const MOODS = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😡", label: "Angry" },
  { emoji: "🤩", label: "Excited" },
  { emoji: "😴", label: "Tired" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "🥰", label: "Loved" },
];

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

  console.log("State for Index component:\n");
  console.log("selectedDate = " + selectedDate + "\n");
  console.log("selectedMood = " + selectedMood + "\n");
  console.log("moodData = " + moodData + "\n");

  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">How are you feeling today?</h1>

      <div className="grid gap-8 md:grid-cols-[1fr,400px]">
        <Card className="p-6 order-2 md:order-1">
          <h2 className="text-2xl font-semibold mb-4">Your Mood Calendar</h2>
          <MoodCalendar
            moodData={moodData}
            setMoodData={setMoodData}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Card>

        <Card className="p-6 order-1 md:order-2">
          <h3 className="text-lg font-medium mb-4">
            Record mood for {format(selectedDate, "MMMM d, yyyy")}
          </h3>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {MOODS.map((mood) => (
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
                {mood.emoji}
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
