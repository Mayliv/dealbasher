import { useState, useMemo } from "react";
import { Search, MessageCircle, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const faqSections = [
  {
    icon: "🔥",
    title: "Про сделки",
    items: [
      {
        q: "Как добавить скидку?",
        a: 'Нажми кнопку "Добавить сделку" в шапке сайта. Вставь ссылку на товар — мы постараемся автоматически подтянуть название и картинку. Укажи цену со скидкой и оригинальную цену, выбери категорию и опубликуй. Всё займёт 2 минуты.',
      },
      {
        q: "Почему мою сделку удалили?",
        a: "Чаще всего это происходит по одной из причин: сделка устарела и цена уже не актуальна, сообщество проголосовало против (температура ушла сильно в минус), или сделка нарушает правила публикации. Проверь правила и попробуй снова.",
      },
      {
        q: "Что такое температура сделки?",
        a: 'Температура — это рейтинг сделки от сообщества. Каждый голос "Огонь" добавляет градусы, голос "Холодно" убирает. Чем горячее сделка — тем выше она в ленте. Сделки с температурой выше +200° попадают в "Горячее прямо сейчас".',
      },
      {
        q: "Можно ли публиковать офлайн-скидки?",
        a: 'Да! Это одна из наших главных фишек. При добавлении сделки выбери "Офлайн в магазине", укажи город и адрес. Такие сделки видны пользователям из твоего города.',
      },
    ],
  },
  {
    icon: "🐛",
    title: "Про баги цен",
    items: [
      {
        q: "Что такое баг цены и это законно?",
        a: "Баг цены — это ошибка на сайте магазина, когда товар стоит значительно дешевле обычного. Покупатель не несёт никакой ответственности — ты просто купил товар по той цене, которую увидел. Суды в России и Казахстане однозначно встают на сторону покупателя в таких случаях.",
      },
      {
        q: "Почему другие сайты запрещают баги, а вы нет?",
        a: "Потому что это выгодно пользователям и не нарушает никаких законов. Мы на стороне покупателей, а не магазинов.",
      },
      {
        q: "Баг уже закрыли, что делать?",
        a: 'Нажми кнопку "Сделка устарела" на карточке. Это поможет другим пользователям не тратить время. Ты всё равно получишь очки за публикацию.',
      },
    ],
  },
  {
    icon: "👤",
    title: "Про аккаунт",
    items: [
      {
        q: "Зачем регистрироваться?",
        a: "Без регистрации можно смотреть сделки. С аккаунтом — голосовать, комментировать, публиковать сделки, получать уведомления о новых скидках в любимых категориях и копить репутацию.",
      },
      {
        q: "Как работают уровни и репутация?",
        a: "За каждую опубликованную сделку, полученный голос и комментарий ты получаешь очки репутации. Уровни: 🌱 Новичок → 🔥 Охотник → ⚡ Снайпер → 💎 Легенда. Высокий уровень даёт приоритет в ленте для твоих сделок.",
      },
    ],
  },
  {
    icon: "🌍",
    title: "Про регионы",
    items: [
      {
        q: "Чем отличаются регионы RU и KZ?",
        a: "Разные валюты (рубли/тенге), разные магазины (для KZ добавлены Kaspi, Mechta, Flip, Sulpak), разные города. Некоторые сделки глобальные и видны в обоих регионах.",
      },
      {
        q: "Я из Казахстана, могу видеть российские сделки?",
        a: "Да! Переключи регион в шапке сайта. Глобальные онлайн-сделки видны всегда, офлайн-сделки привязаны к городу.",
      },
    ],
  },
  {
    icon: "💰",
    title: "Про монетизацию",
    items: [
      {
        q: "DealBasher бесплатный?",
        a: "Да, полностью бесплатный для пользователей. Мы зарабатываем на партнёрских ссылках (affiliate) — когда ты переходишь по некоторым ссылкам на сделки, мы получаем небольшую комиссию от магазина. Это не влияет на цену для тебя.",
      },
      {
        q: "Магазины платят за размещение сделок?",
        a: "Нет. Все сделки публикуются пользователями бесплатно. Мы не принимаем платные размещения — это противоречит нашим принципам.",
      },
    ],
  },
];

const FaqPage = () => {
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return faqSections;
    const q = search.toLowerCase();
    return faqSections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.q.toLowerCase().includes(q) ||
            item.a.toLowerCase().includes(q)
        ),
      }))
      .filter((s) => s.items.length > 0);
  }, [search]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.3),transparent_60%)]" />
        <div className="container relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-primary-foreground md:text-5xl">
            Вопросы и ответы
          </h1>
          <p className="mb-8 text-lg text-primary-foreground/80">
            Всё что нужно знать о DealBasher — в одном месте
          </p>
          <div className="relative mx-auto max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Найти ответ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 rounded-xl border-none bg-background pl-11 text-base shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        {filtered.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            Ничего не найдено. Попробуйте другой запрос.
          </p>
        )}

        <div className="space-y-10">
          {filtered.map((section) => (
            <div key={section.title}>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
                <span className="text-2xl">{section.icon}</span>
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.items.map((item, idx) => {
                  const key = `${section.title}-${idx}`;
                  const isOpen = openItems.has(key);
                  return (
                    <div
                      key={key}
                      className="overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-card-foreground transition-colors hover:bg-accent/50"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-5 leading-relaxed text-muted-foreground">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Not found CTA */}
      <section className="border-t bg-muted/50 py-16">
        <div className="container mx-auto max-w-xl px-4 text-center">
          <MessageCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Не нашёл ответ?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Напиши нам — мы поможем разобраться
          </p>
          <Button size="lg" className="rounded-xl px-8 text-base" asChild>
            <Link to="/discussions">Написать нам →</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FaqPage;
