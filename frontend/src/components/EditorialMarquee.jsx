const TERMS = [
  "Branding",
  "Identidade Visual",
  "Estratégia de Marca",
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
              i % 2 ? "text-transparent" : "text-[#FBF9F5]"
            }`}
            style={i % 2 ? { WebkitTextStroke: "1.2px #FBF9F5" } : undefined}
          >
            {t}
          </span>
          <span className="w-2 h-2 rounded-full bg-[#FBF9F5]" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  const group = (key) => (
    <div className="flex shrink-0" key={key}>
      {row}
      {row}
    </div>
  );

  return (
    <div
      className="bg-[#121212] py-5 overflow-hidden select-none"
      data-testid="editorial-marquee"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        {group("marquee-group-1")}
        {group("marquee-group-2")}
      </div>
    </div>
  );
};
