import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { API } from "@/config";

export const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Mensagem enviada! Respondo em até 1 dia útil.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Não consegui enviar. Tente pelo WhatsApp, vai?");
    } finally {
      setSending(false);
    }
  };

  const field =
    "w-full bg-white border border-[rgba(18,18,18,0.12)] rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#121212] transition-colors placeholder:text-neutral-400";

  return (
    <section id="contato" className="py-24 sm:py-32" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#E63946]" /> Contato
            </p>
            <h2 className="font-serif font-medium tracking-tight text-4xl sm:text-6xl mb-6">
              Tem uma marca
              <br />
              pra <em className="text-[#E63946]">nascer?</em>
            </h2>
            <p className="text-neutral-600 leading-relaxed max-w-md mb-10">
              Me conta a ideia — pode ser rabiscada mesmo. Eu retorno com um
              papo honesto sobre caminhos, prazos e investimento.
            </p>
            <div className="space-y-4">
              <a
                href="mailto:ola@duarte.studio"
                data-testid="contact-email-link"
                className="flex items-center gap-3 text-sm text-neutral-700 hover:text-[#E63946] transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-[#F3F0EA] flex items-center justify-center">
                  <Mail size={16} />
                </span>
                ola@duarte.studio
              </a>
              <p className="flex items-center gap-3 text-sm text-neutral-700">
                <span className="w-10 h-10 rounded-full bg-[#F3F0EA] flex items-center justify-center">
                  <MapPin size={16} />
                </span>
                São Paulo · atende o Brasil inteiro
              </p>
              <p className="flex items-center gap-3 text-sm text-neutral-700">
                <span className="w-10 h-10 rounded-full bg-[#F3F0EA] flex items-center justify-center font-serif font-bold">
                  D
                </span>
                Segunda a sexta, 9h às 18h
              </p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#F3F0EA] rounded-3xl p-6 sm:p-10 space-y-4"
            data-testid="contact-form"
          >
            <div>
              <label htmlFor="contact-name" className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-2">
                Seu nome
              </label>
              <input
                id="contact-name"
                type="text"
                required
                minLength={2}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Como posso te chamar?"
                data-testid="contact-name-input"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-2">
                Seu e-mail
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="voce@empresa.com"
                data-testid="contact-email-input"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-2">
                Sua ideia
              </label>
              <textarea
                id="contact-message"
                required
                minLength={5}
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Conta um pouco do projeto: o que é, onde quer chegar, prazos..."
                data-testid="contact-message-input"
                className={`${field} resize-none`}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              data-testid="contact-submit-btn"
              className="w-full bg-[#121212] text-[#FBF9F5] rounded-full py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#E63946] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {sending ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Enviando...
                </>
              ) : (
                <>
                  Enviar mensagem <Send size={14} />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
