import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
  posts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: false
}

export const getPosts = createAsyncThunk('post/getAll', async function(thunkAPI) {
  try {
    await postService.getPosts()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
    || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = action.payload
      })
  }
})

export const {reset} = postSlice.actions
export default postSlice.reducer