import React, { useState } from "react";
import { toast } from "sonner";
import MoodHeader from "./mood/MoodHeader";
import MoodCalendarView from "./mood/MoodCalendarView";
import MoodOverview from "./mood/MoodOverview";
import MoodEntryDialog from "./mood/MoodEntryDialog";
import { formatDate } from "./mood/moodUtils";
import { MoodData, Mood } from "@/types/mood";

const MoodCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [moodData, setMoodData] = useState<MoodData>({});
  const [currentNote, setCurrentNote] = useState("");
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);

  const handleDayClick = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    const dateStr = formatDate(date);
    const existingEntry = moodData[dateStr];
    
    if (existingEntry) {
      setCurrentMood(existingEntry.mood);
      setCurrentNote(existingEntry.note);
    } else {
      setCurrentMood(null);
      setCurrentNote("");
    }
    
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!selectedDate || !currentMood) return;

    const dateStr = formatDate(selectedDate);
    setMoodData((prev) => ({
      ...prev,
      [dateStr]: {
        mood: currentMood,
        note: currentNote,
      },
    }));

    toast("Mood saved successfully!");
    setIsDialogOpen(false);
  };

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        <MoodHeader />
        <div className="grid md:grid-cols-2 gap-6">
          <MoodCalendarView
            selectedDate={selectedDate}
            onSelectDate={handleDayClick}
            moodData={moodData}
          />
          <MoodOverview />
        </div>
      </div>

      <MoodEntryDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedDate={selectedDate}
        currentMood={currentMood}
        setCurrentMood={setCurrentMood}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
        onSave={handleSave}
      />
    </div>
  );
};

export default MoodCalendar;