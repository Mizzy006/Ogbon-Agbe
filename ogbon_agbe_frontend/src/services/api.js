import axios from 'axios';

const API_BASE_URL = 'https://ogbonagbe-api-1015297543121.us-central1.run.app';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Automatically inject your Firebase Auth Token into every outgoing request header
api.interceptors.request.use(async (config) => {
  // Pull the active token you stored during your G-03 login success process
  const token = localStorage.getItem('fb_auth_token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const farmGuardService = {
  /**
   * Matches Abdullahi's POST /analyze route
   * @param {File} imageFile - The raw image file object taken from the camera or input field
   */
  analyzeCropDisease: async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile); // Must exactly match Abdullahi's: file: UploadFile = File(...)

    // Overwrite content-type for multipart file transmission
    const response = await api.post('/api/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data; // Returns: { success: true, data: { diagnosis, confidence, treatment } }
  },

  // Fallback endpoint handler for dashboard regional data mapping
  getMockThreats: async () => {
    return [
      { crop: "Cassava (Gbálùmọ́)", disease: "Cassava Mosaic Disease", risk: "High", color: "text-red-500 bg-red-500/10 font-bold" },
      { crop: "Maize (Àgbàdo)", disease: "Maize Rust (Ipese)", risk: "Moderate", color: "text-amber-600 bg-amber-500/10 font-bold" }
    ];
  }
};

/**
 * Placeholders for your upcoming routes once Abdullahi adds them to his main.py router array
 */
export const agbeVoiceService = {
  sendMessage: async (text) => {
    // Placeholder until voice endpoint is pushed to Cloud Run
    return { text: "Mo gbọ́ àlàyé rẹ lórí àwọn ohun ọ̀gbìn rẹ." };
  }
};

export const climateService = {
  getMetrics: async () => {
    return { ndvi: 0.82, humidity: 74, temp: 29, windSpeed: 14 };
  }
};

export default api;