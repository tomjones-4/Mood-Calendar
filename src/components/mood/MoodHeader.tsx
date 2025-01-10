import React from "react";

const MoodHeader = () => {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
        Mood Journal
      </h1>
      <p className="text-muted-foreground">Track your daily emotions and reflections</p>
    </div>
  );
};

export default MoodHeader;