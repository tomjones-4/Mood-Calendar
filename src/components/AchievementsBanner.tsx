import { Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AchievementsBannerProps {
  achievements: string[];
}

export function AchievementsBanner({ achievements }: AchievementsBannerProps) {
  if (!achievements.length) return null;
  return (
    <div className="flex gap-2">
      {achievements.map((achievement) => (
        <Badge
          key={achievement}
          variant="secondary"
          className="flex items-center gap-1"
        >
          <Award className="w-4 h-4" />
          {achievement}
        </Badge>
      ))}
    </div>
  );
}
