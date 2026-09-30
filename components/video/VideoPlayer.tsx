'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  RotateCcw,
  Sparkles,
  Radio
} from 'lucide-react';
import { Scene } from '@/lib/api/types';

interface VideoPlayerProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  duration: number; // in seconds
  scenes: Scene[];
  title: string;
}

export function VideoPlayer({
  videoUrl,
  thumbnailUrl,
  duration,
  scenes,
  title,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalDuration = Math.max(duration || 30, 1);

  // Compute scene time intervals for kinetic subtitles & scene indicators
  const sceneIntervals = useMemo(() => {
    const intervals: { scene: Scene; index: number; start: number; end: number }[] = [];
    let currentStart = 0;
    for (let i = 0; i < scenes.length; i++) {
      const s = scenes[i];
      const sceneDur = s.duration || totalDuration / (scenes.length || 1);
      const end = Math.min(currentStart + sceneDur, totalDuration);
      intervals.push({
        scene: s,
        index: i + 1,
        start: currentStart,
        end,
      });
      currentStart = end;
    }
    return intervals;
  }, [scenes, totalDuration]);

  // Identify active scene based on currentTime
  const activeSceneInfo = useMemo(() => {
    if (sceneIntervals.length === 0) return null;
    const found = sceneIntervals.find(
      (item) => currentTime >= item.start && currentTime < item.end
    );
    return found || sceneIntervals[sceneIntervals.length - 1];
  }, [sceneIntervals, currentTime]);

  // Simulated playback timer when native videoUrl is not available or failed
  const isUsingFallback = !videoUrl || hasVideoError;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isUsingFallback && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0; // Loop or stop
          }
          return Math.min(prev + 0.1, totalDuration);
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isUsingFallback, isPlaying, totalDuration]);

  // Handle native video time updates
  const handleTimeUpdate = () => {
    if (videoRef.current && !isUsingFallback) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlay = () => {
    if (isUsingFallback) {
      if (currentTime >= totalDuration) {
        setCurrentTime(0);
      }
      setIsPlaying(!isPlaying);
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            setHasVideoError(true);
            setIsPlaying(true);
          });
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * totalDuration;

    setCurrentTime(newTime);
    if (videoRef.current && !isUsingFallback) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current && !isUsingFallback) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Format time mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / totalDuration) * 100;

  // Auto-hide controls on mouse idle
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2800);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative aspect-[9/16] w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[390px] mx-auto rounded-3xl overflow-hidden border border-[#23293d] bg-[#07090e] shadow-2xl shadow-indigo-950/40 flex flex-col justify-between select-none group"
    >
      {/* Native HTML5 Video Element (if URL available and no error) */}
      {videoUrl && !hasVideoError ? (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnailUrl}
          playsInline
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          onError={() => setHasVideoError(true)}
          className="absolute inset-0 h-full w-full object-cover"
          onClick={togglePlay}
        />
      ) : (
        /* Polished Interactive Demo Video Fallback */
        <div 
          onClick={togglePlay}
          className="absolute inset-0 cursor-pointer overflow-hidden bg-gradient-to-b from-[#0c0e18] via-[#090b14] to-[#05060a]"
        >
          {/* Animated Atmospheric Background */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
            <div 
              className={`absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl transition-transform duration-1000 ${
                isPlaying ? 'scale-110 translate-x-4 translate-y-6' : 'scale-90'
              }`} 
            />
            <div 
              className={`absolute top-1/2 -right-20 h-64 w-64 rounded-full bg-violet-600/25 blur-3xl transition-transform duration-1000 ${
                isPlaying ? 'scale-125 -translate-y-8' : 'scale-90'
              }`} 
            />
            <div 
              className={`absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-sky-600/20 blur-3xl transition-transform duration-1000 ${
                isPlaying ? 'scale-110 -translate-x-4' : 'scale-90'
              }`} 
            />
          </div>

          {/* Subtle Grid Texture */}
          <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />

          {/* Central Animated Visualizer or Scene Visual Note */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
            {/* Active Scene Visual Anchor */}
            <div className="space-y-4 max-w-[280px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-3 py-1 text-[11px] font-semibold text-indigo-300 backdrop-blur-md shadow-lg">
                <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
                <span>Scene {activeSceneInfo?.index || 1} of {scenes.length}</span>
              </div>

              {/* Dynamic Sound Wave Indicator */}
              <div className="flex items-center justify-center gap-1.5 h-10 py-1">
                {[40, 75, 55, 95, 60, 85, 45, 90, 70, 50, 80].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      height: isPlaying ? `${Math.max(15, (h * (isMuted ? 0.2 : 1)))}%` : '20%',
                      transition: 'height 150ms ease-in-out',
                    }}
                    className="w-1 rounded-full bg-gradient-to-t from-indigo-500 to-indigo-300 shadow-sm"
                  />
                ))}
              </div>

              {/* Scene Visual Prompt Excerpt */}
              <div className="p-3 rounded-2xl border border-[#23293d]/80 bg-[#0d101a]/80 backdrop-blur-md text-left space-y-1.5 shadow-xl">
                <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  <span>Visual Direction</span>
                  <span className="text-indigo-400 font-mono font-medium">{activeSceneInfo?.scene.duration.toFixed(1)}s</span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed">
                  {activeSceneInfo?.scene.visualDescription || 'Dynamic high-fidelity 9:16 composition rendered for broadcast.'}
                </p>
              </div>
            </div>
          </div>

          {/* Kinetic Subtitles / Captions Overlay (Synchronized with playback) */}
          <div className="absolute bottom-20 left-4 right-4 z-20 pointer-events-none">
            <div className="rounded-2xl border border-white/10 bg-black/75 p-3.5 backdrop-blur-md text-center shadow-2xl transition-all duration-300">
              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 block mb-1">
                Kinetic Voiceover Sync
              </span>
              <p className="text-xs sm:text-sm font-semibold text-white leading-snug drop-shadow-md">
                &ldquo;{activeSceneInfo?.scene.narration || activeSceneInfo?.scene.captionExcerpt || title}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top Header Overlay Bar */}
      <div 
        className={`relative z-30 p-4 flex items-center justify-between transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 items-center gap-1.5 rounded-full border border-indigo-500/30 bg-[#0c0e17]/80 px-2.5 backdrop-blur-md text-[10px] font-bold text-white shadow-lg">
            <Radio className="h-3 w-3 text-indigo-400 animate-pulse" />
            <span>QONEQT 9:16</span>
          </div>

          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400 backdrop-blur-md">
            1080x1920 HD
          </span>
        </div>

        {/* Demo Video Preview Badge */}
        {isUsingFallback && (
          <div 
            title="Interactive short-form video preview. Native backend videoUrl will automatically render here once dispatched."
            className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300 backdrop-blur-md shadow-sm"
          >
            <Sparkles className="h-2.5 w-2.5 text-amber-400" />
            <span>Demo video preview</span>
          </div>
        )}
      </div>

      {/* Center Play/Pause Pulsing Trigger (Visible when paused or briefly clicked) */}
      <div 
        onClick={togglePlay}
        className={`absolute inset-0 z-20 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
          !isPlaying ? 'opacity-100' : 'opacity-0 hover:opacity-100'
        }`}
      >
        <button
          type="button"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white shadow-2xl shadow-indigo-900/60 backdrop-blur-md border border-white/20 transition-transform active:scale-95 cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="h-7 w-7 text-white fill-white" />
          ) : (
            <Play className="h-7 w-7 text-white fill-white translate-x-0.5" />
          )}
        </button>
      </div>

      {/* Bottom Controls Bar */}
      <div 
        className={`relative z-30 p-3.5 space-y-2 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Interactive Scrubber Bar */}
        <div
          onClick={handleSeek}
          className="group/scrub relative h-2 w-full cursor-pointer rounded-full bg-white/20 hover:h-2.5 transition-all"
        >
          {/* Progress Fill */}
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 relative"
          >
            {/* Scrubber Knob */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-3.5 w-3.5 rounded-full bg-white shadow-md border border-indigo-600 opacity-0 group-hover/scrub:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Control Buttons & Timestamps */}
        <div className="flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="p-1 hover:text-white transition cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 fill-current" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="p-1 hover:text-white transition cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-amber-400" />
              ) : (
                <Volume2 className="h-4 w-4 text-slate-300 hover:text-white" />
              )}
            </button>

            <div className="font-mono text-[11px] text-slate-400 tracking-tight">
              <span className="text-white font-medium">{formatTime(currentTime)}</span>
              <span className="mx-1 text-slate-600">/</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setCurrentTime(0);
                if (videoRef.current && !isUsingFallback) videoRef.current.currentTime = 0;
              }}
              aria-label="Restart playback"
              title="Restart"
              className="p-1 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title="Fullscreen"
              className="p-1 text-slate-400 hover:text-white transition cursor-pointer"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
