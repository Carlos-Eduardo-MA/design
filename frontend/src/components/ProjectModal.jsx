import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

export const ProjectModal = ({ project, onClose }) => (
  <AnimatePresence>
    {project && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] bg-[#121212]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
        data-testid="project-modal"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#FBF9F5] rounded-3xl overflow-hidden max-w-3xl w-full max-h-[88vh] overflow-y-auto"
        >
          <div className="relative">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full max-h-[50vh] object-cover"
            />
            <button
              onClick={onClose}
              data-testid="project-modal-close"
              aria-label="Fechar"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FBF9F5]/90 backdrop-blur flex items-center justify-center hover:bg-[#E63946] hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-6 sm:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E63946] mb-2">
              {project.category}
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl mb-4" data-testid="project-modal-title">
              {project.title}
            </h3>
            <p className="text-neutral-600 leading-relaxed mb-8">{project.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[rgba(18,18,18,0.1)] pt-6 mb-8">
              {project.client && (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    Cliente
                  </p>
                  <p className="text-sm mt-1">{project.client}</p>
                </div>
              )}
              {project.year && (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    Ano
                  </p>
                  <p className="text-sm mt-1">{project.year}</p>
                </div>
              )}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  Entrega
                </p>
                <p className="text-sm mt-1">{project.category}</p>
              </div>
            </div>
            <a
              href={project.behance_url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="project-behance-link"
              className="inline-flex items-center gap-2 bg-[#0057FF] text-white px-6 py-3 rounded-full font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#121212] transition-colors duration-300"
            >
              Ver projeto no Behance <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
