"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Mail, Camera, Sparkles, Heart, MessageCircleHeart, ChevronLeft, ChevronRight } from "lucide-react"

const routes = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/letter", icon: Mail, label: "จดหมายรัก" },
  { href: "/gallery", icon: Camera, label: "ความทรงจำ" },
  { href: "/reasons", icon: Sparkles, label: "เหตุผลที่รัก" },
  { href: "/scratch", icon: Heart, label: "ข้อความลับ" },
  { href: "/quiz", icon: MessageCircleHeart, label: "ควิซ" },
]

export function PageNav() {
  const pathname = usePathname()

  if (pathname === "/") return null

  const currentIndex = routes.findIndex((r) => r.href === pathname)
  const prevPage = currentIndex > 0 ? routes[currentIndex - 1] : null
  const nextPage = currentIndex < routes.length - 1 ? routes[currentIndex + 1] : null
  const currentRoute = routes[currentIndex]

  return (
    <>
      {/* Top bar -- minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Back to home"
          >
            <ChevronLeft size={18} />
            <Home size={14} />
          </Link>

          {/* Current page title */}
          <span className="font-sans text-xs sm:text-sm text-foreground font-medium">
            {currentRoute?.label}
          </span>

          {/* Page indicator */}
          <span className="font-sans text-[10px] sm:text-xs text-muted-foreground tabular-nums">
            {currentIndex}/{routes.length - 1}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] bg-border">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(currentIndex / (routes.length - 1)) * 100}%` }}
          />
        </div>
      </nav>

      {/* Bottom prev/next */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-t border-border/50 safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3">
          {prevPage ? (
            <Link
              href={prevPage.href}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors active:scale-95 py-1"
            >
              <ChevronLeft size={14} />
              <span className="font-sans text-xs sm:text-sm">{prevPage.label}</span>
            </Link>
          ) : (
            <div />
          )}

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5">
            {routes.slice(1).map((route, i) => (
              <Link
                key={route.href}
                href={route.href}
                className={`rounded-full transition-all duration-300 ${
                  currentIndex === i + 1
                    ? "w-5 h-1.5 bg-primary"
                    : "w-1.5 h-1.5 bg-border hover:bg-muted-foreground/40"
                }`}
                aria-label={route.label}
              />
            ))}
          </div>

          {nextPage ? (
            <Link
              href={nextPage.href}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors active:scale-95 py-1"
            >
              <span className="font-sans text-xs sm:text-sm">{nextPage.label}</span>
              <ChevronRight size={14} />
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors active:scale-95 py-1"
            >
              <span className="font-sans text-xs sm:text-sm font-medium">{"กลับหน้าหลัก"}</span>
              <Home size={13} />
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
