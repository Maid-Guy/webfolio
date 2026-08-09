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
            src="/images/profile-pic.jpg"
            alt="Riccardo Barone"
            className="size-28 rounded-full object-cover ring-2 ring-chart-4/40"
          />

          <div>
            <DialogTitle className="text-xl font-bold tracking-tight text-white">
              Riccardo Barone
            </DialogTitle>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-chart-4">
              Artist · Sound Designer · Developer · Gamer 
            </p>
          </div>

          <DialogDescription className="max-w-sm text-base leading-7 text-neutral-300">
            I build emotional experiences. This portfolio showcases my
             visual experiments, animations, development skills, illustrations,
            and audio projects.
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
// Beschreibungstext (alt) für Barrierefreiheit. "caption" ist optional (das "?")
// und wird, wenn vorhanden, sichtbar unter dem Bild angezeigt. "muted" gilt nur
// für Videos: ohne Angabe startet ein Video stummgeschaltet (praktisch für
// Showreel-artige Loops); mit "muted: false" ist der Ton direkt an.
type MediaItem = { src: string; alt: string; caption?: string; muted?: boolean }

// Ein Link-Eintrag für externe Projekte, die du gebaut hast (z. B. Websites).
type LinkItem = { href: string; title: string; description: string }

// Ein eingebettetes YouTube-Video. "videoId" ist der Teil aus der URL nach
// "?v=" -> aus https://www.youtube.com/watch?v=xnL8Ew_2nPc wird "xnL8Ew_2nPc".
type YoutubeItem = { videoId: string; title: string }

// Ein Register (Tab) hat eine id, ein label und je eine Liste Bilder, Videos,
// Sounds, Links und YouTube-Videos.
type Tab = {
  id: string
  label: string
  images: MediaItem[]
  videos: MediaItem[]
  audios: MediaItem[]
  links: LinkItem[]
  youtubeVideos: YoutubeItem[]
}

// --- Daten für die Register (Tabs) ---
// Neue Register fügst du einfach hier in das Array ein.
const tabs: Tab[] = [
  {
    id: "animations",
    label: "Motion",
    images: [],
    videos: [
      // Sobald deine Datei in public/videos/ liegt, diese Zeile aktivieren
      // (das "//" davor entfernen) und Pfad + Beschreibung anpassen:
     { src: "/videos/Animationsbeispiele_Riccardo_Barone_2026.mp4", alt: "Animations-Compilation", caption: "Advertising animation reel created for an optician client" },
     { src: "/videos/bee_a_bomb_scarface.mp4", alt: "Scarface-Parody", caption: "Scarface-Parody – semester project", muted: false },
     { src: "/videos/streaming_animation_1.mp4", alt: "Idle-Animation for Streaming", caption: "Idle Animation for Streaming" },
    ],
    audios: [],
    links: [],
    youtubeVideos: [
      { videoId: "xnL8Ew_2nPc", title: "Music Video – for a semester project inspired by deceleration (Cut/ VFX and I cared for the snails)" },
    ],
  },
  {
    id: "illustrations",
    label: "Visuals",
    images: [
      // "caption" ist der Text, der sichtbar unter dem Bild steht.
      // Trag hier deine eigene, kurze Beschreibung ein.
      { src: "/images/Kinich_Zip-Hoodie_2024-10.png", alt: "Kinich", caption: "Fashion – Character-based clothing" },
      { src: "/images/dragon-bw-pencil.jpg", alt: "dragon-drawing-pencil", caption: "Fashion – Character-based clothing" },
      { src: "/images/Skyfolk Concept.jpg", alt: "skyfolk", caption: "Game – Skyfolk concept" },
      { src: "/images/mermaid_blue.jpeg", alt: "mermaid-monochrome-blue", caption: "Monochrome mermaid – blue" },
      { src: "/images/mermaid_orange.jpeg", alt: "mermaid-monochrome-orange", caption: "Monochrome mermaid – orange" },
      { src: "/images/mermaid_pink.jpeg", alt: "mermaid-monochrome-pink", caption: "Monochrome mermaid – pink" },
      { src: "/images/Boss Konzept.png", alt: "boss-concept-ashliah", caption: "Game jam – Ashliah Boss concept" },
      { src: "/images/Main Menu BG 2.png", alt: "main-menu-ashliah", caption: "Game jam – Ashliah Main Menu UI Design" },
      { src: "/images/Options Menu.png", alt: "options-menu-ashliah", caption: "Game jam – Ashliah Options Menu UI Design" },
      { src: "/images/konzept - guard.png", alt: "guard-concept-ashliah", caption: "Game jam – Ashliah Guard concept" },
      { src: "/images/konzept dwarf player.png", alt: "dwarf-charakter-concept-ashliah", caption: "Game jam – Ashliah Dwarf Player concept" },
      { src: "/images/oreling concept.png", alt: "oreling-monster-concept-ashliah", caption: "Game jam – Ashliah Oreling concept" },
    ],
    videos: [],
    audios: [],
    links: [],
    youtubeVideos: [],
  },
  {
    id: "sounds",
    label: "Sounds",
    images: [],
    videos: [],
    audios: [
      // Sobald deine mp3 in public/audio/ liegt, diese Zeile aktivieren
      // (das "//" davor entfernen) und Pfad + Beschreibung anpassen:
    { src: "/sound/Main Menu Music.mp3", alt: "Main menu screen music for game-jam" },
    { src: "/sound/tao_nyx_lvl_bg-music.mp3", alt: "Level background music for The Adventures of Nyx" },
    ],
    links: [
      {
        href: "https://deronsane.itch.io/adventures-of-nyx",
        title: "The Adventures of Nyx",
        description:
          "The result of a game jam product which I made the music for.",
      },
    ],
    youtubeVideos: [],
  },
  {
    id: "development",
    label: "Development",
    images: [],
    videos: [],
    audios: [],
    youtubeVideos: [],
    links: [
      {
        href: "https://www.matt.de",
        title: "matt.de",
        description:
          "A website which I migrated from WordPress and developed in HubSpot. The theme and modules were built in HubL.",
      },
    ],
  },
]

