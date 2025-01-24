import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { format } from "date-fns";
import { DayMood } from "@/pages/Index";
interface MoodSearchProps {
  moodData: DayMood[];
}
export function MoodSearch({ moodData }: MoodSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = moodData.filter((day) =>
    day.note?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Card className="p-4">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search your mood notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {searchTerm && (
        <div className="space-y-2">
          <h3 className="font-medium">
            Found {searchResults.length}{" "}
            {searchResults.length === 1 ? "entry" : "entries"}
          </h3>
          {searchResults.map((result) => (
            <Card key={result.date.toString()} className="p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(result.date), "MMMM d, yyyy")}
                  </p>
                  <p className="mt-1">{result.note}</p>
                </div>
                <span className="text-2xl">{result.mood}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
