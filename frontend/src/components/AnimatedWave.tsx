import { useState } from "react";

export default function AnimatedWave() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-0"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ff5500"
          fill-opacity="1"
          d="M0,160L288,256L576,64L864,160L1152,320L1440,96L1440,320L1152,320L864,320L576,320L288,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
