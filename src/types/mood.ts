import { Dispatch, SetStateAction } from "react";

export type Mood = "happy" | "sad" | "neutral" | "love" | "angry" | "excited" | "energetic" | "annoyed";

export interface DayEntry {
  mood: Mood;
  note: string;
}

export interface MoodData {
  [date: string]: DayEntry;
}

export interface MoodContextProps {
  moodData: MoodData;
  setMoodData: Dispatch<SetStateAction<MoodData>>;
  currentMood: Mood | null;
  setCurrentMood: Dispatch<SetStateAction<Mood | null>>;
  currentNote: string;
  setCurrentNote: Dispatch<SetStateAction<string>>;
}