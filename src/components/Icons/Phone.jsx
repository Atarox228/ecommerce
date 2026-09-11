export default function Phone({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      idth="1em"
      height="1em"
      viewBox="0 0 16 16"
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

      <path d="M0 0h16v16H0z" fill="none" />
      <path
        fill="url(#gradient-footer-icons)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="m3.855 7.286l1.067-.534a1 1 0 0 0 .542-1.046l-.44-2.858A1 1 0 0 0 4.036 2H3a1 1 0 0 0-1 1v2c0 .709.082 1.4.238 2.062a9.01 9.01 0 0 0 6.7 6.7A9 9 0 0 0 11 14h2a1 1 0 0 0 1-1v-1.036a1 1 0 0 0-.848-.988l-2.858-.44a1 1 0 0 0-1.046.542l-.534 1.067a7.52 7.52 0 0 1-4.86-4.859"
      />
    </svg>
  );
}
