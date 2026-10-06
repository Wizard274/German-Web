import OpenAI from 'openai';
import { getLessonSystemPrompt, getLessonUserPrompt } from '../prompts/lessonPrompts.js';
import { parseCleanJson } from '../utils/jsonParser.js';

let openaiClient = null;

const getOpenAIClient = () => {
  if (!openaiClient && process.env.OPENAI_API_KEY) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return openaiClient;
};

/**
 * Intelligent Dynamic German 🇩🇪 Topic Generator for A1, A2 & B1
 * Beginner/A1: Single words & short 1-3 word direct vocabulary terms
 * A2/B1: Short practical terms & expressions
 */
const generateDynamicTopicLesson = ({ topic, targetLanguage = 'German', level = 'A1' }) => {
  const cleanTopic = (topic || 'Begrüßungen & Basics').trim();
  const lowerTopic = cleanTopic.toLowerCase();

  // 1. MONTHS
  if (lowerTopic.includes('month') || lowerTopic.includes('monat') || lowerTopic.includes('january')) {
    return {
      topic: 'Monate (Months)',
      level,
      targetLanguage: 'German',
      sentences: [
        { id: 1, targetLanguageText: 'Der Januar', englishText: 'January', notes: 'Month 1' },
        { id: 2, targetLanguageText: 'Der Februar', englishText: 'February', notes: 'Month 2' },
        { id: 3, targetLanguageText: 'Der März', englishText: 'March', notes: 'Month 3' },
        { id: 4, targetLanguageText: 'Der April', englishText: 'April', notes: 'Month 4' },
        { id: 5, targetLanguageText: 'Der Mai', englishText: 'May', notes: 'Month 5' },
        { id: 6, targetLanguageText: 'Der Juni', englishText: 'June', notes: 'Month 6' },
        { id: 7, targetLanguageText: 'Der Juli', englishText: 'July', notes: 'Month 7' },
        { id: 8, targetLanguageText: 'Der August', englishText: 'August', notes: 'Month 8' },
        { id: 9, targetLanguageText: 'Der September', englishText: 'September', notes: 'Month 9' },
        { id: 10, targetLanguageText: 'Der Oktober', englishText: 'October', notes: 'Month 10' },
        { id: 11, targetLanguageText: 'Der November', englishText: 'November', notes: 'Month 11' },
        { id: 12, targetLanguageText: 'Der Dezember', englishText: 'December', notes: 'Month 12' }
      ],
      vocabulary: [
        { word: 'der Monat', translation: 'the month', pronunciation: 'MOH-nat', example: 'Der Januar ist der erste Monat.' },
        { word: 'das Jahr', translation: 'the year', pronunciation: 'YAHR', example: 'Ein Jahr hat 12 Monate.' }
      ],
      grammar: [
        { concept: 'Preposition "im" with Months', explanation: 'Use "im" (in + dem) when referring to a month: im Januar, im Mai, im Dezember.', example: 'Im Januar schneit es.' }
      ],
      quiz: [
        { id: 1, type: 'multiple_choice', question: 'What does "Der März" mean?', options: ['May', 'March', 'June', 'April'], correctAnswer: 'March', explanation: 'März is March.' },
        { id: 2, type: 'fill_in_the_blank', question: 'Der erste Monat im Jahr ist der ___.', options: ['Januar', 'Mai', 'Dezember'], correctAnswer: 'Januar', explanation: 'Januar is January.' },
        { id: 3, type: 'listening', question: 'Which word did you hear?', options: ['Der Januar', 'Der Mai', 'Der Dezember'], correctAnswer: 'Der Januar', explanation: 'Item #1' }
      ]
    };
  }

  // 2. WEEK DAYS
  if (lowerTopic.includes('week') || lowerTopic.includes('day') || lowerTopic.includes('woche') || lowerTopic.includes('wochentag')) {
    return {
      topic: 'Wochentage (Week Days)',
      level,
      targetLanguage: 'German',
      sentences: [
        { id: 1, targetLanguageText: 'Der Montag', englishText: 'Monday', notes: 'Day 1' },
        { id: 2, targetLanguageText: 'Der Dienstag', englishText: 'Tuesday', notes: 'Day 2' },
        { id: 3, targetLanguageText: 'Der Mittwoch', englishText: 'Wednesday', notes: 'Day 3' },
        { id: 4, targetLanguageText: 'Der Donnerstag', englishText: 'Thursday', notes: 'Day 4' },
        { id: 5, targetLanguageText: 'Der Freitag', englishText: 'Friday', notes: 'Day 5' },
        { id: 6, targetLanguageText: 'Der Samstag', englishText: 'Saturday', notes: 'Day 6' },
        { id: 7, targetLanguageText: 'Der Sonntag', englishText: 'Sunday', notes: 'Day 7' },
        { id: 8, targetLanguageText: 'Das Wochenende', englishText: 'The Weekend', notes: 'Saturday & Sunday' }
      ],
      vocabulary: [
        { word: 'der Wochentag', translation: 'weekday', pronunciation: 'VO-chen-tahk', example: 'Welcher Wochentag ist heute?' },
        { word: 'das Wochenende', translation: 'weekend', pronunciation: 'VO-chen-en-de', example: 'Schönes Wochenende!' }
      ],
      grammar: [
        { concept: 'Preposition "am" with Days', explanation: 'Use "am" (on) for days of the week: am Montag, am Freitag.', example: 'Am Montag lerne ich Deutsch.' }
      ],
      quiz: [
        { id: 1, type: 'multiple_choice', question: 'What does "Der Freitag" mean?', options: ['Thursday', 'Friday', 'Saturday', 'Sunday'], correctAnswer: 'Friday', explanation: 'Freitag is Friday.' }
      ]
    };
  }

  // 3. FAMILY MEMBERS
  if (lowerTopic.includes('family') || lowerTopic.includes('familie') || lowerTopic.includes('father') || lowerTopic.includes('mother')) {
    return {
      topic: 'Familienmitglieder (Family Members)',
      level,
      targetLanguage: 'German',
      sentences: [
        { id: 1, targetLanguageText: 'Der Vater', englishText: 'Father / Dad', notes: 'Masculine' },
        { id: 2, targetLanguageText: 'Die Mutter', englishText: 'Mother / Mom', notes: 'Feminine' },
        { id: 3, targetLanguageText: 'Der Sohn', englishText: 'Son', notes: 'Masculine' },
        { id: 4, targetLanguageText: 'Die Tochter', englishText: 'Daughter', notes: 'Feminine' },
        { id: 5, targetLanguageText: 'Der Bruder', englishText: 'Brother', notes: 'Masculine' },
        { id: 6, targetLanguageText: 'Die Schwester', englishText: 'Sister', notes: 'Feminine' },
        { id: 7, targetLanguageText: 'Die Großeltern', englishText: 'Grandparents', notes: 'Plural' },
        { id: 8, targetLanguageText: 'Die Familie', englishText: 'Family', notes: 'Feminine' }
      ],
      vocabulary: [
        { word: 'der Vater', translation: 'father', pronunciation: 'FAH-ter', example: 'Mein Vater ist freundlich.' },
        { word: 'die Mutter', translation: 'mother', pronunciation: 'MOOT-ter', example: 'Meine Mutter kocht gut.' }
      ],
      grammar: [
        { concept: 'Gendered Articles (der, die, das)', explanation: 'Masculine nouns use "der" (der Vater), feminine nouns use "die" (die Mutter).', example: 'Der Vater, Die Mutter.' }
      ],
      quiz: [
        { id: 1, type: 'multiple_choice', question: 'What does "Die Mutter" mean?', options: ['Father', 'Mother', 'Sister', 'Daughter'], correctAnswer: 'Mother', explanation: 'Mutter is mother.' }
      ]
    };
  }

  // 4. JOBS & PROFESSIONS
  if (lowerTopic.includes('job') || lowerTopic.includes('beruf') || lowerTopic.includes('work') || lowerTopic.includes('career')) {
    return {
      topic: 'Berufe (Jobs & Professions)',
      level,
      targetLanguage: 'German',
      sentences: [
        { id: 1, targetLanguageText: 'Der Arzt', englishText: 'Doctor (male)', notes: 'Profession' },
        { id: 2, targetLanguageText: 'Die Ärztin', englishText: 'Doctor (female)', notes: 'Profession' },
        { id: 3, targetLanguageText: 'Der Lehrer', englishText: 'Teacher (male)', notes: 'Profession' },
        { id: 4, targetLanguageText: 'Die Lehrerin', englishText: 'Teacher (female)', notes: 'Profession' },
        { id: 5, targetLanguageText: 'Der Entwickler', englishText: 'Software Developer', notes: 'Profession' },
        { id: 6, targetLanguageText: 'Der Koch', englishText: 'Chef / Cook', notes: 'Profession' },
        { id: 7, targetLanguageText: 'Der Ingenieur', englishText: 'Engineer', notes: 'Profession' },
        { id: 8, targetLanguageText: 'Der Polizist', englishText: 'Police Officer', notes: 'Profession' }
      ],
      vocabulary: [
        { word: 'der Beruf', translation: 'job / profession', pronunciation: 'be-ROOF', example: 'Was ist dein Beruf?' },
        { word: 'der Arzt', translation: 'doctor', pronunciation: 'ARTST', example: 'Der Arzt hilft.' }
      ],
      grammar: [
        { concept: 'Female Job Titles (-in)', explanation: 'Add "-in" suffix to make male job titles feminine in German.', example: 'Der Lehrer → Die Lehrerin.' }
      ],
      quiz: [
        { id: 1, type: 'multiple_choice', question: 'What does "Der Arzt" mean?', options: ['Teacher', 'Doctor', 'Chef', 'Engineer'], correctAnswer: 'Doctor', explanation: 'Arzt is doctor.' }
      ]
    };
  }

  // 5. NUMBERS
  if (lowerTopic.includes('number') || lowerTopic.includes('zahl') || lowerTopic.includes('count')) {
    return {
      topic: 'Zahlen (Numbers)',
      level,
      targetLanguage: 'German',
      sentences: [
        { id: 1, targetLanguageText: 'Eins (1)', englishText: 'One', notes: 'Number 1' },
        { id: 2, targetLanguageText: 'Zwei (2)', englishText: 'Two', notes: 'Number 2' },
        { id: 3, targetLanguageText: 'Drei (3)', englishText: 'Three', notes: 'Number 3' },
        { id: 4, targetLanguageText: 'Vier (4)', englishText: 'Four', notes: 'Number 4' },
        { id: 5, targetLanguageText: 'Fünf (5)', englishText: 'Five', notes: 'Number 5' },
        { id: 6, targetLanguageText: 'Sechs (6)', englishText: 'Six', notes: 'Number 6' },
        { id: 7, targetLanguageText: 'Sieben (7)', englishText: 'Seven', notes: 'Number 7' },
        { id: 8, targetLanguageText: 'Acht (8)', englishText: 'Eight', notes: 'Number 8' },
        { id: 9, targetLanguageText: 'Neun (9)', englishText: 'Nine', notes: 'Number 9' },
        { id: 10, targetLanguageText: 'Zehn (10)', englishText: 'Ten', notes: 'Number 10' }
      ],
      vocabulary: [
        { word: 'die Zahl', translation: 'number', pronunciation: 'TSAHL', example: 'Eins ist eine Zahl.' }
      ],
      grammar: [
        { concept: 'German Numbers 1-10', explanation: 'Cardinal counting numbers in German.', example: 'eins, zwei, drei.' }
      ],
      quiz: [
        { id: 1, type: 'multiple_choice', question: 'What is "Drei"?', options: ['1', '2', '3', '4'], correctAnswer: '3', explanation: 'Drei is 3.' }
      ]
    };
  }

  // 6. COLORS
  if (lowerTopic.includes('color') || lowerTopic.includes('farbe') || lowerTopic.includes('red') || lowerTopic.includes('blue')) {
    return {
      topic: 'Farben (Colors)',
      level,
      targetLanguage: 'German',
      sentences: [
        { id: 1, targetLanguageText: 'Rot', englishText: 'Red', notes: 'Color' },
        { id: 2, targetLanguageText: 'Blau', englishText: 'Blue', notes: 'Color' },
        { id: 3, targetLanguageText: 'Grün', englishText: 'Green', notes: 'Color' },
        { id: 4, targetLanguageText: 'Gelb', englishText: 'Yellow', notes: 'Color' },
        { id: 5, targetLanguageText: 'Schwarz', englishText: 'Black', notes: 'Color' },
        { id: 6, targetLanguageText: 'Weiß', englishText: 'White', notes: 'Color' },
        { id: 7, targetLanguageText: 'Grau', englishText: 'Gray', notes: 'Color' },
        { id: 8, targetLanguageText: 'Braun', englishText: 'Brown', notes: 'Color' }
      ],
      vocabulary: [
        { word: 'die Farbe', translation: 'color', pronunciation: 'FAR-be', example: 'Welche Farbe ist das?' }
      ],
      grammar: [
        { concept: 'Basic Colors in German', explanation: 'Adjectives for describing colors.', example: 'rot, blau, grün.' }
      ],
      quiz: [
        { id: 1, type: 'multiple_choice', question: 'What is "Blau"?', options: ['Red', 'Blue', 'Green', 'Yellow'], correctAnswer: 'Blue', explanation: 'Blau is blue.' }
      ]
    };
  }

  // 7. FOOD & DRINKS
  if (lowerTopic.includes('food') || lowerTopic.includes('drink') || lowerTopic.includes('essen') || lowerTopic.includes('trinken')) {
    return {
      topic: 'Essen & Trinken (Food & Drinks)',
      level,
      targetLanguage: 'German',
      sentences: [
        { id: 1, targetLanguageText: 'Der Apfel', englishText: 'Apple', notes: 'Fruit' },
        { id: 2, targetLanguageText: 'Das Brot', englishText: 'Bread', notes: 'Bakery' },
        { id: 3, targetLanguageText: 'Die Milch', englishText: 'Milk', notes: 'Drink' },
        { id: 4, targetLanguageText: 'Das Wasser', englishText: 'Water', notes: 'Drink' },
        { id: 5, targetLanguageText: 'Der Kaffee', englishText: 'Coffee', notes: 'Hot Drink' },
        { id: 6, targetLanguageText: 'Der Tee', englishText: 'Tea', notes: 'Hot Drink' },
        { id: 7, targetLanguageText: 'Der Käse', englishText: 'Cheese', notes: 'Dairy' },
        { id: 8, targetLanguageText: 'Die Pizza', englishText: 'Pizza', notes: 'Meal' }
      ],
      vocabulary: [
        { word: 'das Essen', translation: 'food', pronunciation: 'ES-sen', example: 'Das Essen schmeckt gut.' },
        { word: 'das Trinken', translation: 'drink', pronunciation: 'TRING-ken', example: 'Ich möchte ein Trinken.' }
      ],
      grammar: [
        { concept: 'Articles with Food & Beverages', explanation: 'Every food item has a specific article (Der Apfel, Das Brot, Die Milch).', example: 'Der Apfel, Die Milch.' }
      ],
      quiz: [
        { id: 1, type: 'multiple_choice', question: 'What does "Das Wasser" mean?', options: ['Milk', 'Water', 'Coffee', 'Tea'], correctAnswer: 'Water', explanation: 'Wasser is water.' }
      ]
    };
  }

  // 8. SHOPPING
  if (lowerTopic.includes('shop') || lowerTopic.includes('einkauf') || lowerTopic.includes('buy') || lowerTopic.includes('price')) {
    return {
      topic: 'Einkaufen (Shopping)',
      level,
      targetLanguage: 'German',
      sentences: [
        { id: 1, targetLanguageText: 'Das Geld', englishText: 'Money', notes: 'Finance' },
        { id: 2, targetLanguageText: 'Der Preis', englishText: 'Price', notes: 'Cost' },
        { id: 3, targetLanguageText: 'Der Supermarkt', englishText: 'Supermarket', notes: 'Store' },
        { id: 4, targetLanguageText: 'Die Tasche', englishText: 'Bag / Purse', notes: 'Item' },
        { id: 5, targetLanguageText: 'Kaufen', englishText: 'To buy', notes: 'Verb' },
        { id: 6, targetLanguageText: 'Bezahlen', englishText: 'To pay', notes: 'Verb' },
        { id: 7, targetLanguageText: 'Teuer', englishText: 'Expensive', notes: 'Adjective' },
        { id: 8, targetLanguageText: 'Billig', englishText: 'Cheap', notes: 'Adjective' }
      ],
      vocabulary: [
        { word: 'einkaufen', translation: 'to shop', pronunciation: 'AYN-kau-fen', example: 'Ich gehe einkaufen.' }
      ],
      grammar: [
        { concept: 'Separable Verb "einkaufen"', explanation: '"Einkaufen" separates in sentences: Ich kaufe heute ein.', example: 'Ich kaufe im Supermarkt ein.' }
      ],
      quiz: [
        { id: 1, type: 'multiple_choice', question: 'What does "Teuer" mean?', options: ['Cheap', 'Expensive', 'Free', 'Large'], correctAnswer: 'Expensive', explanation: 'Teuer means expensive.' }
      ]
    };
  }

  // 9. HEALTH & BODY
  if (lowerTopic.includes('health') || lowerTopic.includes('body') || lowerTopic.includes('gesundheit') || lowerTopic.includes('körper')) {
    return {
      topic: 'Gesundheit & Körper (Health & Body)',
      level,
      targetLanguage: 'German',
      sentences: [
        { id: 1, targetLanguageText: 'Der Kopf', englishText: 'Head', notes: 'Body Part' },
        { id: 2, targetLanguageText: 'Das Auge', englishText: 'Eye', notes: 'Body Part' },
        { id: 3, targetLanguageText: 'Der Mund', englishText: 'Mouth', notes: 'Body Part' },
        { id: 4, targetLanguageText: 'Der Arm', englishText: 'Arm', notes: 'Body Part' },
        { id: 5, targetLanguageText: 'Das Bein', englishText: 'Leg', notes: 'Body Part' },
        { id: 6, targetLanguageText: 'Gesundheit', englishText: 'Health / Bless you', notes: 'Expression' },
        { id: 7, targetLanguageText: 'Krank', englishText: 'Sick', notes: 'Adjective' },
        { id: 8, targetLanguageText: 'Das Krankenhaus', englishText: 'Hospital', notes: 'Place' }
      ],
      vocabulary: [
        { word: 'der Körper', translation: 'body', pronunciation: 'KER-per', example: 'Der Körper ist gesund.' }
      ],
      grammar: [
        { concept: 'Expressing pain with "weh tun"', explanation: 'Use "tut weh" (hurts): Mein Kopf tut weh.', example: 'Mein Arm tut weh.' }
      ],
      quiz: [
        { id: 1, type: 'multiple_choice', question: 'What does "Der Kopf" mean?', options: ['Leg', 'Arm', 'Head', 'Eye'], correctAnswer: 'Head', explanation: 'Kopf means head.' }
      ]
    };
  }

  // 10. TRAVEL & TRANSPORT
  if (lowerTopic.includes('travel') || lowerTopic.includes('transport') || lowerTopic.includes('reisen') || lowerTopic.includes('zug') || lowerTopic.includes('car')) {
    return {
      topic: 'Reisen & Transport (Travel & Transport)',
      level,
      targetLanguage: 'German',
      sentences: [
        { id: 1, targetLanguageText: 'Der Zug', englishText: 'Train', notes: 'Vehicle' },
        { id: 2, targetLanguageText: 'Das Auto', englishText: 'Car', notes: 'Vehicle' },
        { id: 3, targetLanguageText: 'Der Bus', englishText: 'Bus', notes: 'Vehicle' },
        { id: 4, targetLanguageText: 'Das Flugzeug', englishText: 'Airplane', notes: 'Vehicle' },
        { id: 5, targetLanguageText: 'Der Bahnhof', englishText: 'Train Station', notes: 'Location' },
        { id: 6, targetLanguageText: 'Der Flughafen', englishText: 'Airport', notes: 'Location' },
        { id: 7, targetLanguageText: 'Das Ticket', englishText: 'Ticket', notes: 'Item' },
        { id: 8, targetLanguageText: 'Die Reise', englishText: 'Journey / Trip', notes: 'Noun' }
      ],
      vocabulary: [
        { word: 'reisen', translation: 'to travel', pronunciation: 'RAY-zen', example: 'Ich reise nach Deutschland.' }
      ],
      grammar: [
        { concept: 'Prepositions "mit" (with/by)', explanation: '"Mit" takes dative: mit dem Zug, mit dem Auto.', example: 'Ich fahre mit dem Bus.' }
      ],
      quiz: [
        { id: 1, type: 'multiple_choice', question: 'What does "Der Zug" mean?', options: ['Car', 'Train', 'Bus', 'Plane'], correctAnswer: 'Train', explanation: 'Zug means train.' }
      ]
    };
  }

  // 11. WEATHER & SEASONS
  if (lowerTopic.includes('weather') || lowerTopic.includes('wetter') || lowerTopic.includes('sun') || lowerTopic.includes('rain')) {
    return {
      topic: 'Wetter & Jahreszeiten (Weather & Seasons)',
      level,
      targetLanguage: 'German',
      sentences: [
        { id: 1, targetLanguageText: 'Die Sonne', englishText: 'Sun', notes: 'Weather' },
        { id: 2, targetLanguageText: 'Der Regen', englishText: 'Rain', notes: 'Weather' },
        { id: 3, targetLanguageText: 'Der Schnee', englishText: 'Snow', notes: 'Weather' },
        { id: 4, targetLanguageText: 'Der Wind', englishText: 'Wind', notes: 'Weather' },
        { id: 5, targetLanguageText: 'Der Sommer', englishText: 'Summer', notes: 'Season' },
        { id: 6, targetLanguageText: 'Der Winter', englishText: 'Winter', notes: 'Season' },
        { id: 7, targetLanguageText: 'Der Frühling', englishText: 'Spring', notes: 'Season' },
        { id: 8, targetLanguageText: 'Der Herbst', englishText: 'Autumn / Fall', notes: 'Season' }
      ],
      vocabulary: [
        { word: 'das Wetter', translation: 'weather', pronunciation: 'VET-ter', example: 'Wie ist das Wetter?' }
      ],
      grammar: [
        { concept: 'Impersonal "Es"', explanation: 'Weather expressions use "Es": Es regnet (It is raining), Es schneit (It is snowing).', example: 'Es regnet heute.' }
      ],
      quiz: [
        { id: 1, type: 'multiple_choice', question: 'What does "Die Sonne" mean?', options: ['Rain', 'Sun', 'Snow', 'Wind'], correctAnswer: 'Sun', explanation: 'Sonne is sun.' }
      ]
    };
  }

  // 12. GREETINGS & BASICS (Default Fallback)
  return {
    topic: 'Begrüßungen & Basics (Greetings & Basics)',
    level,
    targetLanguage: 'German',
    sentences: [
      { id: 1, targetLanguageText: 'Hallo', englishText: 'Hello', notes: 'Greeting' },
      { id: 2, targetLanguageText: 'Guten Morgen', englishText: 'Good morning', notes: 'Morning greeting' },
      { id: 3, targetLanguageText: 'Guten Tag', englishText: 'Good day / Hello', notes: 'Day greeting' },
      { id: 4, targetLanguageText: 'Danke schön', englishText: 'Thank you very much', notes: 'Polite expression' },
      { id: 5, targetLanguageText: 'Bitte sehr', englishText: 'You are welcome', notes: 'Response' },
      { id: 6, targetLanguageText: 'Entschuldigung', englishText: 'Excuse me / Sorry', notes: 'Apology' },
      { id: 7, targetLanguageText: 'Auf Wiedersehen', englishText: 'Goodbye', notes: 'Farewell' },
      { id: 8, targetLanguageText: 'Tschüss!', englishText: 'Bye!', notes: 'Casual goodbye' }
    ],
    vocabulary: [
      { word: 'Hallo', translation: 'Hello', pronunciation: 'HA-lo', example: 'Hallo, wie geht es dir?' },
      { word: 'Danke', translation: 'Thanks', pronunciation: 'DANG-ke', example: 'Vielen Dank!' }
    ],
    grammar: [
      { concept: 'Basic German Greetings', explanation: 'Essential everyday vocabulary for German beginners.', example: 'Guten Tag, Danke, Tschüss.' }
    ],
    quiz: [
      { id: 1, type: 'multiple_choice', question: 'What does "Tschüss" mean?', options: ['Hello', 'Bye', 'Please', 'Sorry'], correctAnswer: 'Bye', explanation: 'Tschüss is bye.' }
    ]
  };
};

