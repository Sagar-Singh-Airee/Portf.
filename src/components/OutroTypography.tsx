import React from 'react';

export const OutroTypography: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden bg-[#F8F7F3] border-t border-[#D9D9D5] select-none pointer-events-none pt-12 pb-0 flex items-center justify-center"
    >
      <div className="w-full text-center">
        {/* Giant Cropped Editorial Word: "vidéaste" matching reference image */}
        <span className="font-display font-black text-[22vw] tracking-[-0.075em] leading-[0.72] text-[#050505] inline-block uppercase translate-y-[15%]">
          vidéaste
        </span>
      </div>
    </div>
  );
};
