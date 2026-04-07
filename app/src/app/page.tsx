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
} from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-700/50 border border-blue-500/30 text-sm mb-6">
              <Zap className="h-4 w-4 text-yellow-400" />
              Built on Solana &middot; KASE Partnership &middot; Digital Tenge
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Своя квартира
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                без ипотеки
              </span>
            </h1>
            <p className="mt-6 text-lg text-blue-100 max-w-2xl">
              Краудфандинг недвижимости на Solana. Инвесторы покупают токены
              квартиры, вы заселяетесь и выкупаете долю за 5-7 лет. Экономия
              $131,000 по сравнению с ипотекой в Казахстане.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Смотреть квартиры
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold border border-blue-500 hover:bg-blue-600 transition-colors"
              >
                Разместить квартиру
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Stats */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">$250,000</div>
              <div className="text-sm text-slate-500 mt-1">
                Ипотека в КЗ: итого за $80K квартиру (20 лет, 18%)
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">$119,000</div>
              <div className="text-sm text-slate-500 mt-1">
                HomeCrowd: аренда + выкуп токенов за 5-7 лет
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">$131,000</div>
              <div className="text-sm text-slate-500 mt-1">
                Вы экономите — без банка, без 20 лет долга
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Как это работает</h2>
            <p className="mt-3 text-slate-600">
              Три простых шага к собственной квартире
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Building2,
                title: "Разместите квартиру",
                desc: "Создайте кампанию с данными о квартире. Платформа токенизирует её в доступные доли по $8 на Solana.",
              },
              {
                step: "02",
                icon: Users,
                title: "Инвесторы финансируют",
                desc: "Инвесторы покупают токены за USDC. Когда цель достигнута — квартира приобретается через ТОО в AIFC.",
              },
              {
                step: "03",
                icon: TrendingUp,
                title: "Заселяйтесь и выкупайте",
                desc: "Вы заселяетесь, платите аренду токенхолдерам. Постепенно выкупаете токены до 100% владения.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-white rounded-xl p-8 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="text-6xl font-bold text-slate-100 absolute top-4 right-4">
                  {item.step}
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asel's Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              История Асель
            </h2>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="space-y-4 text-slate-700">
              <p>
                <strong>Асель, 26 лет</strong>, работает в Алматы, зарплата 500,000 KZT (~$1,000).
                Нашла 1-комнатную квартиру за <strong>$80,000</strong> в Бостандыкском районе.
                Накопила <strong>$15,000</strong>.
              </p>
              <p>
                Создаёт кампанию: <strong>10,000 токенов по $8</strong>. Покупает 1,875 токенов
                ($15,000 = 18.75%). <strong>200 инвесторов</strong> покрывают оставшиеся $65,000.
              </p>
              <p>
                Асель заселяется, платит <strong>$650/месяц</strong> аренды (81.25% от рыночных $800).
                Ежемесячно выкупает токены — <strong>полное владение за 5-7 лет</strong>.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">$250,000</div>
                  <div className="text-xs text-slate-500">С ипотекой (18%, 20 лет)</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">$119,000</div>
                  <div className="text-xs text-slate-500">С HomeCrowd (5-7 лет)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Solana */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              Почему только Solana
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
              Убери Solana — HomeCrowd перестаёт работать
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Landmark,
                title: "KASE × Solana Foundation",
                desc: "Казахстанская фондовая биржа подписала меморандум с Solana Foundation. Институциональная поддержка токенизации RWA в Казахстане.",
              },
              {
                icon: DollarSign,
                title: "Стейблкоин Тенге на Solana",
                desc: "Цифровой тенге уже выпущен на Solana в регуляторной песочнице Нацбанка РК при поддержке Mastercard. Будущая интеграция — покупка токенов напрямую в KZT.",
              },
              {
                icon: Zap,
                title: "Транзакции за $0.001",
                desc: "Распределение аренды 200 держателям: ~$0.40 на Solana vs $800+ на Ethereum. При аренде $650/мес в Алматы, газ Ethereum превысил бы саму аренду.",
              },
              {
                icon: Shield,
                title: "AIFC + English Law",
                desc: "AIFC (Астана) работает по английскому праву — цифровые активы уже регулируются. SPV (ТОО) в AIFC обеспечивает юридическую связь токенов и недвижимости.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-6 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors bg-white"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Готовы владеть своим будущим?</h2>
          <p className="mt-4 text-blue-200">
            70% населения Казахстана моложе 35 лет. Пора менять правила игры.
            Без банков, без 20 лет долга, без переплаты $170,000.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Начать инвестировать
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
