import React from "react";
import { Smile, Frown, Meh, Heart, Angry, Laugh, HeartPulse, Annoyed } from "lucide-react";
import { Mood } from "@/types/mood";

export const getMoodIcon = (mood: Mood) => {
  switch (mood) {
    case "happy":
      return <Smile className="w-6 h-6" />;
    case "sad":
      return <Frown className="w-6 h-6" />;
    case "neutral":
      return <Meh className="w-6 h-6" />;
    case "love":
      return <Heart className="w-6 h-6 text-red-500" />;
    case "angry":
      return <Angry className="w-6 h-6 text-red-600" />;
    case "excited":
      return <Laugh className="w-6 h-6 text-yellow-500" />;
    case "energetic":
      return <HeartPulse className="w-6 h-6 text-pink-500" />;
    case "annoyed":
      return <Annoyed className="w-6 h-6 text-orange-500" />;
  }
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};