function App() {
  // "activeTab" merkt sich, welches Register gerade ausgewählt ist.
  // Startwert ist das erste Register (tabs[0]) -> "Illustrations".
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  // Wir suchen aus dem Array das Register heraus, das gerade aktiv ist.
  const currentTab = tabs.find((tab) => tab.id === activeTab)

  // Welches Bild gerade groß angezeigt wird (null = kein Bild ausgewählt,
  // Lightbox ist zu). Ein Klick auf ein Bild setzt diesen State.
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null)

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* justify-start statt justify-center: der Inhalt wird oben "verankert"
          statt als Ganzes vertikal zentriert. Sonst würde sich beim
          Tab-Wechsel (unterschiedliche Inhaltshöhe) die komplette Sektion
          samt Header verschieben. */}
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-start px-6 py-20">
        <div className="flex flex-row justify-around">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-chart-4">
            Artist · Sound Designer · Developer · Gamer 
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
              currentTab.audios.length > 0 ||
              currentTab.links.length > 0 ||
              currentTab.youtubeVideos.length > 0) ? (
              <>
                {/* Bilder, Videos und YouTube-Thumbnails als quadratisches Raster nebeneinander */}
                {(currentTab.images.length > 0 ||
                  currentTab.videos.length > 0 ||
                  currentTab.youtubeVideos.length > 0) && (
                  <div className="flex flex-row flex-wrap justify-center gap-6">
                    {currentTab.images.map((image) => (
                      // <figure> + <figcaption> ist der semantisch passende Weg,
                      // ein Bild mit einer sichtbaren Unterschrift zu koppeln.
                      <figure
                        key={image.src}
                        className="flex w-64 flex-col items-center gap-2"
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedImage(image)}
                          className="cursor-zoom-in"
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="size-64 rounded-lg object-cover transition hover:opacity-80"
                          />
                        </button>
                        {image.caption && (
                          <figcaption className="text-center text-sm text-neutral-400">
                            {image.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                    {currentTab.videos.map((video) => (
                      <figure
                        key={video.src}
                        className="flex w-64 flex-col items-center gap-2"
                      >
                        <video
                          src={video.src}
                          aria-label={video.alt}
                          // size-64 + object-cover = quadratischer Zuschnitt für
                          // die kleine Vorschau. Im Vollbildmodus behält der
                          // Browser object-cover bei (überschreibt es NICHT von
                          // selbst) -> [&:fullscreen]:object-contain schaltet
                          // dort gezielt auf "ganzes Bild sichtbar" um.
                          className="size-64 rounded-lg object-cover [&:fullscreen]:object-contain [&:-webkit-full-screen]:object-contain"
                          controls
                          // Ohne explizites "muted: false" in den Daten startet
                          // ein Video stumm (Standard für Showreel-Loops).
                          muted={video.muted ?? true}
                          loop
                          playsInline
                        />
                        {video.caption && (
                          <figcaption className="text-center text-sm text-neutral-400">
                            {video.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                    {/* YouTube-Thumbnails im selben quadratischen Format wie
                        Bilder/Videos. Klick öffnet YouTube, wo es im echten
                        Format abgespielt wird. */}
                    {currentTab.youtubeVideos.map((video) => (
                      <a
                        key={video.videoId}
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex w-64 flex-col items-center gap-2"
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                          alt={video.title}
                          className="size-64 rounded-lg object-cover"
                        />
                        <span className="text-center text-sm text-neutral-400">
                          {video.title}
                          <br />
                          <span className="font-medium text-chart-4 group-hover:text-cyan-300">
                            Watch on YouTube ↗
                          </span>
                        </span>
                      </a>
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
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    ))}
                  </div>
                )}

                {/* Links zu externen Projekten (z. B. selbst gebaute Websites) */}
                {currentTab.links.length > 0 && (
                  <div className="flex w-full max-w-xl flex-col gap-4">
                    {currentTab.links.map((link) => (
                      <div
                        key={link.href}
                        className="rounded-lg bg-neutral-800 p-4"
                      >
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-chart-4 underline underline-offset-4 hover:text-cyan-300"
                        >
                          {link.title}
                        </a>
                        <p className="mt-2 text-sm text-neutral-300">
                          {link.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-neutral-400">
                Nothing here yet — coming soon.
              </p>
            )}
          </div>

        </div>
      </section>

      {/* Lightbox: zeigt das per Klick ausgewählte Bild groß an. "open" wird
          direkt aus dem State abgeleitet (true, sobald ein Bild ausgewählt
          ist); onOpenChange feuert auch beim Klick daneben oder Escape-Taste
          -> dort setzen wir den State wieder auf null, um zu schließen. */}
      <Dialog
        open={selectedImage !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedImage(null)
        }}
      >
        <DialogContent className="border border-white/10 bg-neutral-900 text-white sm:max-w-3xl">
          {selectedImage && (
            <>
              <DialogTitle className="sr-only">{selectedImage.alt}</DialogTitle>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[75vh] w-full rounded-lg object-contain"
              />
              {selectedImage.caption && (
                <DialogDescription className="text-center text-base text-neutral-300">
                  {selectedImage.caption}
                </DialogDescription>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default App