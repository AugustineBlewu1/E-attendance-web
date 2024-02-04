import { createSlice } from "@reduxjs/toolkit";
import { User } from "./User";

export type UserState = User | null;



const userSlice = createSlice({
  name : 'auth',
  initialState : {user : null, token : null} ,
  reducers : {
      setCredentials : (state, action) => {
          console.log('User Payload', action.payload)
          const { accessToken } = action.payload
          state.user = action.payload
          state.token = accessToken
          console.log('User State', state.user)
          console.log('Token', state.token)
      },
      logOut: (state) => {
          state.user = null
          state.token = null
      },

  }
})

export const { setCredentials , logOut} = userSlice.actions


export default userSlice.reducer;

export const selectCurrentUser = (state: { auth: { user: User; }; }) => state.auth.user
export const selectCurrentToken = (state: { auth: { token: any; }; }) => state.auth.token

