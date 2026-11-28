import type { Language } from "@/content/artifact";
import { Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

interface AudioToggleProps {
  idleLabel: string;
  activeLabel: string;
  language?: Language;
  className?: string;
}

const AUDIO_BASE: Record<Language, string> = {
  tr: "/audio/maussollos-description",
  en: "/audio/maussollos-description-en",
};

const ERROR_LABEL: Record<Language, string> = {
  tr: "Ses açılamadı, tekrar dene",
  en: "Audio failed, try again",
};

/** Pauses every other narration so two languages never talk over each other. */
function pauseOtherAudio(current: HTMLAudioElement) {
  document.querySelectorAll("audio").forEach((audio) => {
    if (audio !== current) audio.pause();
  });
}

/** Plays or stops the audio description; playback only starts on a tap. */
export default function AudioToggle({ idleLabel, activeLabel, language = "tr", className }: AudioToggleProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      pauseOtherAudio(audio);
      await audio.play();
      setHasError(false);
      setIsPlaying(true);
    } catch {
      setHasError(true);
      setIsPlaying(false);
    }
  };

  const Icon = isPlaying ? VolumeX : Volume2;
  const base = AUDIO_BASE[language];

  return (
    <>
      <button type="button" lang={language} onClick={handleToggle} aria-pressed={isPlaying} className={className}>
        <Icon className="h-5 w-5" aria-hidden="true" />
        {hasError ? ERROR_LABEL[language] : isPlaying ? activeLabel : idleLabel}
      </button>
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      >
        {/* mp3 first: a quarter of the wav's size on museum mobile data */}
        <source src={`${base}.mp3`} type="audio/mpeg" />
        <source src={`${base}.wav`} type="audio/wav" />
      </audio>
    </>
  );
}
