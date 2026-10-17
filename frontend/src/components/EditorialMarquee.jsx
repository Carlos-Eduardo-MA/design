const TERMS = [
  "Branding",
  "Identidade Visual",
  "Estratégia de Marca",
  "Naming",
  "Editorial",
  "Packaging",
  "Posicionamento",
  "Tipografia",
];

export const EditorialMarquee = () => {
  const row = (
    <div className="flex shrink-0 items-center">
      {TERMS.map((t, i) => (
        <span key={t} className="flex items-center">
          <span
            className={`font-serif italic text-2xl sm:text-3xl px-6 ${
              i % 2 ? "text-transparent" : "text-[#121212]"
            }`}
            style={i % 2 ? { WebkitTextStroke: "1.2px #121212" } : undefined}
          >
            {t}
          </span>
          <span className="w-2 h-2 rounded-full bg-[#121212]" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="border-y border-[rgba(18,18,18,0.1)] bg-[#F3F0EA] py-5 overflow-hidden select-none"
      data-testid="editorial-marquee"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
};
