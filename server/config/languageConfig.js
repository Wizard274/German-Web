/**
 * Language Configuration Registry — German 🇩🇪 Only
 */

export const SUPPORTED_LANGUAGES = {
  German: {
    code: 'de-DE',
    displayName: 'German',
    flag: '🇩🇪',
    locale: 'de-DE',
    ttsVoice: 'alloy',
    slowSpeedRate: 0.75,
    pronunciationSettings: {
      accent: 'Standard High German (Hochdeutsch)',
      pitch: 1.0,
      speechRate: 1.0
    }
  }
};

export const getLanguageConfig = () => {
  return SUPPORTED_LANGUAGES['German'];
};
