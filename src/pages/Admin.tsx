import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchLeads, updateLead, deleteLead, getLeadCounts, type Lead, type LeadStatus, type LeadType } from '@/lib/leads';

const LOGO_URL = 'https://d64gsuwffb70l.cloudfront.net/68d82ecec06a0a8f0b4bc68f_1771454657314_d03341a6.jpeg';

const statusColors: Record<LeadStatus, { bg: string; text: string; dot: string }> = {
  new: { bg: 'bg-blue-500/15', text: 'text-blue-400', dot: 'bg-blue-400' },
  contacted: { bg: 'bg-yellow-500/15', text: 'text-yellow-400', dot: 'bg-yellow-400' },
  qualified: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  closed: { bg: 'bg-gray-500/15', text: 'text-gray-400', dot: 'bg-gray-400' },
};

const typeLabels: Record<LeadType, string> = {
  assessment: 'Assessment',
  water_planner: 'Water Planner',
  partner_inquiry: 'Partner Inquiry',
  contact: 'Contact',
  product_quote: 'Product Quote',
};

const typeColors: Record<LeadType, string> = {
  assessment: 'text-[#0077C8] bg-[#0077C8]/10',
  water_planner: 'text-[#00A99D] bg-[#00A99D]/10',
  partner_inquiry: 'text-[#2BA84A] bg-[#2BA84A]/10',
  contact: 'text-purple-400 bg-purple-400/10',
  product_quote: 'text-orange-400 bg-orange-400/10',
};

