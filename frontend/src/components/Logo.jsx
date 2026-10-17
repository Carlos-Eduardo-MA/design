export const Logo = ({ size = 34, dark = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    data-testid="logo-mark"
  >
    <rect width="64" height="64" rx="14" fill={dark ? "#561C24" : "#E8D8C4"} />
    <text
      x="30"
      y="45"
      textAnchor="middle"
      fontFamily="Archivo, sans-serif"
      fontWeight="900"
      fontSize="38"
      fill={dark ? "#E8D8C4" : "#561C24"}
    >
      B
    </text>
    <circle cx="49" cy="17" r="5" fill="#C7B7A3" />
  </svg>
);
