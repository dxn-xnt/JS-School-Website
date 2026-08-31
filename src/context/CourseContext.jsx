import React, { createContext, useContext, useState, useEffect } from "react";
import { ALL_LESSONS } from "@/data/lessonsData";

const CourseContext = createContext(null);

const STORAGE_KEYS = {
  COMPLETED_LESSONS: "js_course_completed_lessons_v1",
  PRACTICE_COMPLETED: "js_course_practice_completed_v1",
  QUIZ_RESULTS: "js_course_quiz_results_v1",
  STUDENT_PROFILE: "js_course_student_profile_v1",
  THEME_MODE: "js_course_theme_v1",
};

export function CourseProvider({ children }) {
  const [activePage, setActivePage] = useState("home"); // 'home' | 'lessons' | 'practice' | 'quiz' | 'about'
  const [activeLessonId, setActiveLessonId] = useState("variables");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Completed Lessons State
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Practice completions
  const [practiceCompleted, setPracticeCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRACTICE_COMPLETED);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Quiz results
  const [quizResults, setQuizResults] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Student Profile
  const [studentProfile, setStudentProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENT_PROFILE);
      return saved
        ? JSON.parse(saved)
        : {
            name: "Student Learner",
            school: "DevCampus JS Academy",
            joinedYear: "2026",
            avatarSeed: "coder42",
          };
    } catch {
      return {
        name: "Student Learner",
        school: "DevCampus JS Academy",
        joinedYear: "2026",
        avatarSeed: "coder42",
      };
    }
  });

  // Theme
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME_MODE) || "light";
    } catch {
      return "light";
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(completedLessons));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessons]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRACTICE_COMPLETED, JSON.stringify(practiceCompleted));
    } catch (e) {
      console.error(e);
    }
  }, [practiceCompleted]);

  useEffect(() => {
    try {
      if (quizResults) {
        localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(quizResults));
      }
    } catch (e) {
      console.error(e);
    }
  }, [quizResults]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILE, JSON.stringify(studentProfile));
    } catch (e) {
      console.error(e);
    }
  }, [studentProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME_MODE, theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  // Actions
  const toggleLessonComplete = (lessonId) => {
    setCompletedLessons((prev) => {
      if (prev.includes(lessonId)) {
        return prev.filter((id) => id !== lessonId);
      } else {
        return [...prev, lessonId];
      }
    });
  };

  const markLessonComplete = (lessonId) => {
    setCompletedLessons((prev) => {
      if (!prev.includes(lessonId)) {
        return [...prev, lessonId];
      }
      return prev;
    });
  };

  const markPracticeComplete = (exerciseId) => {
    setPracticeCompleted((prev) => ({
      ...prev,
      [exerciseId]: true,
    }));
  };

  const saveQuizResult = (result) => {
    setQuizResults(result);
  };

  const navigateToLesson = (lessonId) => {
    setActiveLessonId(lessonId);
    setActivePage("lessons");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetAllProgress = () => {
    setCompletedLessons([]);
    setPracticeCompleted({});
    setQuizResults(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.COMPLETED_LESSONS);
      localStorage.removeItem(STORAGE_KEYS.PRACTICE_COMPLETED);
      localStorage.removeItem(STORAGE_KEYS.QUIZ_RESULTS);
    } catch (e) {
      console.error(e);
    }
  };

  // 8 major lessons (excluding overview from core 8 or including all)
  const coreLessons = ALL_LESSONS.filter((l) => l.number > 0);
  const totalCoreLessons = coreLessons.length || 8;
  const completedCoreCount = completedLessons.filter((id) => id !== "overview").length;
  const courseProgressPercent = Math.min(
    100,
    Math.round((completedCoreCount / totalCoreLessons) * 100)
  );

  return (
    <CourseContext.Provider
      value={{
        activePage,
        setActivePage,
        activeLessonId,
        setActiveLessonId,
        navigateToLesson,
        completedLessons,
        toggleLessonComplete,
        markLessonComplete,
        isLessonCompleted: (id) => completedLessons.includes(id),
        practiceCompleted,
        markPracticeComplete,
        quizResults,
        saveQuizResult,
        studentProfile,
        setStudentProfile,
        theme,
        setTheme,
        toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
        isSearchOpen,
        setIsSearchOpen,
        isProfileOpen,
        setIsProfileOpen,
        searchQuery,
        setSearchQuery,
        courseProgressPercent,
        completedCount: completedCoreCount,
        totalLessons: totalCoreLessons,
        resetAllProgress,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return ctx;
}
