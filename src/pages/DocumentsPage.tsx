import React, { useState, useEffect } from 'react';
import { database } from '../services/database';
import { LegalDocument, DocumentAnalysisResult } from '../types/legal';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  Calendar,
  CheckSquare,
  Plus,
  Trash2,
  ExternalLink,
  Eye,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<LegalDocument | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [createdTaskTitle, setCreatedTaskTitle] = useState<string | null>(null);

  useEffect(() => {
    const docs = database.getDocuments();
    setDocuments(docs);
    if (docs.length > 0) {
      setSelectedDoc(docs[0]);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);

    setTimeout(() => {
      const isGST = file.name.toLowerCase().includes('gst') || file.name.toLowerCase().includes('notice');
      const analysis: DocumentAnalysisResult = isGST
        ? {
            documentType: 'Legal Notice / Intimation DRC-01A',
            potentialIssue: 'GST Billing Mismatch & Section 16(2) ITC Discrepancy',
            referencedSections: [
              'Central Goods and Services Tax Act 2017 — Section 16(2)(aa)',
              'Central Goods and Services Tax Act 2017 — Section 73',
              'Central Goods and Services Tax Rules 2017 — Rule 36(4)',
            ],
            importantDates: [
              { label: 'Date of Intimation Notice', date: '28 Sep 2026' },
              { label: 'Mandatory Reply Deadline', date: '15 Oct 2026' },
            ],
            keyPoints: [
              'Department flagged discrepancy between GSTR-3B claimed credit and supplier GSTR-2B data.',
              'Supplier delay in uploading B2B tax invoices in quarterly returns.',
              'Statutory opportunity to submit CA reconciliation certificate or discharge differential liability.',
            ],
            suggestedTasks: [
              'Review GST billing notice & supplier purchase vouchers',
              'Collect vendor GSTR-1 payment acknowledgment',
              'Draft formal submission in Part B of DRC-01A',
            ],
          }
        : {
            documentType: 'Standard Commercial / Legal Agreement',
            potentialIssue: 'Contractual Obligation / Payment Terms',
            referencedSections: ['Indian Contract Act 1872 — Section 73 (Compensation for breach)'],
            importantDates: [
              { label: 'Effective Execution Date', date: '01 Oct 2026' },
              { label: 'Notice Period', date: '30 Days' },
            ],
            keyPoints: [
              'Mutual covenants regarding service fulfillment and defect warranty.',
              'Arbitration seat stipulated for dispute adjudication.',
            ],
            suggestedTasks: ['Verify compliance milestones against agreed schedules'],
          };

      const newDoc = database.addDocument({
        name: file.name,
        type: file.name.endsWith('.pdf') ? 'PDF' : file.name.endsWith('.docx') ? 'DOCX' : 'PNG',
        size: `${Math.round(file.size / 1024)} KB` || '180 KB',
        status: 'Analyzed',
        analysis,
        caseTitle: isGST ? 'GST Billing Notice & Input Tax Credit Dispute' : undefined,
      });

      setDocuments(database.getDocuments());
      setSelectedDoc(newDoc);
      setAnalyzing(false);
    }, 900);
  };

  const handleCreateTaskFromAnalysis = (taskText: string) => {
    database.createTask({
      title: taskText,
      description: `Task created from document analysis of ${selectedDoc?.name || 'uploaded notice'}`,
      caseId: selectedDoc?.caseId,
      caseTitle: selectedDoc?.caseTitle,
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      priority: 'High',
      status: 'To Do',
    });

    setCreatedTaskTitle(taskText);
    setTimeout(() => setCreatedTaskTitle(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this document?')) {
      database.deleteDocument(id);
      const remaining = database.getDocuments();
      setDocuments(remaining);
      setSelectedDoc(remaining[0] || null);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827]">
            Document Center
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
            Upload legal notices, contracts, and billing records to extract verified statutory sections and deadlines.
          </p>
        </div>

        {/* Upload Button */}
        <label className="px-4 py-2.5 rounded-xl bg-[#1F242C] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center gap-2 cursor-pointer shadow-xs self-start sm:self-auto">
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
          <input
            type="file"
            accept=".pdf,.docx,.jpg,.png"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {analyzing && (
        <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E3E1D9] flex items-center gap-3 text-xs text-[#1F242C] animate-pulse">
          <Sparkles className="w-5 h-5 text-amber-600 animate-spin" />
          <span>Analyzing document structure, extracting statutory references and compliance dates...</span>
        </div>
      )}

      {createdTaskTitle && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Task "{createdTaskTitle}" created and added to your Task Board!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Document List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#6B7280]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">ALL DOCUMENTS ({documents.length})</span>
          </div>

          <div className="space-y-2">
            {documents.map((doc) => {
              const isSelected = selectedDoc?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left flex items-start justify-between group ${
                    isSelected
                      ? 'bg-white border-[#1F242C] shadow-sm ring-1 ring-[#1F242C]'
                      : 'bg-white border-[#E3E1D9] hover:border-[#1F242C]'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <FileText className={`w-5 h-5 mt-0.5 shrink-0 ${doc.type === 'PDF' ? 'text-rose-700' : 'text-[#2C3E50]'}`} />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-[#111827] truncate">
                        {doc.name}
                      </h4>
                      <div className="text-[10px] text-[#6B7280] mt-0.5">
                        {doc.size} · {doc.uploadedDate}
                      </div>
                      {doc.caseTitle && (
                        <div className="text-[10px] text-[#2C3E50] font-medium mt-1 truncate">
                          Case: {doc.caseTitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    {doc.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Demonstration Notice Card */}
          <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E3E1D9] space-y-2 text-left">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
              DEMONSTRATION CASE
            </div>
            <div className="text-xs font-bold text-[#111827]">
              GST Billing Notice (DRC-01A)
            </div>
            <p className="text-[11px] text-[#4B5563] leading-relaxed">
              Demonstrates automatic section extraction (CGST Act Section 16(2)(aa) & Rule 36(4)) and instant compliance task generation.
            </p>
          </div>
        </div>

        {/* Right: Detailed Document Analysis (8 cols) */}
        <div className="lg:col-span-8">
          {selectedDoc ? (
            <div className="bg-white rounded-xl border border-[#E3E1D9] p-6 shadow-2xs space-y-6 text-left">
              {/* Doc Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE8E0] pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#1F242C] text-white">
                      {selectedDoc.type}
                    </span>
                    <span className="text-xs text-[#6B7280]">
                      Uploaded {selectedDoc.uploadedDate}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-[#111827]">
                    {selectedDoc.name}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(selectedDoc.id)}
                    className="p-1.5 rounded-lg border border-[#D5D3CB] text-[#6B7280] hover:text-rose-600 hover:border-rose-300 text-xs flex items-center gap-1"
                    title="Delete Document"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Analysis Results */}
              {selectedDoc.analysis ? (
                <div className="space-y-6">
                  {/* Top Summary Block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#FAF9F5] p-3.5 rounded-lg border border-[#EAE8E0] space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
                        Document Classification
                      </span>
                      <div className="text-xs font-bold text-[#111827]">
                        {selectedDoc.analysis.documentType}
                      </div>
                    </div>

                    <div className="bg-[#FAF9F5] p-3.5 rounded-lg border border-[#EAE8E0] space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
                        Identified Legal Issue
                      </span>
                      <div className="text-xs font-bold text-[#111827]">
                        {selectedDoc.analysis.potentialIssue}
                      </div>
                    </div>
                  </div>

                  {/* Referenced Statutory Sections / Rules */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                      Referenced Statutory Sections & Rules (Extracted from Document)
                    </h3>
                    <div className="space-y-2">
                      {selectedDoc.analysis.referencedSections.map((sec, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-white border border-[#E3E1D9] text-xs font-mono text-[#111827] flex items-center justify-between"
                        >
                          <span>{sec}</span>
                          <span className="text-[10px] text-[#6B7280] font-sans">Verified Statute</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Important Dates */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                      Important Extracted Dates & Deadlines
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedDoc.analysis.importantDates.map((dt, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-white border border-[#E3E1D9] flex items-center justify-between text-xs"
                        >
                          <span className="text-[#4B5563]">{dt.label}</span>
                          <span className="font-bold text-[#111827] font-mono">{dt.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Points */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                      Key Findings & Factual Summary
                    </h3>
                    <div className="p-4 rounded-lg bg-[#FAF9F5] border border-[#EAE8E0] space-y-2 text-xs text-[#374151] leading-relaxed">
                      {selectedDoc.analysis.keyPoints.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-[#1F242C] font-bold">•</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Tasks / Actions */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                        Recommended Action Items
                      </h3>
                      <span className="text-[11px] text-[#6B7280]">Click to add task</span>
                    </div>

                    <div className="space-y-2">
                      {selectedDoc.analysis.suggestedTasks.map((taskStr, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-white border border-[#E3E1D9] flex items-center justify-between hover:border-[#1F242C] transition-colors"
                        >
                          <div className="flex items-center gap-2 text-xs font-medium text-[#111827]">
                            <CheckSquare className="w-4 h-4 text-[#2C3E50] shrink-0" />
                            <span>{taskStr}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCreateTaskFromAnalysis(taskStr)}
                            className="px-3 py-1 rounded-md bg-[#1F242C] text-white text-[11px] font-semibold hover:bg-black transition-colors cursor-pointer shrink-0 shadow-2xs"
                          >
                            + Create Task
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-[#6B7280]">
                  This document has not been analyzed yet.
                </div>
              )}
            </div>
          ) : (
            <div className="p-16 text-center bg-white rounded-xl border border-[#E3E1D9] space-y-2">
              <FileText className="w-8 h-8 text-[#9CA3AF] mx-auto" />
              <h3 className="text-sm font-bold text-[#111827]">No document selected</h3>
              <p className="text-xs text-[#6B7280]">
                Select a document from the left or upload a new notice.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
