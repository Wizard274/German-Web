/**
 * Controlled Concurrency Helper
 * Executes items with a limit on concurrent promise resolution.
 */
export const pMap = async (array, mapper, { concurrency = 3 } = {}) => {
  const results = new Array(array.length);
  let index = 0;

  const worker = async () => {
    while (index < array.length) {
      const currentIndex = index++;
      results[currentIndex] = await mapper(array[currentIndex], currentIndex);
    }
  };

  const workers = Array.from({ length: Math.min(concurrency, array.length) }, () => worker());
  await Promise.all(workers);
  return results;
};
