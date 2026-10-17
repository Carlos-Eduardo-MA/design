import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { LogOut, Plus, Trash2, Mail, Loader2, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { API, ADMIN_TOKEN_KEY } from "@/config";

const emptyForm = {
  title: "",
  category: "",
  image_url: "",
  description: "",
  year: "",
  client: "",
  ratio: "tall",
};

const field =
  "w-full bg-white border border-[rgba(18,18,18,0.12)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#121212] transition-colors placeholder:text-neutral-400";

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(ADMIN_TOKEN_KEY) || "");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const authHeaders = useCallback(
    () => ({ headers: { Authorization: `Bearer ${token}` } }),
    [token]
  );

  const loadData = useCallback(async () => {
    try {
      const [p, m] = await Promise.all([
        axios.get(`${API}/projects`),
        axios.get(`${API}/messages`, authHeaders()),
      ]);
      setProjects(p.data);
      setMessages(m.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        setToken("");
      }
    }
  }, [authHeaders]);

  useEffect(() => {
    if (token) loadData();
  }, [token, loadData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const { data } = await axios.post(`${API}/auth/login`, loginForm);
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setToken(data.token);
      toast.success(`Bem-vinda, ${data.user.name}!`);
    } catch (err) {
      const detail = err.response?.data?.detail;
      setLoginError(typeof detail === "string" ? detail : "Erro ao entrar. Tente novamente.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken("");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post(`${API}/projects`, form, authHeaders());
      toast.success("Projeto adicionado à galeria!");
      setForm(emptyForm);
      loadData();
    } catch (err) {
      toast.error("Não foi possível salvar o projeto.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/projects/${id}`, authHeaders());
      toast.success("Projeto removido.");
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      toast.error("Não foi possível remover.");
    }
  };

  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center px-5" data-testid="admin-login-page">
        <div className="noise-overlay" aria-hidden="true" />
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-8">
            <Logo size={48} />
            <h1 className="font-serif text-3xl mt-4">Painel da galeria</h1>
            <p className="text-sm text-neutral-500 mt-1">Acesso restrito à Bia</p>
          </div>
          <form onSubmit={handleLogin} className="bg-[#F3F0EA] rounded-3xl p-8 space-y-4" data-testid="admin-login-form">
            <input
              type="email"
              required
              placeholder="E-mail"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              data-testid="admin-email-input"
              className={field}
            />
            <input
              type="password"
              required
              placeholder="Senha"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              data-testid="admin-password-input"
              className={field}
            />
            {loginError && (
              <p className="text-sm text-[#121212]" data-testid="admin-login-error">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              disabled={loggingIn}
              data-testid="admin-login-submit"
              className="w-full bg-[#121212] text-[#FBF9F5] rounded-full py-3.5 font-mono text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loggingIn ? <Loader2 size={16} className="animate-spin" /> : "Entrar"}
            </button>
          </form>
          <Link
            to="/"
            data-testid="admin-back-home"
            className="flex items-center justify-center gap-2 mt-6 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={14} /> Voltar ao site
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" data-testid="admin-panel">
      <div className="noise-overlay" aria-hidden="true" />
      <header className="border-b border-[rgba(18,18,18,0.08)] bg-[rgba(251,249,245,0.85)] backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={30} />
            <span className="font-serif text-lg">Painel da galeria</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" data-testid="admin-view-site" className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-500 hover:text-neutral-900 transition-colors">
              Ver site
            </Link>
            <button
              onClick={handleLogout}
              data-testid="admin-logout-btn"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[#121212] hover:opacity-70 transition-opacity"
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 grid lg:grid-cols-[380px_1fr] gap-10">
        <section>
          <h2 className="font-serif text-2xl mb-5 flex items-center gap-2">
            <Plus size={20} className="text-[#121212]" /> Novo projeto
          </h2>
          <form onSubmit={handleCreate} className="bg-[#F3F0EA] rounded-3xl p-6 space-y-3" data-testid="admin-project-form">
            <input
              required
              placeholder="Título do projeto"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              data-testid="admin-input-title"
              className={field}
            />
            <input
              required
              placeholder="Categoria (ex: Branding, Editorial)"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              data-testid="admin-input-category"
              className={field}
            />
            <input
              required
              type="url"
              placeholder="URL da imagem"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              data-testid="admin-input-image"
              className={field}
            />
            <textarea
              rows={3}
              placeholder="Descrição curta"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              data-testid="admin-input-description"
              className={`${field} resize-none`}
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="Ano"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                data-testid="admin-input-year"
                className={field}
              />
              <input
                placeholder="Cliente"
                value={form.client}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
                data-testid="admin-input-client"
                className={field}
              />
            </div>
            <select
              value={form.ratio}
              onChange={(e) => setForm({ ...form, ratio: e.target.value })}
              data-testid="admin-input-ratio"
              className={field}
            >
              <option value="tall">Formato: vertical (4:5)</option>
              <option value="square">Formato: quadrado (1:1)</option>
              <option value="wide">Formato: horizontal (16:10)</option>
            </select>
            <button
              type="submit"
              disabled={saving}
              data-testid="admin-project-submit"
              className="w-full bg-[#121212] text-[#FBF9F5] rounded-full py-3.5 font-mono text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : "Adicionar à galeria"}
            </button>
          </form>

          <h2 className="font-serif text-2xl mt-10 mb-5 flex items-center gap-2">
            <Mail size={20} className="text-[#121212]" /> Mensagens ({messages.length})
          </h2>
          <div className="space-y-3" data-testid="admin-messages-list">
            {messages.length === 0 && (
              <p className="text-sm text-neutral-500">Nenhuma mensagem por enquanto.</p>
            )}
            {messages.map((m) => (
              <div key={m.id} className="bg-white rounded-2xl border border-[rgba(18,18,18,0.08)] p-4" data-testid={`admin-message-${m.id}`}>
                <div className="flex justify-between gap-3 mb-1">
                  <p className="font-medium text-sm">{m.name}</p>
                  <p className="text-xs text-neutral-400">{m.email}</p>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">{m.message}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-5">Projetos na galeria ({projects.length})</h2>
          <div className="grid sm:grid-cols-2 gap-4" data-testid="admin-projects-list">
            {projects.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-[rgba(18,18,18,0.08)] overflow-hidden group"
                data-testid={`admin-project-${p.id}`}
              >
                <div className="aspect-[16/10] bg-[#EFECE6] overflow-hidden">
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-serif text-lg leading-tight">{p.title}</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {p.category} {p.year && `· ${p.year}`}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(p.id)}
                    data-testid={`admin-delete-${p.id}`}
                    aria-label={`Excluir ${p.title}`}
                    className="shrink-0 w-9 h-9 rounded-full border border-[rgba(18,18,18,0.1)] flex items-center justify-center text-neutral-400 hover:bg-[#121212] hover:text-white hover:border-[#121212] transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
