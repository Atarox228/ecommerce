export default function Socials({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 28 28"
      className={className}
    >
      <defs>
        <linearGradient
          id="gradient-footer-icons"
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
      <path d="M0 0h28v28H0z" fill="none" />
      <path
        fill="url(#gradient-footer-icons)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 4.75A2.75 2.75 0 0 1 9.75 2h8.5A2.75 2.75 0 0 1 21 4.75v18.5A2.75 2.75 0 0 1 18.25 26h-8.5A2.75 2.75 0 0 1 7 23.25zM12.25 21a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5z"
      />
    </svg>
  );
}
