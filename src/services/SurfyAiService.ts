import axios from 'axios';
import {API_ENDPOINTS} from '../config/ApiConfig';

class SurfyAiService {
  async sendMessage(message: string): Promise<{
    message: string;
    products: any[];
  }> {
    try {
      console.log('Sending message to backend chatbot:', message);
      const response = await axios.post(API_ENDPOINTS.CHATBOT, {
        message: message,
      });

      return {
        message: response.data.message || "I've found some items for you:",
        products: response.data.products || [],
      };
    } catch (error: any) {
      console.error('Error calling chatbot API:', error.message || error);
      return {
        message:
          "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later!",
        products: [],
      };
    }
  }
}

export default new SurfyAiService();
