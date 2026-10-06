import api from './api';

export const recordProgressApi = async (data) => {
  const response = await api.post('/progress', data);
  return response.data;
};

export const getDashboardApi = async () => {
  const response = await api.get('/progress/dashboard');
  return response.data;
};

export const submitQuizApi = async (lessonId, userAnswers) => {
  const response = await api.post('/quiz/submit', {
    lessonId,
    userAnswers
  });
  return response.data;
};
