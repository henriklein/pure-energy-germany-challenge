import React, { useEffect, useState } from 'react';

/**
 * Candidate Challenge Page (fixed JSX, with runtime self-checks)
 * - Restores full content and closes all tags correctly
 * - Adds a live countdown to 14:45
 * - Keeps timeline card (top-right of hero)
 * - Adds meeting links under the hero
 * - Includes lightweight runtime tests via console.assert (dev only)
 */

type Section = { id: string; label: string };

export default function CandidateChallengePage() {
  const sections: Section[] = [
    { id: 'tab-overview', label: 'Overview' },
    { id: 'tab-task', label: 'Aufgabe' },
    { id: 'tab-working', label: 'Während der Vorbereitung' },
    { id: 'tab-pitch', label: 'Was du vorstellen sollst' },
    { id: 'tab-materials', label: 'Materialien' },
    { id: 'tab-about', label: 'Über uns' },
    { id: 'tab-faq', label: 'FAQ' },
    { id: 'tab-contact', label: 'Kontakt' },
  ];

  const activeBg = 'bg-[#77BE21]';
  const activeText = 'text-[#F3EEE7]';

  const [activeId, setActiveId] = useState<string>('tab-overview');
  const [countdown, setCountdown] = useState<string>('00:00:00');

  // Scroll spy
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (!('IntersectionObserver' in window)) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  // Countdown to 14:45 (today, local time)
  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const tick = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(14, 45, 0, 0);
      let diff = target.getTime() - now.getTime();
      if (diff < 0) diff = 0;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(`${pad(h)}:${pad(m)}:${pad(s)}`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Dev-time self checks (acts as simple runtime tests)
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    // Only run in dev builds
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production') return;

    const mustHaveIds = sections.map((s) => s.id);
    mustHaveIds.forEach((id) => {
      // eslint-disable-next-line no-console
      console.assert(!!document.getElementById(id), `[SelfCheck] Missing section #${id}`);
    });

    const reTime = /^\d{2}:\d{2}:\d{2}$/;
    // eslint-disable-next-line no-console
    console.assert(reTime.test(countdown), '[SelfCheck] Countdown format should be HH:MM:SS');
  }, [countdown, sections]);

  const navClasses = (id: string) =>
    `block rounded-xl border border-[#04252B]/10 p-4 hover:shadow transition ${
      activeId === id ? `${activeBg} ${activeText}` : 'bg-white text-[#04252B]'
    }`;

  return (
    <div className="min-h-screen bg-[#F3EEE7] text-[#04252B] font-sans" data-testid="page-root">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#F3EEE7]/90 backdrop-blur border-b border-[#04252B]/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.prod.website-files.com/6851230f794c51bed168c638/68c29c0e7e4bbf8edd83bd61_PEG%20v1.png"
              alt="Pure Energy Germany Logo"
              className="h-10 w-auto"
              loading="eager"
              decoding="async"
            />
            <div className="leading-tight">
              <div className="font-semibold">Pure Energy Germany</div>
              <div className="text-sm text-[#04252B]/70">Sales Challenge – Closer Call</div>
            </div>
          </div>
          <a
            href="#start"
            className="inline-flex items-center gap-2 rounded-full bg-[#77BE21] px-4 py-2 text-[#04252B] font-semibold hover:opacity-90 transition"
          >
            Start
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M13.5 4.5 21 12l-7.5 7.5m7.5-7.5H3" />
            </svg>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
                Deine Sales Challenge
                <span className="block text-[#77BE21]">Closer Call – fairMieterstrom</span>
              </h1>
              <p className="mt-4 text-lg text-[#04252B]/80">
                Du überzeugst zwei Eigentümer in einem realitätsnahen Closer Call. Kein
                Skript – wir wollen sehen, wie du arbeitest, strukturierst und unter Druck
                präsentierst.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full bg-[#04252B] text-white px-3 py-1 text-sm">Start 12:30</span>
                <span className="inline-flex items-center rounded-full bg-[#04252B] text-white px-3 py-1 text-sm">Vorbereitung bis 14:45</span>
                <span className="inline-flex items-center rounded-full bg-[#04252B] text-white px-3 py-1 text-sm">Pitch ~20 Min</span>
                <span className="inline-flex items-center rounded-full bg-[#04252B] text-white px-3 py-1 text-sm">Q&A danach</span>
              </div>

              {/* Meet links directly under tags in hero */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a
                  href="https://meet.google.com/qzk-zmgk-edf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-[#04252B]/10 p-4 bg-white hover:shadow"
                  data-testid="meet-1-hero"
                >
                  <div className="text-sm text-[#04252B]/60">Google Meet</div>
                  <div className="font-semibold group-hover:underline">Kick-off 12:30–12:50</div>
                  <div className="text-sm text-[#04252B]/70">qzk-zmgk-edf</div>
                </a>
                <a
                  href="https://meet.google.com/tfw-pevy-xuq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-[#04252B]/10 p-4 bg-white hover:shadow"
                  data-testid="meet-2-hero"
                >
                  <div className="text-sm text-[#04252B]/60">Google Meet</div>
                  <div className="font-semibold group-hover:underline">Closer Call 14:45–15:45</div>
                  <div className="text-sm text-[#04252B]/70">tfw-pevy-xuq</div>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-[#04252B]/10 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-semibold tracking-wide uppercase text-[#04252B]/60">Timeline</div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#77BE21] px-3 py-1 text-sm font-semibold text-[#04252B]">
                    Countdown bis 14:45 <span className="font-mono" data-testid="countdown">{countdown}</span>
                  </div>
                </div>
                <ol className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#77BE21]" />
                    <div>
                      <div className="text-sm font-semibold tracking-wide uppercase text-[#04252B]/70">12:30–12:50</div>
                      <div className="text-lg font-semibold">Kick-off</div>
                      <p className="text-[#04252B]/80">Szenario & Unterlagen. 2–3 Verständnisfragen erlaubt.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#77BE21]" />
                    <div>
                      <div className="text-sm font-semibold tracking-wide uppercase text-[#04252B]/70">12:50–14:45</div>
                      <div className="text-lg font-semibold">Eigenständige Vorbereitung</div>
                      <p className="text-[#04252B]/80">Arbeite mit PDFs, Website, Socials & allem, was du finden kannst.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#77BE21]" />
                    <div>
                      <div className="text-sm font-semibold tracking-wide uppercase text-[#04252B]/70">ab 14:45</div>
                      <div className="text-lg font-semibold">Closer Call</div>
                      <p className="text-[#04252B]/80">Freier Dialog (~20 Min) – überzeuge die Eigentümer.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#77BE21]" />
                    <div>
                      <div className="text-sm font-semibold tracking-wide uppercase text-[#04252B]/70">danach</div>
                      <div className="text-lg font-semibold">Q&A/Einwände</div>
                      <p className="text-[#04252B]/80">Wir fragen nach, um deine Herangehensweise zu verstehen.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* Tabs */}
      <section id="start" className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-6">
          <aside className="lg:col-span-1">
            <nav className="sticky top-20 space-y-2" aria-label="Sektionen">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className={navClasses(s.id)}>
                  {s.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="lg:col-span-2 space-y-8">
            <section id="tab-overview" className="rounded-2xl bg-white border border-[#04252B]/10 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="mt-2 text-[#04252B]/80">
                Ziel ist ein überzeugender Closer Call. Beantworte drei Kernfragen: <strong>Warum fairMieterstrom?</strong>, <strong>Warum Pure Energy?</strong>, <strong>Warum nicht abwarten?</strong> Wir bewerten Vorgehen, Klarheit, Nutzenargumente, Einwandbehandlung und Next Steps.
              </p>
              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-[#04252B]/10 p-4">
                  <div className="text-sm text-[#04252B]/60">Fokus</div>
                  <div className="font-semibold">Eigene Argumentationslinie, kein Skript</div>
                </div>
                <div className="rounded-xl border border-[#04252B]/10 p-4">
                  <div className="text-sm text-[#04252B]/60">Dauer</div>
                  <div className="font-semibold">Vorbereitung bis 14:45, Pitch ~20 Min</div>
                </div>
                <div className="rounded-xl border border-[#04252B]/10 p-4">
                  <div className="text-sm text-[#04252B]/60">Format</div>
                  <div className="font-semibold">Freier Dialog + Q&A</div>
                </div>
              </div>
            </section>

            <section id="tab-task" className="rounded-2xl bg-white border border-[#04252B]/10 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Deine Aufgabe</h2>
              <p className="mt-2 text-[#04252B]/80">Du übernimmst die Rolle eines Vertriebsmitarbeiters in einem Closer Call mit Eigentümern eines Mehrfamilienhauses mit <strong>6 Wohneinheiten</strong> (siehe Beispiel).</p>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-[#04252B]/80">
                <li><strong>Warum fairMieterstrom?</strong> – Fokus auf den Mehrwert, der durch die <strong>WEESS</strong>-Hardware (z. B. PowerTower, Zugspitze) ermöglicht wird.</li>
                <li><strong>Warum Pure Energy Germany?</strong> – warum wir als Unternehmen der richtige Partner sind.</li>
                <li><strong>Warum nicht abwarten?</strong> – wieso jetzt entscheiden und was Eigentümer konkret davon haben.</li>
              </ul>
            </section>

            <section id="tab-working" className="rounded-2xl bg-white border border-[#04252B]/10 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Während der Vorbereitung (12:50–14:45)</h2>
              <p className="mt-2 text-[#04252B]/80">Arbeite eigenständig. Baue aus wenigen Informationen eine schlüssige, kundenorientierte Story. Erkläre uns im Pitch kurz deine Herangehensweise.</p>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#04252B]/10 p-4">
                  <div className="text-xs font-semibold uppercase text-[#04252B]/60">Do</div>
                  <div className="font-medium">Zahlen/Argumente aus PDFs extrahieren, Nutzen ableiten, klare Struktur bauen.</div>
                </div>
                <div className="rounded-xl border border-[#04252B]/10 p-4">
                  <div className="text-xs font-semibold uppercase text-[#04252B]/60">Do</div>
                  <div className="font-medium">Website/Socials/Partnerquellen (inkl. WEESS) für Kontext & Proof nutzen.</div>
                </div>
                <div className="rounded-xl border border-[#04252B]/10 p-4">
                  <div className="text-xs font-semibold uppercase text-red-600">Avoid</div>
                  <div className="font-medium">Nur Flyer vorlesen oder 1:1 KI-Text verwenden.</div>
                </div>
                <div className="rounded-xl border border-[#04252B]/10 p-4">
                  <div className="text-xs font-semibold uppercase text-[#04252B]/60">Reach</div>
                  <div className="font-medium">Henri ist im Chat erreichbar für kurze Verständnisfragen.</div>
                </div>
              </div>
            </section>

            <section id="tab-pitch" className="rounded-2xl bg-white border border-[#04252B]/10 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Was du vorstellen sollst (freier Dialog ~20 Min)</h2>
              <ol className="mt-3 list-decimal pl-6 space-y-2 text-[#04252B]/80">
                <li><strong>Warum fairMieterstrom?</strong> – Positionierung vs. Alternativen; konkreter Mehrwert durch WEESS.</li>
                <li><strong>Warum Pure Energy?</strong> – unsere Eignung als Partner.</li>
                <li><strong>Warum nicht abwarten?</strong> – Dringlichkeit & Opportunitätskosten.</li>
                <li><strong>Nächste Schritte</strong> – klarer Vorschlag (z. B. Termin, Datenliste, Verantwortlichkeiten).</li>
              </ol>
              <p className="mt-3 text-sm text-[#04252B]/70">Hinweis: Du musst kein Transkript oder ausformuliertes Skript abgeben – freier Vortrag genügt.</p>
            </section>

            <section id="tab-materials" className="rounded-2xl bg-white border border-[#04252B]/10 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Unterlagen & Links</h2>
              <div className="mt-2 text-[#04252B]/80 space-y-2">
                <p><a className="underline font-medium" href="https://weess.com/#/home" target="_blank" rel="noopener noreferrer">Link zum Hersteller (WEESS)</a> – <span className="text-[#04252B]/70">PowerTower & Zugspitze sind relevant</span></p>
                <p><a className="underline font-medium" href="https://pure-energy-germany.de" target="_blank" rel="noopener noreferrer">pure-energy-germany.de</a> – <span className="text-[#04252B]/70">allgemeine Infos & Cases</span></p>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <a className="group rounded-xl border border-[#04252B]/10 p-4 hover:shadow transition bg-white" href="https://drive.google.com/file/d/1dIRv3En6aI56XeKaFIC5FWLWW-yutcj_/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <div className="text-sm text-[#04252B]/60">PDF</div>
                  <div className="font-semibold group-hover:underline">Flyer – fairMieterstrom Erstkontakt Eigentümer</div>
                  <div className="text-sm text-[#04252B]/70">Google Drive</div>
                </a>
                <a className="group rounded-xl border border-[#04252B]/10 p-4 hover:shadow transition bg-white" href="https://drive.google.com/file/d/15nT-latalmgGbKbHsS0butsh6U6oPmNu/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <div className="text-sm text-[#04252B]/60">PDF</div>
                  <div className="font-semibold group-hover:underline">Flyer – fairMieterstrom Erstkontakt Mieter</div>
                  <div className="text-sm text-[#04252B]/70">Google Drive</div>
                </a>
                <a className="group rounded-xl border border-[#04252B]/10 p-4 hover:shadow transition bg-white" href="https://drive.google.com/file/d/1qVbltfWZyFr-CZQ0nq2uZTZTeePTdS73/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <div className="text-sm text-[#04252B]/60">PDF</div>
                  <div className="font-semibold group-hover:underline">Flyer – fairMieterstrom Onboarding Mieter</div>
                  <div className="text-sm text-[#04252B]/70">Google Drive</div>
                </a>
              </div>
            </section>

            <section id="tab-about" className="rounded-2xl bg-white border border-[#04252B]/10 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Über uns</h2>
              <p className="mt-2 text-[#04252B]/80">Pure Energy Germany entwickelt und betreibt faire, wirtschaftliche PV-Lösungen für Mehrfamilienhäuser. Wir kombinieren Bauhandwerks-DNA mit effizienter, digitaler Abwicklung – von Planung über Installation bis Abrechnung.</p>
              <p className="mt-2"><a className="underline font-medium" href="https://pure-energy-germany.de/blog/wer-sind-wir-und-was-machen-wir" target="_blank" rel="noopener noreferrer">Mehr über uns (Blogartikel)</a></p>
              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-[#04252B]/10 p-4">
                  <div className="text-sm text-[#04252B]/60">Modell</div>
                  <div className="font-semibold">fairMieterstrom – einfach, rechtssicher, wirtschaftlich</div>
                </div>
                <div className="rounded-xl border border-[#04252B]/10 p-4">
                  <div className="text-sm text-[#04252B]/60">Versprechen</div>
                  <div className="font-semibold">Kundennutzen & klare Prozesse statt Bürokratie</div>
                </div>
                <div className="rounded-xl border border-[#04252B]/10 p-4">
                  <div className="text-sm text-[#04252B]/60">Service</div>
                  <div className="font-semibold">Alles aus einer Hand – inkl. App-Transparenz</div>
                </div>
              </div>
            </section>

            <section id="tab-faq" className="rounded-2xl bg-white border border-[#04252B]/10 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">FAQ</h2>
              <div className="mt-4 space-y-4">
                <details className="group rounded-xl border border-[#04252B]/10 p-4">
                  <summary className="cursor-pointer font-semibold">Brauche ich ein geschriebenes Skript?</summary>
                  <p className="mt-2 text-[#04252B]/80">Nein. Freier Vortrag reicht – wichtig ist deine Struktur & Überzeugungskraft.</p>
                </details>
                <details className="group rounded-xl border border-[#04252B]/10 p-4">
                  <summary className="cursor-pointer font-semibold">Darf ich online recherchieren?</summary>
                  <p className="mt-2 text-[#04252B]/80">Ja. Nutze Website, Socials und die PDFs. Zitiere knapp, übersetze in Kundennutzen.</p>
                </details>
                <details className="group rounded-xl border border-[#04252B]/10 p-4">
                  <summary className="cursor-pointer font-semibold">Wen kann ich kontaktieren?</summary>
                  <p className="mt-2 text-[#04252B]/80">Henri ist im Chat erreichbar für kurze Verständnisfragen.</p>
                </details>
              </div>
            </section>

            <section id="tab-contact" className="rounded-2xl bg-white border border-[#04252B]/10 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Kontakt</h2>
              <p className="mt-2 text-[#04252B]/80">Bei Rückfragen während der Vorbereitung: Henri – bitte nur kurze Verständnisfragen, keine inhaltliche Beratung.</p>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#04252B]/10 p-4">
                  <div className="text-sm text-[#04252B]/60">Telefon</div>
                  <div className="font-semibold">+49 160 5812203</div>
                </div>
                <div className="rounded-xl border border-[#04252B]/10 p-4">
                  <div className="text-sm text-[#04252B]/60">E‑Mail</div>
                  <a className="font-semibold underline" href="mailto:h.klein@pure-energy-germany.de">h.klein@pure-energy-germany.de</a>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a className="inline-flex items-center gap-2 rounded-full bg-[#77BE21] px-4 py-2 text-[#04252B] font-semibold hover:opacity-90" href="#tab-materials">Zu den Materialien</a>
                <a className="inline-flex items-center gap-2 rounded-full border border-[#04252B]/20 px-4 py-2 font-semibold hover:bg-[#04252B]/5" href="#tab-pitch">Pitch vorbereiten</a>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#04252B]/10 py-8">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#04252B]/70">© 2025 Pure Energy Germany – eine Marke der Oskomera GmbH. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="https://pure-energy-germany.de/impressum" target="_blank" rel="noopener noreferrer" className="underline">Impressum</a>
            <a href="https://pure-energy-germany.de/datenschutz" target="_blank" rel="noopener noreferrer" className="underline">Datenschutz</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

