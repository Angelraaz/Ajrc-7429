import { useEffect, useRef, useState } from 'react';

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const visible = useRef(true);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    function applyPreference() {
      const allow = !preference.matches && !connection?.saveData;
      if (!allow) videoRef.current?.pause();
      setEnabled(allow);
    }
    applyPreference();
    preference.addEventListener('change', applyPreference);
    return () => preference.removeEventListener('change', applyPreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return;
    function resume() {
      if (visible.current && !pausedByUser.current && !document.hidden) void video?.play().catch(() => {});
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (entry.isIntersecting) resume();
      else video.pause();
    }, { threshold: 0.08 });
    observer.observe(video);
    function onVisibility() { if (document.hidden) video?.pause(); else resume(); }
    document.addEventListener('visibilitychange', onVisibility);
    video.addEventListener('canplay', resume);
    resume();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      video.removeEventListener('canplay', resume);
      video.pause();
    };
  }, [enabled]);

  return <div className="hero-backdrop" aria-hidden="true"><video ref={videoRef} aria-hidden="true" src={enabled ? '/videos/laptop-background.mp4' : undefined} poster="/images/laptop-poster.jpg" autoPlay={enabled} muted loop playsInline preload={enabled ? 'metadata' : 'none'} tabIndex={-1} /><div className="video-shade" /></div>;
}
