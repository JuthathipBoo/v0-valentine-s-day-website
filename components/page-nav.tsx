"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Heart, Home, Mail, Camera, Sparkles, MessageCircleHeart, Clock, Infinity, ArrowLeft } from "lucide-react"

const routes = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/letter", icon: Mail, label: "จดหมาย" },
  { href: "/gallery", icon: Camera, label: "รูปภาพ" },
  { href: "/reasons", icon: Sparkles, label: "เหตุผล" },
  { href: "/scratch", icon: Heart, label: "ข้อความลับ" },
  { href: "/quiz", icon: MessageCircleHeart, label: "ควิซ" },
  { href: "/timeline", icon: Clock, label: "เรื่องราว" },
  { href: "/love", icon: Heart, label: "ส่งรัก" },
  { href: "/promise", icon: Infinity, label: "สัญญา" },
]

export function PageNav() {
  const pathname = usePathname()

  if (pathname === "/") return null

  const currentIndex = routes.findIndex((r) => r.href === pathname)
  const prevPage = currentIndex > 0 ? routes[currentIndex - 1] : null
  const nextPage = currentIndex < routes.length - 1 ? routes[currentIndex + 1] : null

  return (
    <>
      {/* Top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">{"กลับหน้าหลัก"}</span>
          </Link>

          <div className="flex items-center gap-1">
            <Heart size={14} className="text-primary" fill="hsl(346, 60%, 55%)" />
            <span className="font-serif text-sm text-foreground">Valentine</span>
          </div>

          {/* Desktop nav dots */}
          <div className="hidden md:flex items-center gap-1.5">
            {routes.slice(1).map((route) => {
              const isActive = pathname === route.href
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-primary scale-125"
                      : "bg-border hover:bg-primary/40"
                  }`}
                  aria-label={route.label}
                  title={route.label}
                />
              )
            })}
          </div>

          {/* Mobile: current page indicator */}
          <span className="md:hidden font-sans text-xs text-muted-foreground">
            {routes[currentIndex]?.label}
          </span>
        </div>
      </nav>

      {/* Bottom prev/next navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          {prevPage ? (
            <Link
              href={prevPage.href}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
            >
              <ArrowLeft size={14} />
              {prevPage.label}
            </Link>
          ) : (
            <div />
          )}

          {/* Mobile nav dots */}
          <div className="flex md:hidden items-center gap-1.5">
            {routes.slice(1).map((route) => {
              const isActive = pathname === route.href
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-primary scale-125"
                      : "bg-border hover:bg-primary/40"
                  }`}
                  aria-label={route.label}
                />
              )
            })}
          </div>

          {nextPage ? (
            <Link
              href={nextPage.href}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
            >
              {nextPage.label}
              <ArrowLeft size={14} className="rotate-180" />
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-sans text-sm"
            >
              {"กลับหน้าหลัก"}
              <Home size={14} />
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
