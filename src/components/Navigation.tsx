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
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-center gap-8 mb-8">
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
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-10 h-10 text-zinc-300 hover:text-zinc-100 transition-colors duration-200 mb-4"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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

        {isOpen && (
          <div className="flex flex-col gap-4 mb-8 p-4 bg-zinc-900/50 rounded-lg backdrop-blur-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-zinc-300 hover:text-zinc-100 transition-colors duration-200 text-lg font-medium py-2 px-4 rounded hover:bg-zinc-800/50"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}