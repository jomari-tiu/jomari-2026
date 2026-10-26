type IconProps = { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const ArrowUpRight = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowRight = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ArrowLeft = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M20 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const ArrowDown = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M12 4v15M6 13l6 6 6-6" />
  </svg>
);

export const ChevronLeft = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);

export const ChevronRight = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);
