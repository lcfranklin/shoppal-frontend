import DashboardPage from './features/dashboard/pages/dashboardPage.jsx'
import { ThemeProvider } from './providers/theme-provider.jsx'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="shoppal-theme">
      <div className="min-h-screen bg-background transition-colors duration-300">
        <DashboardPage />
      </div>
    </ThemeProvider>
  )
}

export default App
