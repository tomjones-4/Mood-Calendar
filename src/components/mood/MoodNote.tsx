import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MoodNoteProps {
  note: string;
  setNote: (note: string) => void;
}

const JOURNALING_PROMPTS = [
  "How are you feeling today?",
  "What is one thing you're grateful for?",
  "How have you taken a break for yourself today?",
  "What was the highlight of your day?",
  "What's something that challenged you today?",
  "What's something you're looking forward to?",
  "How did you practice self-care today?",
  "What made you smile today?",
  "What's something you learned today?",
  "How did you show kindness to yourself or others today?",
];

export function MoodNote({ note, setNote }: MoodNoteProps) {
  const { toast } = useToast();

  const generatePrompt = () => {
    const randomIndex = Math.floor(Math.random() * JOURNALING_PROMPTS.length);
    const prompt = JOURNALING_PROMPTS[randomIndex];
    const newNote = note ? `${note}\n\n${prompt}\n` : `${prompt}\n`;
    setNote(newNote);
    toast({
      title: "New prompt generated!",
      description: "Hope this helps inspire your journaling.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label htmlFor="note" className="text-sm text-muted-foreground">
          Add a note about your day (optional)
        </label>
        <Button
          variant="outline"
          size="sm"
          onClick={generatePrompt}
          className="flex items-center gap-1"
        >
          <Sparkles className="w-4 h-4" />
          Need inspiration?
        </Button>
      </div>
      <Textarea
        id="note"
        placeholder="Add a note about your day... (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="mb-4"
      />
    </div>
  );
}
