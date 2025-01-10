import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Frown, Meh, Heart, Angry, Laugh, HeartPulse, Annoyed } from "lucide-react";
import { Mood } from "@/types/mood";
import { getMoodIcon } from "./moodUtils";

interface MoodEntryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | undefined;
  currentMood: Mood | null;
  setCurrentMood: (mood: Mood) => void;
  currentNote: string;
  setCurrentNote: (note: string) => void;
  onSave: () => void;
}

const MoodEntryDialog = ({
  isOpen,
  onOpenChange,
  selectedDate,
  currentMood,
  setCurrentMood,
  currentNote,
  setCurrentNote,
  onSave,
}: MoodEntryDialogProps) => {
  const moods: Array<{ mood: Mood; icon: React.ReactNode; label: string }> = [
    { mood: "happy", icon: <Smile />, label: "Happy" },
    { mood: "sad", icon: <Frown />, label: "Sad" },
    { mood: "neutral", icon: <Meh />, label: "Neutral" },
    { mood: "love", icon: <Heart className="text-red-500" />, label: "Love" },
    { mood: "angry", icon: <Angry className="text-red-600" />, label: "Angry" },
    { mood: "excited", icon: <Laugh className="text-yellow-500" />, label: "Excited" },
    { mood: "energetic", icon: <HeartPulse className="text-pink-500" />, label: "Energetic" },
    { mood: "annoyed", icon: <Annoyed className="text-orange-500" />, label: "Annoyed" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {selectedDate?.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">How are you feeling?</h3>
            <div className="grid grid-cols-4 gap-4">
              {moods.map(({ mood, icon, label }) => (
                <Button
                  key={mood}
                  variant={currentMood === mood ? "default" : "outline"}
                  size="icon"
                  className="w-12 h-12 relative group"
                  onClick={() => setCurrentMood(mood)}
                >
                  {icon}
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {label}
                  </span>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Add a note about your day</h3>
            <Textarea
              placeholder="Write your thoughts here..."
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
          <Button onClick={onSave} disabled={!currentMood} className="w-full">
            Save Entry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodEntryDialog;