import { artifact, type Language } from "@/content/artifact";
import { useState } from "react";

const LANGUAGES: readonly { code: Language; label: string }[] = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
];

/** The statue's record and description, switchable between Turkish and English. */
export default function ArtifactInfo() {
  const [language, setLanguage] = useState<Language>("tr");
  const copy = artifact.info[language];

  return (
    <div lang={language} className="space-y-5">
      <div role="group" aria-label="Dil seçimi / Language" className="grid grid-cols-2 gap-2">
        {LANGUAGES.map(({ code, label }) => (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={language === code}
            onClick={() => setLanguage(code)}
            className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
              language === code
                ? "border-amber-600 bg-amber-600 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <dl className="space-y-3">
        {copy.facts.map((fact) => (
          <div key={fact.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">{fact.label}</dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <section>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-900">
          {copy.descriptionLabel}
        </h4>
        <p className="text-sm leading-relaxed text-slate-600">{copy.description}</p>
      </section>
    </div>
  );
}
