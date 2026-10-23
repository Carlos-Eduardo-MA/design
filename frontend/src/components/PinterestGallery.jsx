import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Search, Heart, ArrowUpRight } from "lucide-react";
import { API, getProjectImageUrl } from "@/config";

const RATIO_CLASS = {
  tall: "aspect-[4/5]",
  square: "aspect-square",
  wide: "aspect-[16/10]",
};

export const PinterestGallery = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Todos");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("duarte_saved") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    axios
      .get(`${API}/projects`)
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["Todos", ...new Set(projects.map((p) => p.category))],
    [projects]
  );

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const byCat = filter === "Todos" || p.category === filter;
        const q = query.trim().toLowerCase();
        const byQuery =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q);
        return byCat && byQuery;
      }),
    [projects, filter, query]
  );

  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id];
      localStorage.setItem("duarte_saved", JSON.stringify(next));
      return next;
    });
  };

  return (
    <section id="portfolio" className="py-24 sm:py-32" data-testid="portfolio-section">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#121212]" /> Portfólio
            </p>
            <h2 className="font-serif font-bold tracking-tight text-4xl sm:text-5xl">
              Trabalhos que contam
              <br />
              <em className="bg-[#C7B7A3] px-2 rounded-lg inline-block -rotate-1">histórias de marca</em>
            </h2>
          </div>
          <div className="relative w-full md:w-72">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar projeto..."
              data-testid="portfolio-search-input"
              className="w-full bg-white border border-[rgba(18,18,18,0.12)] rounded-full pl-11 pr-4 py-3 text-sm outline-none focus:border-[#121212] transition-colors"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-12"
          data-testid="portfolio-filters"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              data-testid={`portfolio-filter-${c === "Todos" ? "all" : c.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className={`font-mono text-xs uppercase tracking-[0.15em] px-4 py-2 rounded-full border transition-colors duration-300 ${
                filter === c
                  ? "bg-[#121212] text-[#FBF9F5] border-[#121212]"
                  : "border-[rgba(18,18,18,0.15)] text-neutral-600 hover:border-[#121212]"
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="mb-5 break-inside-avoid rounded-2xl bg-[#F3F0EA] animate-pulse aspect-[4/5]"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-neutral-500 py-20" data-testid="portfolio-empty">
            Nenhum projeto encontrado por aqui. Tente outra busca.
          </p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5" data-testid="portfolio-grid">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => navigate(`/projeto/${p.id}`)}
                data-testid={`project-card-${i + 1}`}
                className="mb-5 break-inside-avoid group cursor-pointer"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-[#F3F0EA] ${
                    RATIO_CLASS[p.ratio] || RATIO_CLASS.tall
                  }`}
                >
                  <img
                    src={getProjectImageUrl(p.image_url)}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <button
                    onClick={(e) => toggleSave(e, p.id)}
                    data-testid={`project-save-${i + 1}`}
                    aria-label="Salvar projeto"
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                      saved.includes(p.id)
                        ? "bg-[#6D2932] text-white opacity-100"
                        : "bg-white/70 text-[#121212] opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Heart size={15} fill={saved.includes(p.id) ? "currentColor" : "none"} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between gap-3">
                    <div>
                      <p className="font-serif text-xl text-white">{p.title}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 mt-1">
                        {p.category} {p.year && `· ${p.year}`}
                      </p>
                    </div>
                    <span className="shrink-0 w-9 h-9 rounded-full bg-white text-[#121212] flex items-center justify-center">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-1 pt-3">
                  <div>
                    <h3 className="font-serif text-lg leading-tight">{p.title}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">{p.category}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400 group-hover:text-[#121212] transition-colors flex items-center gap-1">
                    Ver <ArrowUpRight size={11} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
