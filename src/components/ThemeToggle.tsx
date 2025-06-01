import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const AdvancedThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
    
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div className="glass-btn px-4 py-2 rounded-xl flex items-center gap-2 opacity-50">
        <div className="w-4 h-4 bg-current opacity-30 rounded-full"></div>
        <span className="text-sm opacity-30">تحميل...</span>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="glass-btn px-4 py-2 rounded-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300 group relative overflow-hidden min-w-[120px]"
      aria-label={isDark ? 'تفعيل الوضع المضيء' : 'تفعيل الوضع المظلم'}
    >
      {/* Animated background */}
      <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10' 
          : 'bg-gradient-to-r from-yellow-400/10 to-orange-400/10'
      }`}></div>
      
      {/* Icon with smooth transition */}
      <div className="relative z-10 transition-transform duration-500 ease-in-out group-hover:scale-110">
        {isDark ? (
          <Sun 
            className="w-4 h-4 text-yellow-400 drop-shadow-lg transition-colors duration-300" 
            strokeWidth={2}
          />
        ) : (
          <Moon 
            className="w-4 h-4 text-blue-600 drop-shadow-lg transition-colors duration-300" 
            strokeWidth={2}
          />
        )}
      </div>
      
      {/* Text label */}
      <span className="relative z-10 text-sm font-medium transition-colors duration-300">
        {isDark ? 'مضيء' : 'مظلم'}
      </span>
      
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-current/5 to-current/10"></div>
    </button>
  );
};

export default AdvancedThemeToggle;