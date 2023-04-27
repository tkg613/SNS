import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import commentService from './commentService'

const initialState = {
  comments: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: false
}

export const getComments = createAsyncThunk('post/getComments', async function(postId, thunkAPI) {
  try {
    return await commentService.getComments(postId)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
    || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const createComment = createAsyncThunk('post/createComment', async function({commentData, postId}, thunkAPI) {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await commentService.createComment(commentData, postId, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
    || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const commentSlice = createSlice({
  name: 'comment',
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
      .addCase(getComments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.comments = action.payload
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = action.payload
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = action.payload
      })
  }
})

export const {reset} = commentSlice.actions
export default commentSlice.reducer