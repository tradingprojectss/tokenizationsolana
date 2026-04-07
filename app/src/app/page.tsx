import Link from "next/link";
import {
  Building2,
  ArrowRight,
  Shield,
  Zap,
  TrendingUp,
  Users,
  DollarSign,
  Landmark,
  ChevronRight,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-sm mb-8 animate-slide-up">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-slate-300">KASE × Solana Foundation</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-medium">Digital Tenge</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <span className="text-white">Своя квартира</span>
              <br />
              <span className="text-gradient">без ипотеки</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Краудфандинг недвижимости на Solana. Инвесторы покупают токены,
              вы заселяетесь и выкупаете долю за 5-7 лет.
            </p>

            {/* Key stat */}
            <div className="mt-8 flex items-center gap-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass-light">
                <div className="text-3xl font-extrabold text-gradient">$131K</div>
                <div className="text-xs text-slate-400 leading-tight">экономия<br/>vs ипотека</div>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass-light">
                <div className="text-3xl font-extrabold text-emerald-400">5-7</div>
                <div className="text-xs text-slate-400 leading-tight">лет до<br/>100% владения</div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Link
                href="/properties"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Смотреть квартиры
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-7 py-3.5 glass border border-white/10 text-white rounded-xl font-semibold hover:bg-white/5 transition-all"
              >
                Разместить квартиру
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative border-y border-white/5">
        <div className="absolute inset-0 radial-glow-blue" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "$250K", label: "Ипотека в КЗ за $80K квартиру", sub: "20 лет, 18% годовых", color: "text-red-400", borderColor: "border-red-500/20", bgColor: "bg-red-500/5" },
              { value: "$119K", label: "HomeCrowd: аренда + выкуп", sub: "5-7 лет, без банка", color: "text-emerald-400", borderColor: "border-emerald-500/20", bgColor: "bg-emerald-500/5" },
              { value: "$131K", label: "Вы экономите", sub: "без переплаты банку", color: "text-blue-400", borderColor: "border-blue-500/20", bgColor: "bg-blue-500/5" },
            ].map((stat) => (
              <div key={stat.label} className={`text-center p-6 rounded-2xl ${stat.bgColor} border ${stat.borderColor}`}>
                <div className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-slate-300 mt-1">{stat.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-blue-400 font-medium mb-4">
              <BadgeCheck className="h-3.5 w-3.5" /> Как это работает
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Три шага к своей квартире
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: Building2,
                title: "Разместите квартиру",
                desc: "Создайте кампанию с данными о квартире. Платформа токенизирует её в доли по $8 на Solana.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                step: "02",
                icon: Users,
                title: "Инвесторы финансируют",
                desc: "Инвесторы покупают токены за USDC. Когда цель достигнута — квартира приобретается через ТОО.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                step: "03",
                icon: TrendingUp,
                title: "Заселяйтесь и выкупайте",
                desc: "Вы заселяетесь, платите аренду токенхолдерам. Постепенно выкупаете до 100% владения.",
                gradient: "from-emerald-500 to-teal-500",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="group relative rounded-2xl p-[1px] card-hover"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative rounded-2xl bg-[#111827] p-7 h-full">
                  <div className="text-5xl font-black text-white/5 absolute top-4 right-5">
                    {item.step}
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asel's Story */}
      <section className="py-24 relative">
        <div className="absolute inset-0 radial-glow-green" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              История Асель
            </h2>
            <p className="mt-3 text-slate-400">Реальный сценарий использования HomeCrowd</p>
          </div>

          <div className="rounded-3xl p-[1px] bg-gradient-to-br from-blue-500/50 via-purple-500/50 to-emerald-500/50">
            <div className="rounded-3xl bg-[#0d1117] p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">А</div>
                <div>
                  <div className="font-bold text-white text-lg">Асель, 26 лет</div>
                  <div className="text-sm text-slate-500">Алматы, зарплата 500K ₸/мес</div>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Нашла 1-комнатную квартиру за <span className="text-white font-semibold">$80,000</span> в Бостандыкском районе.
                  Накопила <span className="text-white font-semibold">$15,000</span>.
                </p>
                <p>
                  Создаёт кампанию: <span className="text-blue-400 font-semibold">10,000 токенов по $8</span>. Покупает 1,875 токенов
                  (18.75%). <span className="text-purple-400 font-semibold">200 инвесторов</span> покрывают оставшиеся $65,000.
                </p>
                <p>
                  Заселяется, платит <span className="text-white font-semibold">$650/мес</span> аренды.
                  Ежемесячно выкупает токены — <span className="text-emerald-400 font-semibold">полное владение за 5-7 лет</span>.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5 text-center">
                  <div className="text-xs text-red-400 font-medium mb-1">С ипотекой (18%, 20 лет)</div>
                  <div className="text-2xl font-extrabold text-red-400">$250,000</div>
                  <div className="text-xs text-slate-500 mt-1">переплата $170K</div>
                </div>
                <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-5 text-center">
                  <div className="text-xs text-emerald-400 font-medium mb-1">С HomeCrowd (5-7 лет)</div>
                  <div className="text-2xl font-extrabold text-emerald-400">$119,000</div>
                  <div className="text-xs text-slate-500 mt-1">переплата $39K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Solana */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-purple-400 font-medium mb-4">
              <Zap className="h-3.5 w-3.5" /> Убери Solana — продукт ломается
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Почему только Solana
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: Landmark,
                title: "KASE × Solana Foundation",
                desc: "Казахстанская фондовая биржа подписала меморандум с Solana Foundation. Институциональная поддержка токенизации RWA.",
                glow: "glow-purple",
                iconBg: "from-purple-500 to-indigo-600",
              },
              {
                icon: DollarSign,
                title: "Стейблкоин Тенге",
                desc: "Digital Tenge выпущен на Solana в регуляторной песочнице Нацбанка при поддержке Mastercard. Будущее — покупка токенов в KZT.",
                glow: "glow-green",
                iconBg: "from-emerald-500 to-teal-600",
              },
              {
                icon: Zap,
                title: "Транзакции за $0.001",
                desc: "Распределение аренды 200 держателям: $0.40 на Solana vs $800+ на Ethereum. При аренде $650/мес газ Ethereum превысит саму аренду.",
                glow: "glow-blue",
                iconBg: "from-blue-500 to-cyan-600",
              },
              {
                icon: Shield,
                title: "AIFC + English Law",
                desc: "AIFC работает по английскому праву — цифровые активы регулируются. ТОО в AIFC обеспечивает юридическую связь токенов и недвижимости.",
                glow: "glow-blue",
                iconBg: "from-sky-500 to-blue-600",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`group flex gap-5 p-6 rounded-2xl glass border border-white/5 hover:border-blue-500/20 card-hover`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Готовы владеть своим будущим?
          </h2>
          <p className="mt-5 text-lg text-slate-400 max-w-xl mx-auto">
            70% населения Казахстана моложе 35 лет. Без банков, без 20 лет долга.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/properties"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all"
            >
              Начать инвестировать
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
