import { ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen hero-background flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center bg-white/70 backdrop-blur-2xl p-10 md:p-14 rounded-3xl border border-white/40 shadow-xl text-zinc-900">
        <div className="space-y-6">
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Pro Event Design
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-zinc-900">
            Conference Expense <span className="text-zinc-400 font-light">Planner.</span>
          </h1>
          <p className="text-zinc-600 text-sm leading-relaxed font-normal">
            Effortlessly architect and price your upcoming corporate events with extreme clarity and elegance.
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full transition-all shadow-md text-xs tracking-wide"
          >
            Get Started <ArrowRight size={16} />
          </button>
        </div>
        <div className="space-y-4 text-zinc-600 text-sm leading-relaxed border-l border-zinc-200 pl-8 md:pl-10">
          <h2 className="text-base font-semibold text-zinc-900">BudgetEase Solutions</h2>
          <p className="text-zinc-500">
            Designed to streamline precision budgeting. We empower businesses to curate high-end professional gatherings without the friction.
          </p>
          <p className="text-zinc-500">
            Clean, intuitive, and meticulously crafted for precision control over every single operational expense.
          </p>
        </div>
      </div>
    </div>
  );
}