const Admin: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState({ new: 0, contacted: 0, qualified: 0, closed: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<LeadStatus | ''>('');
  const [filterType, setFilterType] = useState<LeadType | ''>('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortAsc, setSortAsc] = useState(false);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    const [leadsResult, countsResult] = await Promise.all([
      fetchLeads({
        status: filterStatus || undefined,
        lead_type: filterType || undefined,
        sortBy,
        sortAsc,
        search: search || undefined,
      }),
      getLeadCounts(),
    ]);
    setLeads(leadsResult.data);
    setCounts(countsResult);
    setLoading(false);
  }, [filterStatus, filterType, sortBy, sortAsc, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Debounced search
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    await updateLead(id, { status: newStatus });
    loadData();
  };

  const handleSaveNotes = async (id: string) => {
    await updateLead(id, { notes: notesText });
    setEditingNotes(null);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    await deleteLead(id);
    loadData();
  };

  const handleSort = (col: string) => {
    if (sortBy === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(col);
      setSortAsc(false);
    }
  };

  const SortIcon = ({ col }: { col: string }) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`inline ml-1 transition-transform ${sortBy === col ? 'opacity-100' : 'opacity-30'} ${sortBy === col && sortAsc ? 'rotate-180' : ''}`}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-[#071A22] text-[#F7F9FB]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#071A22]/95 backdrop-blur-lg border-b border-[#0077C8]/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={LOGO_URL} alt="Sovereign Water" className="h-9 w-auto rounded-lg" />
              <div className="hidden sm:block">
                <span className="font-display text-sm font-bold text-[#F7F9FB] block">Sovereign Water</span>
                <span className="text-[10px] text-[#00A99D] font-medium tracking-wider uppercase">Admin Panel</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadData} className="p-2 text-[#F7F9FB]/50 hover:text-[#F7F9FB] hover:bg-[#F7F9FB]/5 rounded-lg transition-colors" title="Refresh">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            </button>
            <Link to="/" className="px-4 py-2 text-sm text-[#F7F9FB]/60 hover:text-[#F7F9FB] hover:bg-[#F7F9FB]/5 rounded-lg transition-colors">
              View Site
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: counts.total, color: '#F7F9FB', accent: '#0077C8' },
            { label: 'New', value: counts.new, color: '#60A5FA', accent: '#3B82F6' },
            { label: 'Contacted', value: counts.contacted, color: '#FBBF24', accent: '#F59E0B' },
            { label: 'Qualified', value: counts.qualified, color: '#34D399', accent: '#10B981' },
            { label: 'Closed', value: counts.closed, color: '#9CA3AF', accent: '#6B7280' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 bg-[#0d2a35] border border-[#0077C8]/10 rounded-xl">
              <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-[#F7F9FB]/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F7F9FB]/30"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Search by name, email, or organization..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0d2a35] border border-[#0077C8]/10 rounded-xl text-sm text-[#F7F9FB] placeholder-[#F7F9FB]/25 focus:border-[#00A99D] outline-none"
            />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as LeadStatus | '')} className="px-4 py-2.5 bg-[#0d2a35] border border-[#0077C8]/10 rounded-xl text-sm text-[#F7F9FB]/70 focus:border-[#00A99D] outline-none">
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
          </select>
          <select value={filterType} onChange={e => setFilterType(e.target.value as LeadType | '')} className="px-4 py-2.5 bg-[#0d2a35] border border-[#0077C8]/10 rounded-xl text-sm text-[#F7F9FB]/70 focus:border-[#00A99D] outline-none">
            <option value="">All Types</option>
            <option value="assessment">Assessment</option>
            <option value="water_planner">Water Planner</option>
            <option value="partner_inquiry">Partner Inquiry</option>
            <option value="contact">Contact</option>
            <option value="product_quote">Product Quote</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-[#0d2a35] border border-[#0077C8]/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#0077C8]/30 border-t-[#0077C8] rounded-full animate-spin" />
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-20">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0077C8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 opacity-30"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <p className="text-[#F7F9FB]/40">No leads found. Submissions from the site will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#0077C8]/10">
                    {[
                      { col: 'name', label: 'Name' },
                      { col: 'email', label: 'Email' },
                      { col: 'organization', label: 'Organization' },
                      { col: 'lead_type', label: 'Type' },
                      { col: 'status', label: 'Status' },
                      { col: 'created_at', label: 'Date' },
                    ].map(h => (
                      <th key={h.col} className="text-left px-4 py-3 text-xs font-semibold text-[#F7F9FB]/40 uppercase tracking-wider cursor-pointer hover:text-[#F7F9FB]/60 select-none" onClick={() => handleSort(h.col)}>
                        {h.label}<SortIcon col={h.col} />
                      </th>
                    ))}
                    <th className="px-4 py-3 text-xs font-semibold text-[#F7F9FB]/40 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(lead => {
                    const sc = statusColors[lead.status];
                    const isExpanded = expandedLead === lead.id;
                    return (
                      <React.Fragment key={lead.id}>
                        <tr className={`border-b border-[#0077C8]/5 hover:bg-[#071A22]/40 transition-colors cursor-pointer ${isExpanded ? 'bg-[#071A22]/30' : ''}`} onClick={() => setExpandedLead(isExpanded ? null : lead.id)}>
                          <td className="px-4 py-3">
                            <div className="font-medium text-sm text-[#F7F9FB]">{lead.name}</div>
                            {lead.phone && <div className="text-xs text-[#F7F9FB]/30 mt-0.5">{lead.phone}</div>}
                          </td>
                          <td className="px-4 py-3 text-sm text-[#F7F9FB]/60">{lead.email}</td>
                          <td className="px-4 py-3 text-sm text-[#F7F9FB]/50">{lead.organization || '—'}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full ${typeColors[lead.lead_type]}`}>
                              {typeLabels[lead.lead_type]}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={lead.status}
                              onChange={e => { e.stopPropagation(); handleStatusChange(lead.id, e.target.value as LeadStatus); }}
                              onClick={e => e.stopPropagation()}
                              className={`px-2.5 py-1 text-xs font-semibold rounded-full border-0 outline-none cursor-pointer ${sc.bg} ${sc.text}`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                          <td className="px-4 py-3 text-xs text-[#F7F9FB]/40 whitespace-nowrap">{formatDate(lead.created_at)}</td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={e => { e.stopPropagation(); handleDelete(lead.id); }} className="p-1.5 text-red-400/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Delete lead">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="bg-[#071A22]/20">
                            <td colSpan={7} className="px-4 py-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  {lead.community_size && (
                                    <div>
                                      <div className="text-[10px] font-semibold text-[#F7F9FB]/30 uppercase tracking-wider mb-1">Community Size</div>
                                      <div className="text-sm text-[#F7F9FB]/70">{lead.community_size}</div>
                                    </div>
                                  )}
                                  {lead.message && (
                                    <div>
                                      <div className="text-[10px] font-semibold text-[#F7F9FB]/30 uppercase tracking-wider mb-1">Message</div>
                                      <div className="text-sm text-[#F7F9FB]/70 whitespace-pre-wrap">{lead.message}</div>
                                    </div>
                                  )}
                                  {lead.plan_summary && (
                                    <div>
                                      <div className="text-[10px] font-semibold text-[#F7F9FB]/30 uppercase tracking-wider mb-1">Plan Summary</div>
                                      <div className="text-sm text-[#F7F9FB]/70 whitespace-pre-wrap break-words">{lead.plan_summary}</div>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <div className="text-[10px] font-semibold text-[#F7F9FB]/30 uppercase tracking-wider mb-1">Internal Notes</div>
                                  {editingNotes === lead.id ? (
                                    <div className="space-y-2">
                                      <textarea
                                        value={notesText}
                                        onChange={e => setNotesText(e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 text-sm bg-[#071A22] border border-[#0077C8]/20 rounded-lg text-[#F7F9FB] placeholder-[#F7F9FB]/20 focus:border-[#00A99D] outline-none resize-none"
                                        placeholder="Add internal notes..."
                                        autoFocus
                                      />
                                      <div className="flex gap-2">
                                        <button onClick={() => handleSaveNotes(lead.id)} className="px-3 py-1.5 text-xs font-medium bg-[#0077C8] text-white rounded-lg hover:bg-[#0066b0] transition-colors">Save</button>
                                        <button onClick={() => setEditingNotes(null)} className="px-3 py-1.5 text-xs text-[#F7F9FB]/40 hover:text-[#F7F9FB] transition-colors">Cancel</button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      onClick={e => { e.stopPropagation(); setEditingNotes(lead.id); setNotesText(lead.notes || ''); }}
                                      className="min-h-[60px] p-3 bg-[#071A22]/50 rounded-lg text-sm text-[#F7F9FB]/50 cursor-text hover:bg-[#071A22] transition-colors"
                                    >
                                      {lead.notes || <span className="italic text-[#F7F9FB]/20">Click to add notes...</span>}
                                    </div>
                                  )}
                                  <div className="mt-3 text-[10px] text-[#F7F9FB]/20">
                                    Last updated: {formatDate(lead.updated_at)}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-4 text-xs text-[#F7F9FB]/20 text-center">
          Showing {leads.length} lead{leads.length !== 1 ? 's' : ''} {filterStatus && `with status "${filterStatus}"`} {filterType && `of type "${typeLabels[filterType]}"`}
        </div>
      </main>
    </div>
  );
};

export default Admin;
