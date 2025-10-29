// Theme Toggle Script with localStorage persistence

(function() {
  'use strict';

  const THEME_KEY = 'blog-theme';
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');

  // Initialize theme from localStorage or default to light
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    console.log('🎨 [Theme] 초기 테마 로드:', savedTheme);
    applyTheme(savedTheme);
  }

  // Apply theme to document
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
    console.log('✅ [Theme] 테마 적용 완료:', theme);
  }

  // Update theme icon based on current theme
  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    console.log('🔄 [Theme] 테마 변경:', currentTheme, '→', newTheme);
    
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    
    console.log('💾 [Theme] localStorage에 저장:', newTheme);
  }

  // Add event listener to toggle button
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Initialize on page load
  initTheme();

  console.log('🚀 [Theme] Theme.js 초기화 완료');
})();

