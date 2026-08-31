import { TooltipProvider } from "@/components/ui/tooltip"
import DashboardPage from "@/app/dashboard/page"
import "./App.css"

function App() {
  return (
    <TooltipProvider>
      <DashboardPage />
    </TooltipProvider>
  )
}

export default App
