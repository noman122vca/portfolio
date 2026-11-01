import React from 'react';

export function WhatsAppIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="WhatsApp">
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      <path
        d="M34.8 13.2C32 10.4 28.2 8.8 24.1 8.8 15.7 8.8 8.9 15.6 8.9 24c0 2.7.7 5.3 2 7.6L9 39l7.6-2c2.2 1.2 4.7 1.8 7.5 1.8 8.4 0 15.2-6.8 15.2-15.2.1-4.1-1.5-7.9-4.5-10.4zm-10.7 23.3c-2.3 0-4.5-.6-6.4-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5c-1.3-2-2-4.4-2-6.8 0-7 5.7-12.7 12.7-12.7 3.4 0 6.6 1.3 9 3.7 2.4 2.4 3.7 5.6 3.7 9-.1 7-5.8 12.5-12.7 12.5zm6.9-9.5c-.4-.2-2.3-1.1-2.6-1.3-.4-.1-.6-.2-.9.2s-1 1.3-1.2 1.5c-.2.2-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8s0-.6.2-.8c.2-.2.4-.5.6-.7.2-.2.3-.4.4-.6.1-.2.1-.4 0-.6-.1-.2-.9-2.1-1.2-2.9-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.8.1-1.2.5-.4.4-1.6 1.6-1.6 3.8s1.6 4.4 1.9 4.7c.2.4 3.2 4.9 7.8 6.9 1.1.5 2 .8 2.6 1 .9.3 2 .2 2.8.1.8-.1 2.5-1 2.8-2 .4-1 .4-1.8.3-2-.1-.2-.4-.3-.8-.5z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function FacebookIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Facebook">
      <rect width="48" height="48" rx="11" fill="#1877F2" />
      <path
        d="M29.5 25.5l.8-5.3h-5.1v-3.4c0-1.4.7-2.8 3-2.8h2.3V9.5c-.4 0-1.8-.2-3.4-.2-3.5 0-5.8 2.1-5.8 6v4.8h-4.7v5.3h4.7V38h5.8V25.5h4.2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Instagram">
      <defs>
        <radialGradient id="officialIgGradShared" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#officialIgGradShared)" />
      <rect x="11" y="11" width="26" height="26" rx="7.5" stroke="#FFFFFF" strokeWidth="2.8" />
      <circle cx="24" cy="24" r="6.5" stroke="#FFFFFF" strokeWidth="2.8" />
      <circle cx="31.2" cy="16.8" r="1.6" fill="#FFFFFF" />
    </svg>
  );
}

export function LinkedInIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="LinkedIn">
      <rect width="48" height="48" rx="11" fill="#0A66C2" />
      <path
        d="M14.5 19.5H20V36H14.5V19.5ZM17.2 12C15.4 12 14 13.4 14 15.2C14 17 15.4 18.4 17.2 18.4C19 18.4 20.4 17 20.4 15.2C20.4 13.4 19 12 17.2 12ZM27.8 19.5H23V36H28.5V27.3C28.5 22.7 34.5 22.3 34.5 27.3V36H40V25.3C40 17 30.6 17.3 27.8 21.8V19.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function BehanceIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Behance">
      <rect width="48" height="48" rx="11" fill="#0057FF" />
      <path
        fill="#FFFFFF"
        d="M20 23.5c1.4-.6 2.3-1.8 2.3-3.4 0-3-2.3-4.5-5.6-4.5H9.5v17h7.9c3.6 0 6-1.8 6-4.9 0-2.1-1.2-3.6-3.4-4.2zm-6.8-4.7h3.4c1.5 0 2.4.7 2.4 1.9 0 1.3-.9 2-2.4 2h-3.4v-3.9zm3.8 10.6h-3.8v-4.1h3.8c1.6 0 2.6.8 2.6 2.1 0 1.2-1 2-2.6 2zm15.4-8.8c-4.4 0-7.3 3.1-7.3 7.3 0 4.4 3 7.4 7.5 7.4 3.3 0 5.6-1.6 6.7-4.1h-3.6c-.6 1.1-1.6 1.7-3.1 1.7-2.1 0-3.5-1.3-3.7-3.2h10.8c.1-.5.1-1.1.1-1.6 0-4.4-2.8-7.5-7.4-7.5zm-3.6 6c.3-1.8 1.6-3 3.5-3 1.9 0 3.2 1.2 3.4 3h-6.9zm1-6.5h5.3v1.8h-5.3V20.1z"
      />
    </svg>
  );
}

export function YouTubeIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="YouTube">
      <rect width="48" height="48" rx="12" fill="#FF0000" />
      <path d="M31.5 24L20 17.5V30.5L31.5 24Z" fill="#FFFFFF" />
    </svg>
  );
}

export function PhotoshopIcon({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Adobe Photoshop">
      <rect width="100" height="100" rx="22" fill="#001E36" />
      <rect x="3" y="3" width="94" height="94" rx="19" stroke="#31A8FF" strokeWidth="3" />
      <text
        x="50"
        y="67"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontSize="50"
        fill="#31A8FF"
        letterSpacing="-1.5"
      >
        Ps
      </text>
    </svg>
  );
}

