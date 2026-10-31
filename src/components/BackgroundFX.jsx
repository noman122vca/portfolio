import React from 'react';

export function BackgroundFX() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu" aria-hidden="true">
      <div className="absolute inset-0 bg-subtle-dots opacity-60" />
      <div
        className="absolute -top-[10%] -left-[10%] w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] rounded-full opacity-40 blur-3xl pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.18) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-[5%] -right-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full opacity-35 blur-3xl pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(circle, rgba(2,132,199,0.2) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[500px] rounded-full opacity-25 blur-3xl pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-[5%] left-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[450px] rounded-full opacity-30 blur-3xl pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(circle, rgba(2,132,199,0.18) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
