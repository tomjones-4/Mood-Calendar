import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MoodSelectorProps {
  selectedMood: string;
  setSelectedMood: (mood: string) => void;
  customMoods: CustomMood[];
  setCustomMoods: (moods: CustomMood[]) => void;
}

export interface CustomMood {
  emoji: string;
  label: string;
}

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

export function MoodSelector({
  selectedMood,
  setSelectedMood,
  customMoods,
  setCustomMoods,
}: MoodSelectorProps) {
  const [newMoodEmoji, setNewMoodEmoji] = useState("");
  const [newMoodLabel, setNewMoodLabel] = useState("");
  const { toast } = useToast();
  const allMoods = [...DEFAULT_MOODS, ...customMoods];

  const handleAddCustomMood = () => {
    if (!newMoodEmoji || !newMoodLabel) {
      toast({
        title: "Please fill in both fields",
        variant: "destructive",
      });
      return;
    }
    const newMood: CustomMood = { emoji: newMoodEmoji, label: newMoodLabel };
    setCustomMoods([...customMoods, newMood]);
    setNewMoodEmoji("");
    setNewMoodLabel("");
    toast({
      title: "Custom mood added!",
      description: `Added ${newMoodEmoji} ${newMoodLabel} to your moods.`,
    });
  };

  return (
    <div>
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
    </div>
  );
}