export function IllustratorIcon({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Adobe Illustrator">
      <rect width="100" height="100" rx="22" fill="#200C00" />
      <rect x="3" y="3" width="94" height="94" rx="19" stroke="#FF9A00" strokeWidth="3" />
      <text
        x="50"
        y="67"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontSize="50"
        fill="#FF9A00"
        letterSpacing="-1.5"
      >
        Ai
      </text>
    </svg>
  );
}

export function PremiereProIcon({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Adobe Premiere Pro">
      <rect width="100" height="100" rx="22" fill="#240030" />
      <rect x="3" y="3" width="94" height="94" rx="19" stroke="#EA77FF" strokeWidth="3" />
      <text
        x="50"
        y="67"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontSize="50"
        fill="#EA77FF"
        letterSpacing="-1.5"
      >
        Pr
      </text>
    </svg>
  );
}

export function AfterEffectsIcon({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Adobe After Effects">
      <rect width="100" height="100" rx="22" fill="#00005B" />
      <rect x="3" y="3" width="94" height="94" rx="19" stroke="#9999FF" strokeWidth="3" />
      <text
        x="50"
        y="67"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontSize="50"
        fill="#9999FF"
        letterSpacing="-1.5"
      >
        Ae
      </text>
    </svg>
  );
}

export function CapCutIcon({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="CapCut">
      <rect width="100" height="100" rx="22" fill="#FFFFFF" />
      <rect x="2" y="2" width="96" height="96" rx="20" stroke="#CBD5E1" strokeWidth="2.5" />
      <g transform="translate(15, 11) scale(2.9)">
        <path
          d="M24.189 6.442V2.671l-4.535 2.383V4.91c.002-1.505-1.078-2.411-2.638-2.411H2.64C.993 2.5 0 3.407 0 4.91V8.72L6.354 12 0 15.316v3.8C0 20.595 1 21.5 2.64 21.5h14.373c1.56 0 2.639-.907 2.639-2.382v-.197l4.536 2.409v-3.828L13.64 12 24.19 6.443zM9.982 13.873l7.797 4.083H2.157l7.825-4.083zm7.797-7.829L9.982 10.127 2.157 6.044h15.622z"
          fill="#000000"
        />
      </g>
      <text
        x="50"
        y="87"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontSize="17.5"
        fill="#000000"
        letterSpacing="-0.5"
      >
        CapCut
      </text>
    </svg>
  );
}

export function MetaMarketingIcon({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Meta Video Marketing">
      <defs>
        <linearGradient id="metaSharedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0064e0" />
          <stop offset="50%" stopColor="#0082fb" />
          <stop offset="100%" stopColor="#00c6ff" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="#04121F" />
      <rect x="3" y="3" width="94" height="94" rx="19" stroke="#0082fb" strokeWidth="2.5" />
      <path
        d="M50 48.5c-4.2-6.5-8.5-11-13.8-11-7.2 0-12.7 5.8-12.7 13.5 0 8.2 5.8 14 13.2 14 6.2 0 10.8-4.5 13.3-8.8 2.5 4.3 7.1 8.8 13.3 8.8 7.4 0 13.2-5.8 13.2-14 0-7.7-5.5-13.5-12.7-13.5-5.3 0-9.6 4.5-13.8 11zm0 0c-3.1 4.8-6.6 8.5-10.5 8.5-4.5 0-7.8-3.6-7.8-8.5 0-4.8 3.3-8.5 7.8-8.5 3.9 0 7.4 3.7 10.5 8.5zm0 0c3.1-4.8 6.6-8.5 10.5-8.5 4.5 0 7.8 3.7 7.8 8.5 0 4.9-3.3 8.5-7.8 8.5-3.9 0-7.4-3.7-10.5-8.5z"
        fill="url(#metaSharedGrad)"
      />
    </svg>
  );
}

export function GitHubIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="GitHub">
      <rect width="48" height="48" rx="11" fill="#181717" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 10C16.27 10 10 16.27 10 24c0 6.18 4.01 11.42 9.57 13.27.7.13.96-.3.96-.67v-2.36c-3.89.85-4.71-1.87-4.71-1.87-.64-1.62-1.56-2.05-1.56-2.05-1.27-.87.1-.85.1-.85 1.4.1 2.14 1.44 2.14 1.44 1.25 2.14 3.28 1.52 4.08 1.16.13-.9.49-1.52.89-1.87-3.1-.35-6.37-1.55-6.37-6.91 0-1.53.55-2.77 1.44-3.75-.15-.35-.62-1.78.14-3.7 0 0 1.18-.38 3.85 1.44a13.4 13.4 0 013.51-.47c1.19.01 2.39.16 3.51.47 2.67-1.82 3.85-1.44 3.85-1.44.76 1.92.29 3.35.14 3.7.9 0.98 1.44 2.22 1.44 3.75 0 5.37-3.27 6.55-6.39 6.9.5.43.95 1.28.95 2.58v3.83c0 .38.25.81.96.67C33.99 35.41 38 30.18 38 24c0-7.73-6.27-14-14-14z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

