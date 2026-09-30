'use client';

import React from 'react';
import { 
  CheckCircle2, 
  Radio, 
  Info,
  ArrowRight
} from 'lucide-react';
import { PublishResult } from '@/lib/api/types';

interface PublicationReceiptCardProps {
  publication: PublishResult;
  title: string;
  onViewReceipt?: () => void;
  onBackToStudio: () => void;
}

export function PublicationReceiptCard({
  publication,
  title,
  onViewReceipt,
  onBackToStudio,
}: PublicationReceiptCardProps) {
  const formattedDate = React.useMemo(() => {
    if (!publication.publishedAt) return new Date().toLocaleString();
    try {
      return new Date(publication.publishedAt).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return publication.publishedAt;
    }
  }, [publication.publishedAt]);

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-[#0d1417] to-[#090b12] p-5 sm:p-6 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1b2628] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 shadow-md">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Published to Qoneqt
              </span>
              {publication.isMock && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                  DEMO MODE
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-white mt-0.5 truncate max-w-sm sm:max-w-md">
              {title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onViewReceipt && (
            <button
              type="button"
              onClick={onViewReceipt}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-[#23293d] bg-[#141824] transition cursor-pointer"
            >
              View Receipt
            </button>
          )}

          <button
            type="button"
            onClick={onBackToStudio}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-lg transition cursor-pointer"
          >
            <span>Create Another</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Publication Meta Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-[#0d111a] border border-[#1b2230]">
          <span className="text-slate-500 block font-sans text-[11px]">Publication ID</span>
          <span className="text-indigo-300 font-bold mt-0.5 block truncate">
            {publication.publicationId}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#0d111a] border border-[#1b2230]">
          <span className="text-slate-500 block font-sans text-[11px]">Published At</span>
          <span className="text-slate-200 font-medium mt-0.5 block truncate">
            {formattedDate}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#0d111a] border border-[#1b2230]">
          <span className="text-slate-500 block font-sans text-[11px]">Target Destination</span>
          <span className="text-emerald-400 font-medium mt-0.5 block flex items-center gap-1">
            <Radio className="h-3 w-3" /> Qoneqt Global Feed
          </span>
        </div>
      </div>

      {/* Demo Reference Note */}
      {publication.isMock && (
        <div className="flex items-center gap-2 text-[11px] text-amber-300/80 pt-1">
          <Info className="h-3.5 w-3.5 text-amber-400 shrink-0" />
          <span>
            Demo publication reference. Production broadcast will bind directly to your verified Qoneqt publisher channel.
          </span>
        </div>
      )}
    </div>
  );
}
