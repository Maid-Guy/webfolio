import { useState } from "react"
import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"

// Content of the dialog

export function DialogNoCloseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Who is this?</Button>
      </DialogTrigger>
      {/* bg/border/text hier explizit setzen, damit der Dialog zum dunklen
          Farbschema der Hauptseite passt (die Standardfarben von DialogContent
          sind für ein helles Theme gedacht). */}
      <DialogContent
        showCloseButton={false}
        className="border border-white/10 bg-neutral-900 text-white sm:max-w-lg"
      >
        <DialogHeader className="items-center gap-4 text-center">
          <img
            src="/images/me-stein.jpg"
            alt="Riccardo Barone"
            className="size-28 rounded-full object-cover ring-2 ring-chart-4/40"
          />

          <div>
            <DialogTitle className="text-xl font-bold tracking-tight text-white">
              Riccardo Barone
            </DialogTitle>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-chart-4">
              Developer · Animator · Sound Designer · Gamer 
            </p>
          </div>

          <DialogDescription className="max-w-sm text-base leading-7 text-neutral-300">
            I build interactive experiences. This portfolio showcases my
            mini-applications, visual experiments, animations, illustrations,
            and music projects.
          </DialogDescription>

          <a
            href="mailto:R_Barone@web.de"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-chart-4 hover:text-chart-4"
          >
            R_Barone@web.de
          </a>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

// --- Typen: sie beschreiben, welche Felder ein Objekt haben MUSS ---
// Ein Medien-Element (Bild ODER Video) hat immer eine Quelle (src) und einen
// Beschreibungstext (alt) für Barrierefreiheit.
type MediaItem = { src: string; alt: string }

// Ein Register (Tab) hat eine id, ein label und je eine Liste Bilder, Videos und Sounds.
type Tab = {
  id: string
  label: string
  images: MediaItem[]
  videos: MediaItem[]
  audios: MediaItem[]
}

// --- Daten für die Register (Tabs) ---
// Neue Register fügst du einfach hier in das Array ein.
const tabs: Tab[] = [
  {
    id: "illustrations",
    label: "Illustrations",
    images: [
      { src: "/images/Kinich_Zip-Hoodie_2024-10.png", alt: "Kinich" },
      { src: "/images/Skyfolk Concept.jpg", alt: "Skyfolk" },
      { src: "/images/mermaid_blue.jpeg", alt: "Riccardo Barone" },
      { src: "/images/mermaid_orange.jpeg", alt: "Riccardo Barone" },
      { src: "/images/mermaid_pink.jpeg", alt: "Riccardo Barone" },
    ],
    videos: [],
    audios: [],
  },
  {
    id: "animations",
    label: "Animations",
    images: [],
    videos: [
      // Sobald deine Datei in public/videos/ liegt, diese Zeile aktivieren
      // (das "//" davor entfernen) und Pfad + Beschreibung anpassen:
     { src: "/videos/Animationsbeispiele_Riccardo_Barone_2026.mp4", alt: "Animations-Compilation" },
     { src: "/videos/bee_a_bomb_scarface.mp4", alt: "Scarface-Parody" },
    ],
    audios: [],
  },
  {
    id: "sounds",
    label: "Sounds",
    images: [],
    videos: [],
    audios: [
      // Sobald deine mp3 in public/audio/ liegt, diese Zeile aktivieren
      // (das "//" davor entfernen) und Pfad + Beschreibung anpassen:
    { src: "/sound/Main Menu Music.mp3", alt: "Main menu screen music for Deja Two" },
    { src: "/sound/tao_nyx_lvl_bg-music.mp3", alt: "Level background music for The Adventures Of Nyx" },
    ],
  },
  { id: "apps", label: "Mini-Apps", images: [], videos: [], audios: [] },
]

function App() {
  // "activeTab" merkt sich, welches Register gerade ausgewählt ist.
  // Startwert ist das erste Register (tabs[0]) -> "Illustrations".
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  // Wir suchen aus dem Array das Register heraus, das gerade aktiv ist.
  const currentTab = tabs.find((tab) => tab.id === activeTab)

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* justify-start statt justify-center: der Inhalt wird oben "verankert"
          statt als Ganzes vertikal zentriert. Sonst würde sich beim
          Tab-Wechsel (unterschiedliche Inhaltshöhe) die komplette Sektion
          samt Header verschieben. */}
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-start px-6 py-20">
        <div className="flex flex-row justify-around">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-chart-4">
            Developer · Illustrator · Sound Designer · Gamer
          </p>
          <DialogNoCloseButton />
        </div>

        <div className="bg-neutral-900 mt-20 rounded-lg p-8">

          {/* --- Register-Leiste (Labels zum Auswählen) --- */}
          {/* Wir gehen mit .map() durch alle Tabs und erzeugen pro Tab einen Button. */}
          <div className="flex flex-row flex-wrap gap-2 border-b border-white/10 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={
                  "rounded-full px-4 py-2 text-sm font-medium transition " +
                  (tab.id === activeTab
                    ? "bg-chart-4 text-chart-1"
                    : "text-neutral-300 hover:bg-white/10 hover:text-white")
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* --- Inhalt des aktiven Registers --- */}
          {/* min-h-64 reserviert eine Mindesthöhe (so hoch wie eine Bilderreihe),
              damit leere Register nicht winzig wirken. Ist mehr Inhalt da,
              wächst die Box einfach nach unten. */}
          <div className="mt-6 flex min-h-64 flex-col items-center justify-center gap-8">
            {currentTab &&
            (currentTab.images.length > 0 ||
              currentTab.videos.length > 0 ||
              currentTab.audios.length > 0) ? (
              <>
                {/* Bilder und Videos als quadratisches Raster nebeneinander */}
                {(currentTab.images.length > 0 ||
                  currentTab.videos.length > 0) && (
                  <div className="flex flex-row flex-wrap justify-center gap-6">
                    {currentTab.images.map((image) => (
                      <img
                        key={image.src}
                        src={image.src}
                        alt={image.alt}
                        className="size-64 rounded-lg object-cover"
                      />
                    ))}
                    {currentTab.videos.map((video) => (
                      <video
                        key={video.src}
                        src={video.src}
                        aria-label={video.alt}
                        className="w-64 rounded-lg object-cover"
                        controls
                        muted
                        loop
                        playsInline
                      />
                    ))}
                  </div>
                )}

                {/* Sounds als schmale Liste untereinander (ein Player ist breit
                    und flach, passt nicht ins quadratische Bilder-Raster) */}
                {currentTab.audios.length > 0 && (
                  <div className="flex w-full max-w-xl flex-col gap-4">
                    {currentTab.audios.map((audio) => (
                      <div
                        key={audio.src}
                        className="rounded-lg bg-neutral-800 p-4"
                      >
                        <p className="mb-2 text-sm font-medium text-neutral-200">
                          {audio.alt}
                        </p>
                        <audio controls className="w-full" src={audio.src}>
                          Dein Browser unterstützt das Audio-Element nicht.
                        </audio>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-neutral-400">
                Hier ist noch nichts — kommt bald.
              </p>
            )}
          </div>

        </div>
      </section>
    </main>
  )
}

export default App