import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import SurfyAiService from '../../services/SurfyAiService';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
  products?: any[]; // Optional attached products for AI responses
}

interface SurfyState {
  isVisible: boolean;
  messages: Message[];
  isLoading: boolean;
}

const initialState: SurfyState = {
  isVisible: false,
  messages: [
    {
      id: '1',
      text: "Hi! I'm Lucy, your personal shopping assistant. How can I help you today?",
      sender: 'ai',
      timestamp: Date.now(),
    },
  ],
  isLoading: false,
};

export const sendMessageToAi = createAsyncThunk(
  'surfy/sendMessageToAi',
  async (prompt: string, {dispatch}) => {
    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: prompt,
      sender: 'user',
      timestamp: Date.now(),
    };
    dispatch(addMessage(userMsg));

    // 2. Process with AI via Backend
    try {
      const {message, products} = await SurfyAiService.sendMessage(prompt);

      // 3. Create AI Message
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: message,
        sender: 'ai',
        timestamp: Date.now(),
        products: products.length > 0 ? products : undefined,
      };

      return aiMsg;
    } catch (error: any) {
      console.error('Error in Surfy AI flow:', error.message || error);
      return {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having a bit of trouble connecting to my brain right now. Please try again later!",
        sender: 'ai',
        timestamp: Date.now(),
      } as Message;
    }
  },
);

const surfySlice = createSlice({
  name: 'surfy',
  initialState,
  reducers: {
    toggleSurfy: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearChat: state => {
      state.messages = initialState.messages;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendMessageToAi.pending, state => {
        state.isLoading = true;
      })
      .addCase(sendMessageToAi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessageToAi.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const {toggleSurfy, addMessage, clearChat} = surfySlice.actions;
export default surfySlice.reducer;
