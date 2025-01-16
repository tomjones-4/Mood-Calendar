import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Toggle between light and dark theme
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={theme === "dark"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive daily reminders to log your mood
              </p>
            </div>
            <Switch id="notifications" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
