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
    <text
      x="30"
      y="45"
      textAnchor="middle"
      fontFamily="Georgia, 'Playfair Display', serif"
      fontWeight="bold"
      fontSize="40"
      fill={dark ? "#FBF9F5" : "#121212"}
    >
      B
    </text>
    <circle cx="49" cy="17" r="5" fill="#FF4A1F" />
  </svg>
);
