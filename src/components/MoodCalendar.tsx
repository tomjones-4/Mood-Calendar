import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DayMood } from "../pages/Index";

interface DayProps {
  date: Date;
  displayMonth: Date;
  className?: string;
}

interface MoodCalendarProps {
  moodData: DayMood[];
  setMoodData: (data: DayMood[]) => void;
}

export function MoodCalendar({ moodData, setMoodData }: MoodCalendarProps) {
  const getMoodForDate = (date: Date) => {
    return moodData.find(
      (data) => format(data.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  const modifiers = {
    mood: (date: Date) => getMoodForDate(date) !== undefined,
  };

  const modifiersStyles = {
    mood: {
      color: "var(--primary)",
      fontWeight: "bold",
    },
  };

  return (
    <div className="p-4">
      <Calendar
        mode="single"
        selected={new Date()}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        className="rounded-md border shadow-sm w-full max-w-[600px] mx-auto"
        classNames={{
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary/90",
          day: "h-14 w-14 p-0 font-normal aria-selected:opacity-100",
          cell: "h-14 w-14 p-0 relative",
          head_cell: "text-muted-foreground font-normal text-sm w-14",
          nav_button: "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          row: "flex w-full mt-2",
        }}
        components={{
          Day: ({ date, className, ...props }: DayProps) => {
            const mood = getMoodForDate(date);
            return (
              <button
                {...props}
                className={cn(
                  "calendar-day h-14 w-14",
                  mood && "hover:bg-primary/20",
                  className
                )}
              >
                <div className="relative flex flex-col items-center justify-center h-full">
                  <span className="text-sm mb-1">{format(date, "d")}</span>
                  {mood && (
                    <span
                      className="text-lg transform scale-110 transition-transform hover:scale-125"
                      style={{ lineHeight: 1 }}
                    >
                      {mood.mood}
                    </span>
                  )}
                </div>
              </button>
            );
          },
        }}
      />
    </div>
  );
}
