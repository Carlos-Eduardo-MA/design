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
            className={`font-serif font-bold italic text-2xl sm:text-3xl px-6 ${
              i % 2 ? "text-transparent" : "text-[#E8D8C4]"
            }`}
            style={i % 2 ? { WebkitTextStroke: "1.2px #E8D8C4" } : undefined}
          >
            {t}
          </span>
          <span className="w-2 h-2 rounded-full bg-[#E8D8C4]" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="bg-[#561C24] py-5 overflow-hidden select-none"
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
