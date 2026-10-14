export const Logo = ({ size = 34, dark = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    data-testid="logo-mark"
  >
    <rect width="64" height="64" rx="14" fill={dark ? "#121212" : "#FBF9F5"} />
    <path
      d="M20 16h12c9.94 0 18 7.16 18 16s-8.06 16-18 16H20V16zm6 6v20h6c6.63 0 12-4.48 12-10s-5.37-10-12-10h-6z"
      fill={dark ? "#FBF9F5" : "#121212"}
    />
    <circle cx="50" cy="16" r="5" fill="#E63946" />
  </svg>
);
