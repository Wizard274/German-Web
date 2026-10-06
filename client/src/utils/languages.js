export const LANGUAGES = [
  {
    code: 'de-DE',
    name: 'German',
    flag: '🇩🇪',
    locale: 'de-DE',
    ttsVoice: 'alloy',
    slowSpeedRate: 0.75,
    pronunciationSettings: { accent: 'Standard High German (Hochdeutsch)' }
  },
  {
    code: 'en-US',
    name: 'English',
    flag: '🇬🇧',
    locale: 'en-US',
    ttsVoice: 'echo',
    slowSpeedRate: 0.75,
    pronunciationSettings: { accent: 'Standard English' }
  }
];

export const getLanguageByCodeOrName = (val) => {
  if (!val) return LANGUAGES[0];
  const found = LANGUAGES.find(
    (l) => l.name.toLowerCase() === val.toLowerCase() || l.code.toLowerCase() === val.toLowerCase()
  );
  return (
    found || LANGUAGES[0]
  );
};
