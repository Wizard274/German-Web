/**
 * Clean and parse JSON response from LLMs
 */
export const parseCleanJson = (rawString) => {
  if (typeof rawString !== 'string') return rawString;

  let cleaned = rawString.trim();

  // Strip markdown code fences if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```[a-z]*\n?/, '').replace(/\n?```$/, '').trim();
  }

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Failed to parse clean JSON:', cleaned);
    throw new Error('AI returned invalid JSON formatting');
  }
};
