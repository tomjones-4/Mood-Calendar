import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { getMoodIcon } from "./moodUtils";
import { MoodData } from "@/types/mood";

interface MoodCalendarViewProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  moodData: MoodData;
}

const MoodCalendarView = ({ selectedDate, onSelectDate, moodData }: MoodCalendarViewProps) => {
  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  return (
    <Card className="p-4 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <CalendarIcon className="w-5 h-5 text-primary" />
          Calendar View
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          className="rounded-md"
          modifiers={{
            booked: (date) => formatDate(date) in moodData,
          }}
          modifiersStyles={{
            booked: {
              fontWeight: "bold",
              color: "var(--primary)",
            },
          }}
          components={{
            DayContent: ({ date }) => {
              const dateStr = formatDate(date);
              const entry = moodData[dateStr];
              return (
                <div className="relative w-full h-full flex items-center justify-center">
                  <span>{date.getDate()}</span>
                  {entry && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      {getMoodIcon(entry.mood)}
                    </div>
                  )}
                </div>
              );
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default MoodCalendarView;