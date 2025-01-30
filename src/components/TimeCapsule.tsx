import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { format, isAfter, isSameDay } from "date-fns";
import { Clock } from "lucide-react";

interface TimeCapsuleMessage {
  message: string;
  futureDate: Date;
  createdAt: Date;
}

export const TimeCapsule = () => {
  const [futureDate, setFutureDate] = useState<Date>();
  const [message, setMessage] = useState("");

  const [capsules, setCapsules] = useState<TimeCapsuleMessage[]>(() => {
    const saved = localStorage.getItem("timeCapsules");
    return saved
      ? JSON.parse(saved).map((c: any) => ({
          ...c,
          futureDate: new Date(c.futureDate),
          createdAt: new Date(c.createdAt),
        }))
      : [];
  });

  const { toast } = useToast();

  const handleSave = () => {
    if (!futureDate || !message) {
      toast({
        title: "Missing information",
        description: "Please select a future date and write a message.",
        variant: "destructive",
      });
      return;
    }
    if (!isAfter(futureDate, new Date())) {
      toast({
        title: "Invalid date",
        description: "Please select a date in the future.",
        variant: "destructive",
      });
      return;
    }
    const newCapsule: TimeCapsuleMessage = {
      message,
      futureDate,
      createdAt: new Date(),
    };
    setCapsules((prev) => {
      const updated = [...prev, newCapsule];
      localStorage.setItem("timeCapsules", JSON.stringify(updated));
      return updated;
    });
    toast({
      title: "Time capsule created!",
      description: `Your message will be revealed on ${format(
        futureDate,
        "MMMM d, yyyy"
      )}`,
    });
    setMessage("");
    setFutureDate(undefined);
  };

  const availableCapsules = capsules.filter(
    (capsule) =>
      isSameDay(new Date(), new Date(capsule.futureDate)) ||
      isAfter(new Date(), new Date(capsule.futureDate))
  );

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <h2 className="text-2xl font-semibold">Time Capsule</h2>
        </div>
        {availableCapsules.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              Messages from your past self:
            </h3>
            {availableCapsules.map((capsule, index) => (
              <Card key={index} className="p-4 bg-muted">
                <p className="text-sm text-muted-foreground mb-2">
                  Written on{" "}
                  {format(new Date(capsule.createdAt), "MMMM d, yyyy")}
                </p>
                <p className="whitespace-pre-wrap">{capsule.message}</p>
              </Card>
            ))}
          </div>
        )}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Create a new time capsule</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">Select future date:</label>
            <Calendar
              mode="single"
              selected={futureDate}
              onSelect={setFutureDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Write a message to your future self:
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Dear future me..."
              className="min-h-[150px]"
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            Create Time Capsule
          </Button>
        </div>
      </div>
    </Card>
  );
};
