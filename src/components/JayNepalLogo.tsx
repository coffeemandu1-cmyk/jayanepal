import React from 'react';

interface JayNepalLogoProps {
  className?: string;
  showText?: boolean;
  textColor?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'horizontal' | 'vertical' | 'icon-only';
}

export const JayNepalLogo: React.FC<JayNepalLogoProps> = ({
  className = '',
  showText = true,
  textColor = 'text-slate-900',
  size = 'md',
  variant = 'horizontal'
}) => {
  const iconDimensions = {
    sm: { width: 36, height: 36, textTitle: 'text-base', textSub: 'text-[10px]' },
    md: { width: 48, height: 48, textTitle: 'text-lg', textSub: 'text-xs' },
    lg: { width: 64, height: 64, textTitle: 'text-2xl', textSub: 'text-sm' },
    xl: { width: 88, height: 88, textTitle: 'text-3xl', textSub: 'text-base' },
  }[size];

  return (
    <div className={`flex ${variant === 'vertical' ? 'flex-col items-center text-center' : 'items-center gap-3'} ${className}`}>
      {/* SVG recreating the uploaded emblem */}
      <div 
        className="relative shrink-0 flex items-center justify-center filter drop-shadow-sm transition-transform hover:scale-105 duration-300"
        style={{ width: iconDimensions.width, height: iconDimensions.height }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Red Gradient */}
            <linearGradient id="redCrossGrad" x1="20" y1="20" x2="110" y2="110" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EF4444" />
              <stop offset="1" stopColor="#DC2626" />
            </linearGradient>

            {/* Blue Gradient */}
            <linearGradient id="blueCrossGrad" x1="90" y1="90" x2="180" y2="180" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0EA5E9" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>

            <filter id="subtleShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Background Cross Outline Shadow */}
          <g filter="url(#subtleShadow)">
            {/* Top-Left Red Section of the Cross with rounded outer corners */}
            <path
              d="M 28 65 C 28 50 38 40 52 40 L 80 40 C 88 40 92 42 96 46 L 96 28 C 96 16 104 10 116 10 L 126 10 C 132 10 136 14 136 20 L 136 94 C 136 98 132 102 128 102 L 96 102 L 96 140 C 96 148 92 152 86 152 L 72 152 C 68 152 64 148 64 144 L 64 114 C 64 104 56 96 46 96 L 24 96 C 18 96 14 92 14 86 L 14 74 C 14 69 18 65 28 65 Z"
              fill="url(#redCrossGrad)"
            />

            {/* Bottom-Right Blue Section of the Cross with rounded outer corners */}
            <path
              d="M 104 98 C 104 94 108 90 112 90 L 148 90 C 158 90 166 82 166 72 L 166 48 C 166 42 170 38 176 38 L 186 38 C 192 38 196 42 196 48 L 196 128 C 196 142 186 154 172 154 L 142 154 C 134 154 128 160 128 168 L 128 184 C 128 190 124 194 118 194 L 106 194 C 100 194 96 190 96 184 L 96 108 C 96 102 100 98 104 98 Z"
              fill="url(#blueCrossGrad)"
            />
          </g>

          {/* Stethoscope Icon inside Red Cross (drawn precisely) */}
          <g transform="translate(42, 28) scale(0.72)" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Earpieces */}
            <path d="M 38 18 L 38 32 C 38 46 54 46 54 32 L 54 18" />
            <circle cx="38" cy="16" r="3.5" fill="#FFFFFF" />
            <circle cx="54" cy="16" r="3.5" fill="#FFFFFF" />
            {/* Flexible Tube S-curve */}
            <path d="M 46 45 L 46 60 C 46 80 20 85 20 105 C 20 125 58 125 58 145" />
            {/* Chestpiece / Bell */}
            <circle cx="58" cy="153" r="10" fill="#E2E8F0" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="58" cy="153" r="4.5" fill="#DC2626" />
          </g>

          {/* Medical Syringe Icon inside Blue Cross */}
          <g transform="translate(108, 92) rotate(-38) scale(0.68)">
            {/* Needle */}
            <line x1="12" y1="2" x2="12" y2="24" stroke="#F1F5F9" strokeWidth="3" strokeLinecap="round" />
            {/* Syringe Hub / Collar */}
            <polygon points="8,24 16,24 14,30 10,30" fill="#FBBF24" />
            {/* Syringe Barrel */}
            <rect x="6" y="30" width="12" height="60" rx="2" fill="#FFFFFF" fillOpacity="0.88" stroke="#FFFFFF" strokeWidth="3" />
            {/* Measurement lines */}
            <line x1="8" y1="40" x2="14" y2="40" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="48" x2="14" y2="48" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="8" y1="56" x2="14" y2="56" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="64" x2="14" y2="64" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="8" y1="72" x2="14" y2="72" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="80" x2="14" y2="80" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
            {/* Plunger Stopper */}
            <rect x="7" y="52" width="10" height="6" rx="1" fill="#0369A1" />
            {/* Plunger Shaft & Flange */}
            <line x1="12" y1="58" x2="12" y2="100" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="5" y1="90" x2="19" y2="90" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="4" y1="100" x2="20" y2="100" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`font-nepali font-extrabold tracking-tight ${iconDimensions.textTitle} ${textColor} leading-none`}>
              जय नेपाल ट्रेडर्स
            </span>
          </div>
          <span className={`font-english font-semibold tracking-wider text-red-600 uppercase ${iconDimensions.textSub} mt-0.5 leading-tight`}>
            Jay Nepal Traders
          </span>
          <span className="text-[10px] text-slate-500 font-medium tracking-tight">
            Surgical & Hospital Equipment Supplies • Nepal
          </span>
        </div>
      )}
    </div>
  );
};