/**
 * Primary AI Service function to generate structured language lessons
 */
export const generateLesson = async ({ topic, targetLanguage = 'German', level = 'A1', numberOfSentences = 8 }) => {
  const client = getOpenAIClient();

  if (!client) {
    console.log(`[AI Service] OPENAI_API_KEY not configured. Generating single-word/short-phrase Beginner lesson for: "${topic}" (${targetLanguage}, ${level})`);
    return generateDynamicTopicLesson({ topic, targetLanguage: 'German', level });
  }

  try {
    const systemPrompt = getLessonSystemPrompt('German', level);
    const userPrompt = getLessonUserPrompt({ topic, targetLanguage: 'German', level, numberOfSentences });

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    });

    const rawContent = completion.choices[0]?.message?.content;
    const parsed = parseCleanJson(rawContent);

    if (!parsed.sentences || !Array.isArray(parsed.sentences) || parsed.sentences.length === 0) {
      throw new Error('AI generated payload missing required "sentences" array.');
    }

    return parsed;
  } catch (error) {
    console.error('[AI Service Error]', error.message);
    console.log(`[AI Service] Using dynamic single-word/phrase generator for: "${topic}"`);
    return generateDynamicTopicLesson({ topic, targetLanguage: 'German', level });
  }
};

export const generateVocabulary = async (sentences) => {
  return sentences.map((s) => ({
    word: s.targetLanguageText,
    translation: s.englishText,
    pronunciation: '',
    example: s.targetLanguageText
  }));
};

export const generateGrammar = async (topic, targetLanguage = 'German', level = 'A1') => {
  return [
    {
      concept: `Key German Vocabulary (${level})`,
      explanation: `Essential single-word terms and short phrases for ${topic}.`,
      example: `${topic} terms`
    }
  ];
};

export const generateQuiz = async (sentences) => {
  return sentences.slice(0, 3).map((s, idx) => ({
    id: idx + 1,
    type: idx % 2 === 0 ? 'multiple_choice' : 'fill_in_the_blank',
    question: `What is the translation of "${s.targetLanguageText}"?`,
    options: [s.englishText, 'Option B', 'Option C', 'Option D'],
    correctAnswer: s.englishText,
    explanation: 'Correct translation.'
  }));
};
