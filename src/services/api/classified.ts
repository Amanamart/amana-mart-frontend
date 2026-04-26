import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const classifiedService = {
  // Categories
  getCategories: async () => {
    const res = await axios.get(`${API_URL}/classified/categories`);
    return res.data;
  },
  
  // Locations
  getLocations: async () => {
    const res = await axios.get(`${API_URL}/classified/locations`);
    return res.data;
  },

  // Ads
  getAds: async (params: any) => {
    const res = await axios.get(`${API_URL}/classified/ads`, { params });
    return res.data;
  },
  
  getAdBySlug: async (slug: string) => {
    const res = await axios.get(`${API_URL}/classified/ads/${slug}`);
    return res.data;
  },
  
  createAd: async (data: any) => {
    const res = await axios.post(`${API_URL}/classified/ads`, data);
    return res.data;
  },
  
  // Membership
  getMembershipPlans: async () => {
    const res = await axios.get(`${API_URL}/classified/membership/plans`);
    return res.data;
  },
};
