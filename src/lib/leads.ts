import { supabase } from '@/lib/supabase';

export type LeadType = 'assessment' | 'water_planner' | 'partner_inquiry' | 'contact' | 'product_quote';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  community_size: string;
  message: string;
  plan_summary: string;
  lead_type: LeadType;
  status: LeadStatus;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface LeadInsert {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  community_size?: string;
  message?: string;
  plan_summary?: string;
  lead_type: LeadType;
}

/**
 * Submit a new lead to the database
 */
export async function submitLead(lead: LeadInsert): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([{
        name: lead.name,
        email: lead.email,
        phone: lead.phone || '',
        organization: lead.organization || '',
        community_size: lead.community_size || '',
        message: lead.message || '',
        plan_summary: lead.plan_summary || '',
        lead_type: lead.lead_type,
      }])
      .select('id')
      .single();

    if (error) {
      console.error('Error submitting lead:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error('Error submitting lead:', err);
    return { success: false, error: err.message || 'Unknown error' };
  }
}

/**
 * Fetch all leads with optional filters and sorting
 */
export async function fetchLeads(options?: {
  status?: LeadStatus;
  lead_type?: LeadType;
  sortBy?: string;
  sortAsc?: boolean;
  search?: string;
}): Promise<{ data: Lead[]; error?: string }> {
  try {
    let query = supabase
      .from('leads')
      .select('*');

    if (options?.status) {
      query = query.eq('status', options.status);
    }

    if (options?.lead_type) {
      query = query.eq('lead_type', options.lead_type);
    }

    if (options?.search) {
      query = query.or(`name.ilike.%${options.search}%,email.ilike.%${options.search}%,organization.ilike.%${options.search}%`);
    }

    const sortCol = options?.sortBy || 'created_at';
    const sortAsc = options?.sortAsc ?? false;
    query = query.order(sortCol, { ascending: sortAsc });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching leads:', error);
      return { data: [], error: error.message };
    }

    return { data: (data as Lead[]) || [] };
  } catch (err: any) {
    console.error('Error fetching leads:', err);
    return { data: [], error: err.message || 'Unknown error' };
  }
}

/**
 * Update a lead's status and/or notes
 */
export async function updateLead(
  id: string,
  updates: { status?: LeadStatus; notes?: string }
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating lead:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Error updating lead:', err);
    return { success: false, error: err.message || 'Unknown error' };
  }
}

/**
 * Delete a lead
 */
export async function deleteLead(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting lead:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Error deleting lead:', err);
    return { success: false, error: err.message || 'Unknown error' };
  }
}

/**
 * Get lead counts by status
 */
export async function getLeadCounts(): Promise<{ new: number; contacted: number; qualified: number; closed: number; total: number }> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('status');

    if (error || !data) {
      return { new: 0, contacted: 0, qualified: 0, closed: 0, total: 0 };
    }

    const counts = { new: 0, contacted: 0, qualified: 0, closed: 0, total: data.length };
    data.forEach((lead: any) => {
      if (lead.status in counts) {
        (counts as any)[lead.status]++;
      }
    });

    return counts;
  } catch {
    return { new: 0, contacted: 0, qualified: 0, closed: 0, total: 0 };
  }
}
