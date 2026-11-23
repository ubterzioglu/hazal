import { Card } from "@/components/ui/card";
import { AR_GUIDE_ID, artifact } from "@/content/artifact";
import { Lightbulb, Smartphone } from "lucide-react";
import { Link } from "wouter";

/** Step-by-step instructions for placing the statue in the visitor's room. */
export default function ArGuide() {
  return (
    <section id={AR_GUIDE_ID} aria-labelledby={`${AR_GUIDE_ID}-title`} className="mt-12 scroll-mt-24">
      <Card className="border-0 bg-white p-6 shadow-lg md:p-8">
        <div className="mb-6">
          <h2 id={`${AR_GUIDE_ID}-title`} className="mb-2 font-serif text-2xl font-bold text-slate-900">
            {artifact.arGuide.title}
          </h2>
          <p className="text-sm text-slate-600">{artifact.arGuide.intro}</p>
        </div>

        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {artifact.arGuide.steps.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <span
                aria-hidden="true"
                className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white"
              >
                {index + 1}
              </span>
              <h3 className="mb-1 text-sm font-semibold text-slate-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-lg border border-amber-200/50 bg-gradient-to-r from-amber-50 to-orange-50 p-4">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Lightbulb className="h-4 w-4 text-amber-600" />
            İpuçları
          </p>
          <ul className="space-y-1 text-sm text-slate-600">
            {artifact.arGuide.tips.map((tip) => (
              <li key={tip} className="flex gap-2">
                <span className="text-amber-600">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/ar"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700 md:w-auto"
        >
          <Smartphone className="h-5 w-5" />
          Şimdi Dene
        </Link>
      </Card>
    </section>
  );
}
