import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';

import { HomePage } from './pages/HomePage';
import { CreateLessonPage } from './pages/CreateLessonPage';
import { LessonDetailPage } from './pages/LessonDetailPage';

export const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateLessonPage />} />
        <Route path="/lesson/:id" element={<LessonDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
