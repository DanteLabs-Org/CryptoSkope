"use client"

import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { 
  BarChart3Icon, 
  BellIcon, 
  BookmarkIcon, 
  GlobeIcon, 
  LayoutGridIcon, 
  Search, 
  UserRoundIcon 
} from "lucide-react"
import { Input } from "./ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        <div className="flex items-center gap-2 md:gap-3">
          <BarChart3Icon className="h-6 w-6" />
          <span className="font-semibold text-lg hidden sm:inline-block">CryptoVision</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 flex-1">
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary">
              Markets
            </a>
            <a href="#" className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary">
              Watchlist
            </a>
            <a href="#" className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary">
              News
            </a>
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search coins..."
              className="pl-8 md:w-[200px] lg:w-[280px] bg-muted"
            />
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <Button size="icon" variant="ghost" className="rounded-full">
              <GlobeIcon className="h-5 w-5" />
              <span className="sr-only">Language</span>
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full">
              <BellIcon className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full">
              <BookmarkIcon className="h-5 w-5" />
              <span className="sr-only">Bookmarks</span>
            </Button>
            <ThemeToggle />
            <Button size="icon" variant="ghost" className="rounded-full">
              <UserRoundIcon className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </div>
        </div>
        
        <Button className="md:hidden" size="icon" variant="outline">
          <LayoutGridIcon className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </div>
    </header>
  )
}