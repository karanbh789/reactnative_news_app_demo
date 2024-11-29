import {createSlice} from '@reduxjs/toolkit';

interface News {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: null;
}

interface Source {
  id: string;
  name: string;
}

const initialState: News[] = [];

const NewsSlice = createSlice({
  name: 'news',
  initialState: {
    news: initialState,
  },

  reducers: {
    storeNews: (state, action) => {
        state.news = action.payload
    },

    clearNews: (state)=>{
        state.news = []
    }
  },
});

export const {storeNews, clearNews} = NewsSlice.actions
export default  NewsSlice
