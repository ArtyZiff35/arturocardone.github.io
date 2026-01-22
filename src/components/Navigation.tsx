import { useState } from 'react';
import clsx from 'clsx';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/experience', label: 'Experience' },
    { href: '/skills', label: 'Skills' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-zinc-900/30 backdrop-blur-md border-b border-zinc-800/50">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8 py-4 px-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-zinc-300 hover:text-zinc-100 transition-colors duration-200 text-lg font-medium relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-zinc-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-12 h-12 p-3 text-zinc-300 hover:text-zinc-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={clsx("transition-transform duration-200", isOpen ? "rotate-90" : "")}
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Outside nav for proper viewport positioning */}
      <div className={clsx(
        "fixed inset-0 z-50 transition-all duration-300 ease-in-out md:hidden",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu panel */}
        <div className={clsx(
          "absolute left-0 top-0 h-screen w-64 bg-zinc-900/95 backdrop-blur-md border-r border-zinc-700 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col gap-1 p-6 pt-20">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-zinc-300 hover:text-zinc-100 transition-all duration-200 text-lg font-medium py-3 px-4 rounded-lg hover:bg-zinc-800/50",
                  "transform transition-transform duration-200",
                  isOpen ? "translate-x-0" : "-translate-x-4"
                )}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
                }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}