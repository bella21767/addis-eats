export default function Logo({ size = 40 }) {
  return (
    <svg
      className="logo-svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Addis Eats logo"
    >
      <defs>
        <linearGradient id="aeLogoBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e2574a" />
          <stop offset="1" stopColor="#9e2a1f" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="url(#aeLogoBg)" />
      <path
        d="M22 24c-3-3 3-5 0-9M32 24c-3-3 3-5 0-11M42 24c-3-3 3-5 0-9"
        stroke="#fcdd09"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="10" y="29" width="44" height="6" rx="3" fill="#f2a900" />
      <path d="M14 36h36c0 11-8 18-18 18S14 47 14 36z" fill="#fff6ec" />
      <circle cx="24" cy="43" r="2.8" fill="#078930" />
      <circle cx="32" cy="45" r="2.8" fill="#f5c400" />
      <circle cx="40" cy="43" r="2.8" fill="#da121a" />
    </svg>
  );
}