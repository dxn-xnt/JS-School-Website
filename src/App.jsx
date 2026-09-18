import React from "react";
import { SchoolProvider, useSchool } from "./context/SchoolContext";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { Toast } from "./components/common/UIComponents";
import { DashboardPage } from "./pages/DashboardPage";
import { ClassesPage } from "./pages/ClassesPage";
import { ClassDetailsPage } from "./pages/ClassDetailsPage";
import { StudentsPage } from "./pages/StudentsPage";
import { TeachersPage } from "./pages/TeachersPage";
import { SubjectsPage } from "./pages/SubjectsPage";
import { SchedulesPage } from "./pages/SchedulesPage";
import { JsConceptsPage } from "./pages/JsConceptsPage";
import "./App.css";

function AppContent() {
  const { activePage, toast } = useSchool();

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Administrative Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 pb-16">
          {activePage === "dashboard" && <DashboardPage />}
          {activePage === "classes" && <ClassesPage />}
          {activePage === "class-details" && <ClassDetailsPage />}
          {activePage === "students" && <StudentsPage />}
          {activePage === "teachers" && <TeachersPage />}
          {activePage === "subjects" && <SubjectsPage />}
          {activePage === "schedules" && <SchedulesPage />}
          {activePage === "js-concepts" && <JsConceptsPage />}
        </main>
      </div>

      {/* Floating System Toast */}
      <Toast toast={toast} />
    </div>
  );
}

export default function App() {
  return (
    <SchoolProvider>
      <AppContent />
    </SchoolProvider>
  );
}
