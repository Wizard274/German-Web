export const CEFR_LEVELS = [
  { level: 'Beginner', badge: '🌱', description: 'Starting out, fundamental phrases' },
  { level: 'A1', badge: '🥉', description: 'Basic everyday expressions & simple sentences' },
  { level: 'A2', badge: '🥈', description: 'Common situations & routine communication' },
  { level: 'B1', badge: '🥇', description: 'Independent conversations & opinions' }
];

export const getLevelDetails = (levelStr) => {
  return (
    CEFR_LEVELS.find((l) => l.level === levelStr) || {
      level: levelStr || 'A1',
      badge: '🎯',
      description: 'Custom learning target'
    }
  );
};
