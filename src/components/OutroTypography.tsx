import React from 'react';

export const OutroTypography: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden bg-[#F8F7F3] border-t border-[#D9D9D5] select-none pt-10 pb-0 flex flex-col items-center justify-center"
    >
      <div className="text-center mb-2">
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#050505]/50">
          [ SYSTEMS ARCHITECT · DISTRIBUTED KERNELS · HIGH CONCURRENCY ]
        </span>
      </div>
      <div className="w-full text-center overflow-hidden">
        {/* Giant Cropped Editorial Word: "ENGINEER" perfectly scaled to prevent overflow */}
        <span className="font-display font-black text-[clamp(3.5rem,14.5vw,13.5rem)] tracking-[-0.075em] leading-[0.72] text-[#050505] hover:text-[#FFB52E] transition-colors duration-500 inline-block uppercase translate-y-[12%] cursor-default">
          engineer
        </span>
      </div>
    </div>
  );
};

