import React from "react";
import { CourseProvider, useCourse } from "@/context/CourseContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchModal } from "@/components/search/SearchModal";
import { ProfileModal } from "@/components/profile/ProfileModal";
import { HomePage } from "@/pages/HomePage";
import { LessonsPage } from "@/pages/LessonsPage";
import { PracticePage } from "@/pages/PracticePage";
import { QuizPage } from "@/pages/QuizPage";
import { AboutPage } from "@/pages/AboutPage";
import "./App.css";

function AppContent() {
  const { activePage } = useCourse();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <div className="flex-1">
        {activePage === "home" && <HomePage />}
        {activePage === "lessons" && <LessonsPage />}
        {activePage === "practice" && <PracticePage />}
        {activePage === "quiz" && <QuizPage />}
        {activePage === "about" && <AboutPage />}
      </div>

      <Footer />
      <SearchModal />
      <ProfileModal />
    </div>
  );
}

export default function App() {
  return (
    <CourseProvider>
      <AppContent />
    </CourseProvider>
  );
}
