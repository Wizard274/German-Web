import api from './api';

export const generateLessonApi = async ({ topic, targetLanguage, level }) => {
  const response = await api.post('/lessons/generate', {
    topic,
    targetLanguage,
    level
  });
  return response.data;
};

export const getAllLessonsApi = async () => {
  const response = await api.get('/lessons');
  return response.data;
};

export const getLessonByIdApi = async (id) => {
  const response = await api.get(`/lessons/${id}`);
  return response.data;
};

export const deleteLessonApi = async (id) => {
  const response = await api.get(`/lessons/${id}`);
  return response.data;
};
