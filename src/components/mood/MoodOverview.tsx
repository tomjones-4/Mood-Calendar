import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMoodIcon } from "./moodUtils";
import { Mood } from "@/types/mood";

const MoodOverview = () => {
  const moodPreview: Array<{ mood: Mood; label: string }> = [
    { mood: "happy", label: "Happy" },
    { mood: "excited", label: "Excited" },
    { mood: "love", label: "Love" },
    { mood: "energetic", label: "Energetic" },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Today's Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Click on any date to record your mood and thoughts for the day. Your entries will be displayed with emojis on the calendar.
          </p>
          <div className="grid grid-cols-4 gap-2">
            {moodPreview.map(({ mood, label }) => (
              <div key={mood} className="text-center p-2 rounded-lg bg-secondary">
                <div className="mb-1">{getMoodIcon(mood)}</div>
                <span className="text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodOverview;