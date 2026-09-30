'use client';

import React from 'react';
import { Clock, Layers, Smartphone, Film, Palette, CheckCircle2 } from 'lucide-react';
import { ContentType, ContentStyle } from '@/lib/api/types';

interface VideoMetadataCardsProps {
  duration: number;
  sceneCount: number;
  contentType: ContentType;
  style: ContentStyle;
  status?: string;
}

export function VideoMetadataCards({
  duration,
  sceneCount,
  contentType,
  style,
  status = 'Ready',
}: VideoMetadataCardsProps) {
  const formatLabel = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const metadataItems = [
    {
      label: 'Duration',
      value: `${duration.toFixed(1)} sec`,
      icon: Clock,
      color: 'text-sky-400',
    },
    {
      label: 'Scenes',
      value: `${sceneCount}`,
      icon: Layers,
      color: 'text-indigo-400',
    },
    {
      label: 'Aspect Ratio',
      value: '9:16',
      icon: Smartphone,
      color: 'text-purple-400',
    },
    {
      label: 'Content Type',
      value: formatLabel(contentType),
      icon: Film,
      color: 'text-amber-400',
    },
    {
      label: 'Style',
      value: formatLabel(style),
      icon: Palette,
      color: 'text-pink-400',
    },
    {
      label: 'Status',
      value: status,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      badge: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {metadataItems.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            className="rounded-xl border border-[#1d2232] bg-[#0d1017] p-3.5 flex flex-col justify-between hover:border-slate-700/60 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400">
                {item.label}
              </span>
              <Icon className={`h-3.5 w-3.5 ${item.color}`} />
            </div>

            <div className="mt-2">
              {item.badge ? (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{item.value}</span>
                </div>
              ) : (
                <span className="text-sm font-bold text-white tracking-tight">
                  {item.value}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
