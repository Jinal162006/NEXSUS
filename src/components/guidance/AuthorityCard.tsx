import React from 'react';
import { Landmark, MapPin, Phone, Mail, Globe, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { AuthorityDetail } from '../../types/legal';

interface AuthorityCardProps {
  authority: AuthorityDetail;
}

export const AuthorityCard: React.FC<AuthorityCardProps> = ({ authority }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 text-left my-3 shadow-xs">
      {/* Header with Verified or Demo Flag */}
      <div className="flex items-start justify-between gap-3 border-b border-[#EAE8E0] pb-3 mb-3">
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-lg bg-[#FAF9F5] border border-[#E3E1D9] text-[#1F242C] shrink-0 mt-0.5">
            <Landmark className="w-5 h-5 text-[#2C3E50]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                APPROPRIATE FORUM / JURISDICTION
              </span>
              {authority.isDemoData ? (
                <span className="text-[10px] bg-amber-50 text-amber-900 border border-amber-300 px-2 py-0.5 rounded font-mono font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-amber-700" />
                  PROTOTYPE DEMO DATA
                </span>
              ) : (
                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Statutory Channel
                </span>
              )}
            </div>
            <h4 className="text-base font-bold text-[#111827] mt-1 leading-snug">
              {authority.name}
            </h4>
          </div>
        </div>
      </div>

      {/* Handles & Why Relevant */}
      <div className="space-y-2 text-xs text-[#374151]">
        <div>
          <span className="font-semibold text-[#111827]">What it handles: </span>
          <span>{authority.handles}</span>
        </div>

        <div className="bg-[#FAF9F5] p-3 rounded-lg border border-[#EAE8E0]">
          <span className="font-semibold text-[#111827] block mb-0.5">Why it may be relevant:</span>
          <span className="text-[#4B5563]">{authority.reason}</span>
        </div>
      </div>

      {/* Jurisdiction & Territorial Scope */}
      <div className="mt-3.5 pt-3 border-t border-[#F3F4F6] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-[#6B7280] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#1F2937] block">Jurisdiction</span>
            <span className="text-[#4B5563]">{authority.jurisdiction}</span>
            {authority.state && (
              <span className="text-[11px] text-[#6B7280] block mt-0.5">
                Region: {authority.state} {authority.city ? `• ${authority.city}` : ''}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          {authority.officialPhone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
              <span className="text-[#374151] font-mono text-[11px] truncate">
                {authority.officialPhone}
              </span>
            </div>
          )}

          {authority.officialEmail && (
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
              <span className="text-[#374151] font-mono text-[11px] truncate">
                {authority.officialEmail}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Address & Official Portal Link */}
      {authority.address && (
        <div className="mt-3 text-[11px] text-[#6B7280] bg-[#F9F9F8] p-2.5 rounded border border-[#EAE8E0]">
          <span className="font-semibold text-[#374151]">Official Location: </span>
          {authority.address}
        </div>
      )}

      {/* Official Actions */}
      <div className="mt-4 pt-3 border-t border-[#EAE8E0] flex flex-wrap items-center gap-2.5">
        {authority.onlineFilingUrl && (
          <a
            href={authority.onlineFilingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1F242C] text-white text-xs font-semibold hover:bg-black transition-colors"
          >
            <span>Online Complaint / E-Filing</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        {authority.officialWebsite && (
          <a
            href={authority.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-[#D1D5DB] text-[#374151] text-xs font-semibold hover:bg-[#F9FAFB] transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Official Portal</span>
          </a>
        )}

        {authority.isDemoData && (
          <span className="text-[10px] text-[#9CA3AF] italic">
            *Demo data: Verify jurisdiction with your local registry.
          </span>
        )}
      </div>
    </div>
  );
};
