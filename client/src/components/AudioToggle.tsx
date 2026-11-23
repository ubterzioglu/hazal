import { Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

interface AudioToggleProps {
  idleLabel: string;
  activeLabel: string;
  className?: string;
}

/** Plays or stops the audio description; playback only starts on a tap. */
export default function AudioToggle({ idleLabel, activeLabel, className }: AudioToggleProps) {
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
      await audio.play();
      setHasError(false);
      setIsPlaying(true);
    } catch {
      setHasError(true);
      setIsPlaying(false);
    }
  };

  const Icon = isPlaying ? VolumeX : Volume2;

  return (
    <>
      <button type="button" onClick={handleToggle} aria-pressed={isPlaying} className={className}>
        <Icon className="h-5 w-5" aria-hidden="true" />
        {hasError ? "Ses açılamadı, tekrar dene" : isPlaying ? activeLabel : idleLabel}
      </button>
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} className="hidden">
        {/* mp3 first: a quarter of the wav's size on museum mobile data */}
        <source src="/audio/maussollos-description.mp3" type="audio/mpeg" />
        <source src="/audio/maussollos-description.wav" type="audio/wav" />
      </audio>
    </>
  );
}
