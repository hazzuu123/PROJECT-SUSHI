import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name: 'user',
    initialState: {
        email: '',
        password: '',
        name: '',
        location: '',
        age: ''

    }
})
export default configureStore({
    reducer: {
        user: user.reducer
    }
}) 