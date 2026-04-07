import Link from "next/link";
import {
  Building2,
  ArrowRight,
  Shield,
  Zap,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
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
              Built on Solana &middot; Sub-second finality
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Own Your Home
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                Without a Mortgage
              </span>
            </h1>
            <p className="mt-6 text-lg text-blue-100 max-w-2xl">
              Crowdfund your home purchase on Solana. Investors buy property
              tokens, you move in and buy back over time. Save $200K+ compared
              to a 30-year mortgage.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Browse Properties
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold border border-blue-500 hover:bg-blue-600 transition-colors"
              >
                List Your Property
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
              <div className="text-3xl font-bold text-red-600">$707,000</div>
              <div className="text-sm text-slate-500 mt-1">
                Traditional mortgage total cost (30yr @ 6.38%)
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">$450,000</div>
              <div className="text-sm text-slate-500 mt-1">
                HomeCrowd total cost (rent + buyback)
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">$257,000</div>
              <div className="text-sm text-slate-500 mt-1">
                You save — no bank, no 30 years of debt
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="mt-3 text-slate-600">
              Three simple steps to homeownership
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Building2,
                title: "List Your Property",
                desc: "Create a campaign with property details. The platform tokenizes it into affordable $10 shares on Solana.",
              },
              {
                step: "02",
                icon: Users,
                title: "Investors Crowdfund",
                desc: "Investors browse properties and buy tokens with USDC. When fully funded, the property is purchased.",
              },
              {
                step: "03",
                icon: TrendingUp,
                title: "Move In & Buy Back",
                desc: "You move in, pay rent to token holders. Gradually buy back tokens until you own 100%.",
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

      {/* Why Solana */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              Why This Only Works on Solana
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
              If you remove Solana, HomeCrowd breaks. Here&apos;s why.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: DollarSign,
                title: "Micro-transactions at Scale",
                desc: "Monthly rent distribution to 500+ token holders costs ~$1 total on Solana. On Ethereum, that's $2,000+ in gas fees — making the entire model economically impossible.",
              },
              {
                icon: Zap,
                title: "400ms Finality",
                desc: "Instant token purchases and real-time rent distribution. No waiting 12 seconds for block confirmation. Property tokens trade as fast as stocks.",
              },
              {
                icon: Shield,
                title: "Regulatory Alignment",
                desc: "KASE (Kazakhstan Stock Exchange) signed a memorandum with Solana Foundation. Stablecoin Tenge already issued on Solana in the National Bank regulatory sandbox.",
              },
              {
                icon: Clock,
                title: "Compressed NFTs for Documents",
                desc: "Property documents, appraisals, and legal records stored as compressed NFTs on Solana — 1000x cheaper than any other chain for on-chain document management.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-6 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors"
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
          <h2 className="text-3xl font-bold">Ready to Own Your Future?</h2>
          <p className="mt-4 text-blue-200">
            Join the revolution in homeownership. No banks, no 30-year debt, no
            $357K overpayment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Investing
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
