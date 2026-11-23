import { Card } from "@/components/ui/card";
import { methodology } from "@/content/methodology";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { BookOpen } from "lucide-react";
import { Link } from "wouter";

/** Plain-language account of how the AR experience was made. */
export default function Methodology() {
  useDocumentMeta({
    title: "Metodoloji | Mausolos AR Deneyimi",
    description:
      "Bodrum’un kültürel mirasının eksik parçalarından biri olan Mausolos heykelinin artırılmış gerçeklik deneyiminin nasıl hazırlandığı.",
    path: "/metodoloji",
  });

  const { conclusion } = methodology;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
        <div className="container flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-slate-900">Metodoloji</h1>
              <p className="text-xs text-slate-500">Mausolos AR Deneyimi</p>
            </div>
          </div>
          <Link href="/" className="text-sm font-medium text-amber-700 underline-offset-4 hover:underline">
            Ana sayfa
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl py-12">
        <section className="mb-10">
          <h2 className="mb-5 font-serif text-3xl font-bold text-slate-900">{methodology.title}</h2>
          <Card className="space-y-4 border-0 bg-white p-6 shadow-lg md:p-8">
            {methodology.intro.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
          </Card>
        </section>

        <ol className="space-y-4">
          {methodology.steps.map((step, index) => (
            <li key={step.title}>
              <Card className="flex-row items-start gap-4 border-0 bg-white p-6 shadow-lg">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-600 font-bold text-white"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="mb-2 font-serif text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="leading-relaxed text-slate-700">{step.text}</p>
                </div>
              </Card>
            </li>
          ))}
        </ol>

        <section className="mt-10">
          <Card className="space-y-6 border-0 bg-white p-6 shadow-lg md:p-8">
            <h3 className="font-serif text-2xl font-bold text-slate-900">{conclusion.title}</h3>
            <div>
              <h4 className="mb-3 text-lg font-semibold text-slate-900">{conclusion.achievedTitle}</h4>
              <ul className="space-y-2 text-slate-700">
                {conclusion.achieved.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-amber-600">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-lg font-semibold text-slate-900">{conclusion.futureTitle}</h4>
              <ul className="space-y-2 text-slate-700">
                {conclusion.future.map((item) => (
                  <li key={item.label} className="flex gap-2">
                    <span className="text-amber-600">→</span>
                    <span>
                      <strong>{item.label}:</strong> {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
