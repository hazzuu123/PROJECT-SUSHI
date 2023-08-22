import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name: 'user',
    initialState: {
        email: '',
        name: '',
        location: '',
        age: 0
    },
    reducers: {
        changeUser(state, action) {
            state.email = action.payload.email
            state.name = action.payload.name
            state.location = action.payload.location
            state.age = action.payload.age
        }
    }
})

export let { changeUser } = user.actions
export default configureStore({
    reducer: {
        user: user.reducer
    }
}) 