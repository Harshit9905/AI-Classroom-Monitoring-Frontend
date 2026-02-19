/**
 * AI Classroom Monitoring System - Design Tokens & Theme Constants
 * Comprehensive color palette and design system for the entire application
 */

export const THEME = {
  // Color Palette
  colors: {
    // Backgrounds
    background: '#F1F5F9',
    backgroundCard: '#FFFFFF',
    backgroundAlt: '#F8FAFC',
    
    // Sidebar Gradient
    sidebarGradientStart: '#0F172A',
    sidebarGradientEnd: '#1E293B',
    
    // Primary Colors
    primary: '#3B82F6',
    primaryLight: '#DBEAFE',
    primaryDark: '#1E40AF',
    
    // Secondary Colors
    success: '#22C55E',
    successLight: '#DCFCE7',
    danger: '#EF4444',
    dangerLight: '#FEE2E2',
    warning: '#EAB308',
    warningLight: '#FEF08A',
    info: '#0EA5E9',
    infoLight: '#CFFAFE',
    
    // Neutrals
    dark: '#1E293B',
    darkLight: '#334155',
    lightText: '#64748B',
    lightBorder: '#E2E8F0',
    lighter: '#F8FAFC',
  },

  // Spacing Scale
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '2.5rem', // 40px
    '3xl': '3rem',   // 48px
  },

  // Border Radius
  radius: {
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px - Default card radius
    full: '9999px',  // Circle
  },

  // Shadow System
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.15)',
  },

  // Typography
  typography: {
    fontFamily: '"Inter", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    
    // Headings
    h1: { size: '2rem', weight: 700, lineHeight: 1.2 },      // 32px
    h2: { size: '1.875rem', weight: 700, lineHeight: 1.2 },  // 30px
    h3: { size: '1.5rem', weight: 700, lineHeight: 1.3 },    // 24px
    h4: { size: '1.25rem', weight: 600, lineHeight: 1.3 },   // 20px
    
    // Body Text
    bodyLg: { size: '1.0625rem', weight: 400, lineHeight: 1.5 },  // 17px
    body: { size: '0.9375rem', weight: 400, lineHeight: 1.6 },    // 15px
    bodySm: { size: '0.875rem', weight: 400, lineHeight: 1.5 },   // 14px
    bodyXs: { size: '0.75rem', weight: 500, lineHeight: 1.4 },    // 12px
    
    // Labels
    label: { size: '0.875rem', weight: 600, lineHeight: 1 },      // 14px, Semibold
    labelSm: { size: '0.75rem', weight: 600, lineHeight: 1 },     // 12px, Semibold
  },

  // Transitions
  transition: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },

  // Z-Index Scale
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    backDrop: 1040,
    offcanvas: 1050,
    tooltip: 1070,
  },
};

// Component Variants
export const COMPONENT_VARIANTS = {
  card: {
    base: 'bg-white rounded-2xl border border-slate-100 shadow-sm',
    hover: 'hover:shadow-md hover:border-slate-200 transition-all',
    interactive: 'cursor-pointer hover:border-blue-200 hover:shadow-md transition-all',
  },
  
  button: {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 transition-colors',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors',
    ghost: 'text-slate-600 hover:bg-slate-50 transition-colors',
  },

  badge: {
    success: 'bg-green-100 text-green-700',
    danger: 'bg-red-100 text-red-700',
    warning: 'bg-amber-100 text-amber-700',
    info: 'bg-blue-100 text-blue-700',
  },

  alert: {
    success: 'bg-green-50 border border-green-200 text-green-800',
    danger: 'bg-red-50 border border-red-200 text-red-800',
    warning: 'bg-amber-50 border border-amber-200 text-amber-800',
    info: 'bg-blue-50 border border-blue-200 text-blue-800',
  },
};

// Animation Presets
export const ANIMATIONS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 },
  },
};

export default THEME;
