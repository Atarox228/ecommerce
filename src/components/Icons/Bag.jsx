export default function Bag({ styles, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
      {...styles}
      className={className}
    >
      <defs>
        <linearGradient
          id="gradient-bag"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="24"
          y2="0"
          gradientTransform="rotate(145, 7, 0)"
        >
          <stop offset="30%" stopColor="var(--gradient-from)" />
          <stop offset="50%" stopColor="var(--gradient-to)" />
          <stop offset="70%" stopColor="var(--gradient-from)" />
          <stop offset="90%" stopColor="var(--gradient-to)" />
        </linearGradient>
      </defs>
      <path d="M0 0h15v15H0z" fill="none" />
      <path
        fill="url(#gradient-bag)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 3.5a2.5 2.5 0 0 1 5 0V4h1v-.5a3.5 3.5 0 1 0-7 0V4h1zM1.904 6.334A1.5 1.5 0 0 1 3.395 5h8.21a1.5 1.5 0 0 1 1.49 1.334l.779 7A1.5 1.5 0 0 1 12.383 15H2.617a1.5 1.5 0 0 1-1.49-1.666z"
      />
    </svg>
  );
}
