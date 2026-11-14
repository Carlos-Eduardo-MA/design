import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowLeft, ArrowRight, MessageCircle, X } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/config";

const InquiryContext = createContext(null);

const INITIAL_INQUIRY = {
  name: "",
  business: "",
  segment: "",
  onlinePresence: "",
  services: [],
  brandStage: "",
  goal: "",
  timeline: "",
  details: "",
};

const SERVICES = [
  "Branding e estratégia",
  "Identidade visual",
  "Rebranding",
  "Direção de arte",
  "Design digital ou editorial",
  "Design impresso",
  "UI & UX",
  "Ainda não sei",
];

const FIELD_CLASS =
  "min-h-[52px] w-full rounded-xl border border-[rgba(18,18,18,0.12)] bg-white px-4 py-3 text-base outline-none transition-colors placeholder:text-neutral-400 focus:border-[#6D2932] focus:ring-2 focus:ring-[#6D2932]/10 sm:text-sm";
const LABEL_CLASS =
  "mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500";

export const useWhatsAppInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error(
      "useWhatsAppInquiry must be used within a WhatsAppInquiryProvider",
    );
  }
  return context;
};

export const WhatsAppInquiryProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [inquiry, setInquiry] = useState(INITIAL_INQUIRY);
  const [servicesError, setServicesError] = useState(false);
  const formRef = useRef(null);

  const openInquiry = useCallback(() => setIsOpen(true), []);
  const closeInquiry = useCallback(() => {
    setIsOpen(false);
    setStep(1);
    setInquiry(INITIAL_INQUIRY);
    setServicesError(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeInquiry();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, [closeInquiry, isOpen]);

  const updateInquiry = (field) => (event) => {
    setInquiry((current) => ({ ...current, [field]: event.target.value }));
  };

  const toggleService = (service) => {
    setInquiry((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
    setServicesError(false);
  };

  const message = [
    "Olá, Bia! Vim pelo seu site e queria conversar sobre um projeto.",
    "",
    "*SOBRE MIM E MEU NEGÓCIO*",
    `*Nome:* ${inquiry.name}`,
    `*Negócio/marca:* ${inquiry.business}`,
    `*Segmento:* ${inquiry.segment}`,
    ...(inquiry.onlinePresence
      ? [`*Site ou Instagram:* ${inquiry.onlinePresence}`]
      : []),
    "",
    "*SOBRE O PROJETO*",
    `*Serviços de interesse:* ${inquiry.services.join(", ")}`,
    `*Momento da marca:* ${inquiry.brandStage}`,
    `*O que gostaria de alcançar:* ${inquiry.goal}`,
    `*Prazo desejado:* ${inquiry.timeline}`,
    `*Desafio ou contexto:* ${inquiry.details}`,
  ].join("\n");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step >= 3) return;
    if (step === 2 && inquiry.services.length === 0) {
      setServicesError(true);
      return;
    }
    setStep((current) => current + 1);
  };

  const contextValue = useMemo(() => ({ openInquiry }), [openInquiry]);

  return (
    <InquiryContext.Provider value={contextValue}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[#121212]/70 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeInquiry();
          }}
          data-testid="whatsapp-inquiry-overlay"
        >
          <section
            className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#FBF9F5] shadow-2xl sm:h-auto sm:max-h-[92dvh] sm:max-w-2xl sm:rounded-3xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-inquiry-title"
            data-testid="whatsapp-inquiry-dialog"
          >
            <button
              type="button"
              onClick={closeInquiry}
              aria-label="Fechar briefing"
              data-testid="close-whatsapp-inquiry-button"
              className="absolute right-5 top-[max(1rem,env(safe-area-inset-top))] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#121212]/10 bg-[#FBF9F5] text-neutral-600 transition-colors hover:bg-[#E8D8C4]"
            >
              <X size={18} />
            </button>

            <header className="shrink-0 border-b border-[#121212]/10 px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-5 sm:px-9 sm:pt-8">
              <div className="flex items-center justify-between gap-4 pr-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6D2932]">
                  Briefing inicial
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">
                  {String(step).padStart(2, "0")} / 03
                </span>
              </div>
              <h2
                id="whatsapp-inquiry-title"
                className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#121212] sm:text-4xl"
              >
                {["Seu negócio", "O que sua marca precisa?", "O projeto"][step - 1]}
              </h2>
              <div
                className="mt-5 grid grid-cols-3 gap-2"
                role="progressbar"
                aria-label="Progresso do briefing"
                aria-valuemin="1"
                aria-valuemax="3"
                aria-valuenow={step}
              >
                {[1, 2, 3].map((progressStep) => (
                  <span
                    key={progressStep}
                    className={`h-1 rounded-full transition-colors ${
                      progressStep <= step ? "bg-[#6D2932]" : "bg-[#E8D8C4]"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </header>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="whatsapp-inquiry-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-9 sm:py-7">
                {step === 1 && (
                <div className="space-y-4" data-testid="whatsapp-inquiry-step-1">
                  <p className="text-sm leading-relaxed text-neutral-600">
                    Primeiro, me conta quem você é e um pouco sobre o negócio.
                  </p>
                  <label className="block">
                    <span className={LABEL_CLASS}>Seu nome</span>
                    <input
                      required
                      autoFocus
                      autoComplete="name"
                      value={inquiry.name}
                      onChange={updateInquiry("name")}
                      placeholder="Como posso te chamar?"
                      className={FIELD_CLASS}
                      data-testid="whatsapp-inquiry-name"
                    />
                  </label>
                  <label className="block">
                    <span className={LABEL_CLASS}>Nome do negócio ou marca</span>
                    <input
                      required
                      value={inquiry.business}
                      onChange={updateInquiry("business")}
                      placeholder="Pode ser um nome provisório"
                      className={FIELD_CLASS}
                      data-testid="whatsapp-inquiry-business"
                    />
                  </label>
                  <label className="block">
                    <span className={LABEL_CLASS}>Qual é o seu segmento?</span>
                    <input
                      required
                      value={inquiry.segment}
                      onChange={updateInquiry("segment")}
                      placeholder="Ex.: saúde, gastronomia, moda..."
                      className={FIELD_CLASS}
                      data-testid="whatsapp-inquiry-segment"
                    />
                  </label>
                  <label className="block">
                    <span className={LABEL_CLASS}>Site ou Instagram (opcional)</span>
                    <input
                      type="text"
                      value={inquiry.onlinePresence}
                      onChange={updateInquiry("onlinePresence")}
                      placeholder="@seunegocio ou seunegocio.com.br"
                      className={FIELD_CLASS}
                      data-testid="whatsapp-inquiry-online-presence"
                    />
                  </label>
                </div>
                )}

                {step === 2 && (
                <div className="space-y-5" data-testid="whatsapp-inquiry-step-2">
                  <p className="text-sm leading-relaxed text-neutral-600">
                    Selecione os serviços que parecem fazer sentido. A gente
                    pode alinhar isso melhor na conversa.
                  </p>
                  <fieldset>
                    <legend className={LABEL_CLASS}>O que você procura?</legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {SERVICES.map((service) => {
                        const selected = inquiry.services.includes(service);
                        return (
                          <label
                            key={service}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition-colors ${
                              selected
                                ? "border-[#6D2932] bg-[#E8D8C4]/50 text-[#561C24]"
                                : "border-[#121212]/10 bg-white hover:border-[#6D2932]/50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => toggleService(service)}
                              className="accent-[#6D2932]"
                              data-testid={`whatsapp-inquiry-service-${SERVICES.indexOf(service)}`}
                            />
                            {service}
                          </label>
                        );
                      })}
                    </div>
                    {servicesError && (
                      <p className="mt-2 text-sm text-[#6D2932]" role="alert">
                        Selecione ao menos um serviço ou “Ainda não sei”.
                      </p>
                    )}
                  </fieldset>
                  <label className="block">
                    <span className={LABEL_CLASS}>Em que momento está sua marca?</span>
                    <select
                      required
                      value={inquiry.brandStage}
                      onChange={updateInquiry("brandStage")}
                      className={FIELD_CLASS}
                      data-testid="whatsapp-inquiry-brand-stage"
                    >
                      <option value="" disabled>Selecione uma opção</option>
                      <option>Estou começando um negócio</option>
                      <option>Já tenho uma marca e quero reposicioná-la</option>
                      <option>Preciso organizar ou atualizar minha comunicação</option>
                      <option>Tenho uma demanda pontual de design</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className={LABEL_CLASS}>O que você gostaria de alcançar?</span>
                    <input
                      required
                      value={inquiry.goal}
                      onChange={updateInquiry("goal")}
                      placeholder="Ex.: transmitir mais confiança, atrair outro público..."
                      className={FIELD_CLASS}
                      data-testid="whatsapp-inquiry-goal"
                    />
                  </label>
                </div>
                )}

                {step === 3 && (
                <div className="space-y-4" data-testid="whatsapp-inquiry-step-3">
                  <p className="text-sm leading-relaxed text-neutral-600">
                    Com um pouco mais de contexto, consigo entender melhor o
                    desafio e te orientar nos próximos passos.
                  </p>
                  <label className="block">
                    <span className={LABEL_CLASS}>Qual prazo você tem em mente?</span>
                    <select
                      required
                      value={inquiry.timeline}
                      onChange={updateInquiry("timeline")}
                      className={FIELD_CLASS}
                      data-testid="whatsapp-inquiry-timeline"
                    >
                      <option value="" disabled>Selecione uma opção</option>
                      <option>O quanto antes</option>
                      <option>Nos próximos 1 a 3 meses</option>
                      <option>Daqui a mais de 3 meses</option>
                      <option>Estou pesquisando, sem prazo definido</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className={LABEL_CLASS}>O que mais eu deveria saber?</span>
                    <textarea
                      required
                      minLength={5}
                      rows={4}
                      value={inquiry.details}
                      onChange={updateInquiry("details")}
                      placeholder="Conte sobre seu desafio, seus clientes ou a ideia que quer tirar do papel."
                      className={`${FIELD_CLASS} resize-y`}
                      data-testid="whatsapp-inquiry-details"
                    />
                  </label>
                  <p className="text-xs leading-relaxed text-neutral-500">
                    Ao abrir o WhatsApp, suas respostas serão incluídas no
                    rascunho da conversa com a Bia. A mensagem só será enviada
                    quando você tocar em Enviar no WhatsApp.
                  </p>
                </div>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-3 border-t border-[#121212]/10 bg-[#FBF9F5] px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-9 sm:py-5">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((current) => current - 1)}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#121212]/15 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[#121212] transition-colors hover:bg-[#E8D8C4]"
                    data-testid="whatsapp-inquiry-back"
                  >
                    <ArrowLeft size={14} /> Voltar
                  </button>
                ) : (
                  <span />
                )}
                {step < 3 ? (
                  <button
                    type="submit"
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#561C24] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#6D2932] sm:flex-initial"
                    data-testid="whatsapp-inquiry-next"
                  >
                    Continuar <ArrowRight size={14} />
                  </button>
                ) : (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => {
                      if (!formRef.current || !formRef.current.reportValidity()) {
                        event.preventDefault();
                        return;
                      }
                      window.setTimeout(closeInquiry, 0);
                    }}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#561C24] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#6D2932] sm:flex-initial"
                    data-testid="whatsapp-inquiry-next"
                  >
                    Abrir WhatsApp <MessageCircle size={15} />
                  </a>
                )}
              </div>
            </form>
          </section>
        </div>
      )}
    </InquiryContext.Provider>
  );
};
