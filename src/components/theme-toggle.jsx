import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"

export function ThemeToggle() {
  const context = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"a-70
      className={`rounded-full ${context.theme === "light" ? "shadow-md shadow-black bg-amber-200" : "shadow-md shadow-amber-300"} hover:bg-accent transition-colors duration-300`}
      onClick={() => context.setTheme(context.theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500 font-bold " />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
