/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line react/display-name
export const LaunchCard = React.forwardRef(({ image, title, details }, ref) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-5 md:h-32 w-full" ref={ref}>
      <div className="aspect-square w-32 rounded-[4px]">
        <img
          className="h-full w-full object-cover rounded-[4px]"
          src={image || `/vite.svg`}
          alt="Launch"
        />
      </div>

      <div className="flex-1 flex flex-col gap-1 max-w-full h-full justify-center">
        <p className="font-semibold text-left line-clamp-1">{title}</p>
        <p className="text-sm w-full h-fit max-h-full text-slate-500 line-clamp-4 text-justify">Details: {details}</p>
      </div>
    </div>
  );
});
