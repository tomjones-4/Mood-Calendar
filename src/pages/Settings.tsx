import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { cn } from "@/lib/utils";

const BACKGROUNDS = [
  {
    id: "forest",
    label: "Forest Sunlight",
    value:
      "bg-[url('https://images.unsplash.com/photo-1523712999610-f77fbcfc3843')]",
    preview:
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=100&h=100&fit=crop",
  },
  {
    id: "ocean",
    label: "Calm Ocean",
    value:
      "bg-[url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21')]",
    preview:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=100&h=100&fit=crop",
  },
  {
    id: "mountains",
    label: "Mountain Vista",
    value:
      "bg-[url('https://images.unsplash.com/photo-1458668383970-8ddd3927deed')]",
    preview:
      "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=100&h=100&fit=crop",
  },
  {
    id: "starry",
    label: "Starry Night",
    value:
      "bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb')]",
    preview:
      "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=100&h=100&fit=crop",
  },
];

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [background, setBackground] = useState(BACKGROUNDS[0].id);

  const handleBackgroundChange = (value: string) => {
    setBackground(value);
    const selectedBg = BACKGROUNDS.find((bg) => bg.id === value);
    if (selectedBg) {
      document.body.className = `${theme} ${selectedBg.value} bg-cover bg-fixed bg-center`;
    }
  };

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

          <div className="space-y-3">
            <Label>Background Theme</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {BACKGROUNDS.map((bg) => (
                <div key={bg.id} className="space-y-2">
                  <button
                    onClick={() => handleBackgroundChange(bg.id)}
                    className={cn(
                      "w-full aspect-square rounded-lg overflow-hidden border-2 transition-all",
                      background === bg.id
                        ? "border-primary"
                        : "border-transparent hover:border-primary/50"
                    )}
                  >
                    <img
                      src={bg.preview}
                      alt={bg.label}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <p className="text-sm text-center">{bg.label}</p>
                </div>
              ))}
            </div>
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
