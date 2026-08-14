import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { MathShell } from "./math/components/MathShell";
import { AboutMathPage } from "./math/pages/AboutMathPage";
import { BookmarksPage } from "./math/pages/BookmarksPage";
import { ChapterPage } from "./math/pages/ChapterPage";
import { ClassPage } from "./math/pages/ClassPage";
import { DashboardPage } from "./math/pages/DashboardPage";
import { FormulasPage } from "./math/pages/FormulasPage";
import { LessonPage } from "./math/pages/LessonPage";
import { MathHomePage } from "./math/pages/MathHomePage";
import { NotFoundPage } from "./math/pages/NotFoundPage";
import { PracticePage } from "./math/pages/PracticePage";
import { SearchPage } from "./math/pages/SearchPage";
import { TestPage } from "./math/pages/TestPage";
import "katex/dist/katex.min.css";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<MathShell />}>
            <Route index element={<MathHomePage />} />
            <Route path="about" element={<AboutMathPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="bookmarks" element={<BookmarksPage />} />
            <Route path="formulas" element={<FormulasPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path=":classSlug" element={<ClassPage />} />
            <Route path=":classSlug/:chapterSlug" element={<ChapterPage />} />
            <Route path=":classSlug/:chapterSlug/practice" element={<PracticePage />} />
            <Route path=":classSlug/:chapterSlug/test" element={<TestPage />} />
            <Route path=":classSlug/:chapterSlug/solutions/:questionSlug" element={<PracticePage />} />
            <Route path=":classSlug/:chapterSlug/:lessonSlug" element={<LessonPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
