import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  userId: '',
}

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    },
  },
})
