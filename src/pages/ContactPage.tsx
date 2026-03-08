import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Mail, Bug, Send, Copy, Check, ExternalLink, ArrowRight, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", topic: "", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@dealbasher.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Email скопирован!" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.topic || !formData.message.trim()) {
      toast({ title: "Заполни все поля", variant: "destructive" });
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Mail className="w-4 h-4" />
            Поддержка
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Мы на связи</h1>
          <p className="text-lg text-muted-foreground">Обычно отвечаем в течение 24 часов</p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Telegram */}
            <div className="relative rounded-2xl border-2 border-[hsl(200,80%,55%)] bg-[hsl(200,80%,55%,0.05)] p-6 flex flex-col">
              <div className="absolute -top-3 left-4">
                <span className="bg-[hsl(200,80%,55%)] text-white text-xs font-bold px-3 py-1 rounded-full">Рекомендуем</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(200,80%,55%,0.15)] flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-[hsl(200,80%,55%)]" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Telegram — быстрее всего</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">Написать в поддержку, сообщить о баге или предложить идею</p>
              <a href="https://t.me/dealbasher_support" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-[hsl(200,80%,55%)] hover:bg-[hsl(200,80%,45%)] text-white gap-2">
                  <Send className="w-4 h-4" />
                  Написать @dealbasher_support
                </Button>
              </a>
              <p className="text-xs text-muted-foreground text-center mt-3">⚡ Обычно отвечаем за 2-4 часа</p>
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Email для партнёров</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">Сотрудничество, реклама (нативная), пресса</p>
              <Button variant="outline" className="w-full gap-2" onClick={handleCopyEmail}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Скопировано!" : "hello@dealbasher.com"}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">📧 Ответ в течение 24 часов</p>
            </div>

            {/* Bug Report */}
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center mb-4">
                <Bug className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Нашёл баг сайта?</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">Помоги нам стать лучше — сообщи об ошибке или предложи новую функцию</p>
              <Button variant="outline" className="w-full gap-2">
                <ExternalLink className="w-4 h-4" />
                Сообщить об ошибке
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">🐛 Каждый баг-репорт помогает</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold text-foreground mb-1">Написать нам</h2>
            <p className="text-muted-foreground text-sm mb-6">Заполни форму и мы ответим на указанный email</p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[hsl(var(--deal-success)/0.15)] flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-[hsl(var(--deal-success))]" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">✅ Сообщение отправлено!</h3>
                <p className="text-muted-foreground">Ответим на указанный email в течение 24 часов</p>
                <Button variant="outline" className="mt-6" onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", topic: "", message: "" }); }}>
                  Отправить ещё
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Ваше имя" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} maxLength={255} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Тема</Label>
                  <Select value={formData.topic} onValueChange={(v) => setFormData(p => ({ ...p, topic: v }))}>
                    <SelectTrigger><SelectValue placeholder="Выберите тему" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="question">Вопрос</SelectItem>
                      <SelectItem value="bug">Баг на сайте</SelectItem>
                      <SelectItem value="partnership">Сотрудничество</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea id="message" placeholder="Опишите ваш вопрос..." rows={5} value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} maxLength={1000} />
                </div>
                <Button type="submit" className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Отправить сообщение
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">🤝 Присоединяйся к сообществу</h2>
          <p className="text-muted-foreground mb-8">Будь в курсе лучших скидок каждый день</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "📢", title: "Telegram канал", desc: "Лучшие сделки дня", btn: "Подписаться", href: "https://t.me/dealbasher" },
              { icon: "💬", title: "Telegram чат", desc: "Обсуждение скидок", btn: "Вступить", href: "https://t.me/dealbasher_chat" },
              { icon: "🔵", title: "VK группа", desc: "DealBasher ВКонтакте", btn: "Подписаться", href: "https://vk.com/dealbasher" },
            ].map((s) => (
              <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors block">
                <span className="text-3xl mb-3 block">{s.icon}</span>
                <h3 className="font-bold text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                <span className="text-sm font-medium text-primary">{s.btn} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Shortcut */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link to="/faq" className="flex items-center justify-between rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors group">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-foreground">Возможно ответ уже есть в FAQ</span>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
