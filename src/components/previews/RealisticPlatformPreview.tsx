import React, { useState } from 'react';
import { PlatformType, ContentVariation, EventDetails } from '../../types';
import {
  Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Check, Copy,
  ThumbsUp, MessageSquare, Repeat2, Share2, Eye, ShieldCheck, Mail, ArrowLeft
} from 'lucide-react';

interface RealisticPlatformPreviewProps {
  platform: PlatformType;
  variation: ContentVariation;
  eventDetails: EventDetails;
  hashtags?: string[];
  onCopy: (text: string) => void;
}

export const RealisticPlatformPreview: React.FC<RealisticPlatformPreviewProps> = ({
  platform,
  variation,
  eventDetails,
  hashtags = [],
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCopy = () => {
    onCopy(variation.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedWhatsAppText = (text: string) => {
    // Replace *text* with <strong>text</strong>
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return <strong key={i} className="font-bold text-white">{part.slice(1, -1)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/80 shadow-2xl transition-all">
      {/* Top Banner with Platform Status and Quick Copy */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-300 capitalize">{platform} Interactive Live Preview</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy Formatted Text'}</span>
        </button>
      </div>

      <div className="p-4 sm:p-6 flex justify-center bg-[#06080d]/60">
        <div className="w-full max-w-lg">
          {/* INSTAGRAM PREVIEW */}
          {platform === 'instagram' && (
            <div className="bg-[#000000] border border-neutral-800 rounded-2xl overflow-hidden text-neutral-100 shadow-xl font-sans">
              {/* Instagram Header */}
              <div className="flex items-center justify-between p-3.5 border-b border-neutral-900">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[11px] font-bold text-white uppercase">
                      {eventDetails.organizer ? eventDetails.organizer.slice(0, 2) : 'EC'}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold hover:underline cursor-pointer">
                        {eventDetails.organizer ? eventDetails.organizer.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 18) : 'event_official'}
                      </span>
                      <ShieldCheck className="w-3 h-3 text-sky-400 fill-sky-400" />
                    </div>
                    <span className="text-[10px] text-neutral-400">{eventDetails.location ? eventDetails.location.split(',')[0] : 'Event Venue'}</span>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-neutral-400 cursor-pointer" />
              </div>

              {/* Instagram Visual Card */}
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.2),transparent_50%)]" />
                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-black/40 backdrop-blur-md border border-white/10 text-purple-300">
                    Official Event
                  </span>
                  <span className="text-[10px] font-semibold text-slate-300 px-2 py-0.5 rounded bg-black/40 backdrop-blur-md">
                    {eventDetails.date || 'Save The Date'}
                  </span>
                </div>
                <div className="relative z-10 my-auto text-center py-4">
                  <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-md">
                    {eventDetails.name}
                  </h4>
                  <p className="text-xs text-purple-200 mt-2 font-medium max-w-xs mx-auto drop-shadow line-clamp-2">
                    {eventDetails.location}
                  </p>
                </div>
                <div className="relative z-10 flex justify-between items-center text-[11px] text-slate-300 border-t border-white/10 pt-2">
                  <span>Hosted by {eventDetails.organizer || 'EventCraft'}</span>
                  <span className="text-purple-300 font-semibold">Swipe for details ➔</span>
                </div>
              </div>

              {/* Instagram Action Icons */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <Heart
                      onClick={() => setIsLiked(!isLiked)}
                      className={`w-6 h-6 cursor-pointer transition-transform active:scale-125 ${
                        isLiked ? 'text-rose-500 fill-rose-500' : 'text-neutral-100 hover:text-neutral-400'
                      }`}
                    />
                    <MessageCircle className="w-6 h-6 text-neutral-100 hover:text-neutral-400 cursor-pointer" />
                    <Send className="w-6 h-6 text-neutral-100 hover:text-neutral-400 cursor-pointer -rotate-12" />
                  </div>
                  <Bookmark
                    onClick={() => setIsSaved(!isSaved)}
                    className={`w-6 h-6 cursor-pointer ${
                      isSaved ? 'text-white fill-white' : 'text-neutral-100 hover:text-neutral-400'
                    }`}
                  />
                </div>
                <p className="text-xs font-semibold mb-1.5">{isLiked ? '1,483 likes' : '1,482 likes'}</p>
                <div className="text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap">
                  <span className="font-semibold mr-1.5">
                    {eventDetails.organizer ? eventDetails.organizer.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 18) : 'event_official'}
                  </span>
                  {variation.content}
                </div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-2">2 HOURS AGO</p>
              </div>
            </div>
          )}

          {/* LINKEDIN PREVIEW */}
          {platform === 'linkedin' && (
            <div className="bg-[#1b1f23] border border-neutral-700/80 rounded-xl overflow-hidden text-neutral-100 shadow-xl font-sans">
              <div className="p-4 border-b border-neutral-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow">
                      {eventDetails.organizer ? eventDetails.organizer.slice(0, 2) : 'LC'}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-white hover:underline cursor-pointer">
                          {eventDetails.organizer || 'Conference Organization'}
                        </span>
                        <span className="text-xs text-neutral-400">• 1st</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-tight">
                        Host & Innovation Catalyst • 24,900 followers
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-0.5 flex items-center gap-1">
                        Just now • 🌐
                      </p>
                    </div>
                  </div>
                  <button className="text-xs font-semibold text-sky-400 hover:bg-sky-500/10 px-3 py-1.5 rounded-full border border-sky-400/30 flex items-center gap-1">
                    + Follow
                  </button>
                </div>

                <div className="text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap mt-2">
                  {variation.content}
                </div>
              </div>

              {/* LinkedIn Reactions bar */}
              <div className="px-4 py-2 flex items-center justify-between text-[11px] text-neutral-400 border-b border-neutral-800">
                <div className="flex items-center gap-1">
                  <div className="flex -space-x-1">
                    <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[9px] text-white">👍</span>
                    <span className="w-4 h-4 rounded-full bg-rose-600 flex items-center justify-center text-[9px] text-white">❤️</span>
                    <span className="w-4 h-4 rounded-full bg-amber-600 flex items-center justify-center text-[9px] text-white">💡</span>
                  </div>
                  <span className="ml-1">394</span>
                </div>
                <span>42 comments • 18 reposts</span>
              </div>

              {/* LinkedIn Action Buttons */}
              <div className="px-2 py-1 flex items-center justify-around text-xs text-neutral-300 font-medium">
                <button className="flex items-center gap-1.5 py-2 px-3 rounded hover:bg-neutral-800 transition-colors">
                  <ThumbsUp className="w-4 h-4" /> Like
                </button>
                <button className="flex items-center gap-1.5 py-2 px-3 rounded hover:bg-neutral-800 transition-colors">
                  <MessageSquare className="w-4 h-4" /> Comment
                </button>
                <button className="flex items-center gap-1.5 py-2 px-3 rounded hover:bg-neutral-800 transition-colors">
                  <Repeat2 className="w-4 h-4" /> Repost
                </button>
                <button className="flex items-center gap-1.5 py-2 px-3 rounded hover:bg-neutral-800 transition-colors">
                  <Send className="w-4 h-4" /> Send
                </button>
              </div>
            </div>
          )}

          {/* X / TWITTER PREVIEW */}
          {platform === 'twitter' && (
            <div className="bg-black border border-neutral-800 rounded-2xl p-4 text-neutral-100 shadow-xl font-sans">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-900 border border-neutral-700 flex items-center justify-center font-bold text-white text-xs shrink-0">
                  {eventDetails.organizer ? eventDetails.organizer.slice(0, 2) : 'XT'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 truncate">
                      <span className="font-bold text-sm text-white truncate">{eventDetails.organizer || 'EventCraft Official'}</span>
                      <ShieldCheck className="w-4 h-4 text-sky-400 fill-sky-400 shrink-0" />
                      <span className="text-xs text-neutral-500 truncate">@{eventDetails.organizer ? eventDetails.organizer.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 12) : 'eventcraft'}</span>
                      <span className="text-neutral-500 text-xs">· 1m</span>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-neutral-500 cursor-pointer" />
                  </div>

                  <div className="text-sm text-neutral-100 leading-relaxed whitespace-pre-wrap mt-2">
                    {variation.content}
                  </div>

                  <div className="text-xs text-neutral-500 mt-3 pt-2 border-t border-neutral-900 flex items-center gap-3">
                    <span>10:30 AM · Oct 24, 2026</span>
                    <span>·</span>
                    <span className="text-white font-semibold">14.2K</span>
                    <span>Views</span>
                  </div>

                  {/* Tweet Action Icons */}
                  <div className="flex items-center justify-between text-neutral-400 text-xs mt-3 pt-2 border-t border-neutral-900">
                    <div className="flex items-center gap-1.5 hover:text-sky-400 cursor-pointer transition-colors">
                      <MessageCircle className="w-4 h-4" /> <span>38</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-emerald-400 cursor-pointer transition-colors">
                      <Repeat2 className="w-4 h-4" /> <span>142</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-rose-400 cursor-pointer transition-colors">
                      <Heart className="w-4 h-4" /> <span>621</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-sky-400 cursor-pointer transition-colors">
                      <Bookmark className="w-4 h-4" /> <span>94</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-sky-400 cursor-pointer transition-colors">
                      <Share2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WHATSAPP PREVIEW */}
          {platform === 'whatsapp' && (
            <div className="bg-[#0b141a] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl font-sans">
              {/* WhatsApp Header */}
              <div className="bg-[#202c33] px-3.5 py-3 flex items-center justify-between text-white border-b border-[#2a3942]">
                <div className="flex items-center gap-3">
                  <ArrowLeft className="w-4 h-4 text-[#aebac1] cursor-pointer" />
                  <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs shadow">
                    📢
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white leading-tight">
                      {eventDetails.name || 'Event Official Community'}
                    </h4>
                    <span className="text-[10px] text-emerald-400 font-medium">Official Broadcast · Tap for info</span>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-[#aebac1]" />
              </div>

              {/* Chat Container */}
              <div className="p-4 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px] min-h-[260px] flex flex-col justify-end">
                <div className="max-w-[92%] ml-auto bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tr-none p-3.5 shadow-md relative border border-[#005c4b]/50">
                  <div className="text-xs leading-relaxed whitespace-pre-wrap">
                    {formattedWhatsAppText(variation.content)}
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-emerald-200/80">
                    <span>10:45 AM</span>
                    <span className="text-sky-300 font-bold">✓✓</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EMAIL NEWSLETTER PREVIEW */}
          {platform === 'email' && (
            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl font-sans">
              {/* Mac-style Window Controls */}
              <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-slate-400 text-[11px] font-mono">Mail Client Preview</span>
                <div className="w-6" />
              </div>

              {/* Email Meta Headers */}
              <div className="p-4 bg-slate-900/90 border-b border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium w-16">Subject:</span>
                  <span className="text-white font-semibold bg-purple-500/10 text-purple-200 px-2 py-0.5 rounded border border-purple-500/20 truncate">
                    {variation.subjectLine || `Announcement: ${eventDetails.name}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-slate-400 font-medium w-16">From:</span>
                  <span>{eventDetails.organizer || 'Event Leadership'} &lt;invitations@eventcraft.io&gt;</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-slate-400 font-medium w-16">To:</span>
                  <span>attendee@exclusive-guest.org</span>
                </div>
              </div>

              {/* Email Body Card */}
              <div className="p-5 sm:p-6 bg-slate-950 text-slate-200">
                <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 p-4 rounded-xl text-white mb-4 text-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-black/30 px-2 py-0.5 rounded">
                    Official Invitation
                  </span>
                  <h3 className="text-lg font-extrabold mt-1 text-white">{eventDetails.name}</h3>
                  <p className="text-xs text-purple-100 mt-1">{eventDetails.date} • {eventDetails.location}</p>
                </div>

                <div className="text-xs leading-relaxed whitespace-pre-wrap text-slate-200">
                  {variation.content}
                </div>

                <div className="mt-5 text-center">
                  <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-purple-500/20 hover:from-purple-500 hover:to-indigo-500 transition-all">
                    Confirm Attendance / View Agenda ➔
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-center text-[10px] text-slate-500">
                  <p>You received this email because you are registered with {eventDetails.organizer || 'the organizers'}.</p>
                  <p className="mt-1">Unsubscribe • Update Preferences • Privacy Policy</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
