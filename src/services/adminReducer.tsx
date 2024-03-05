import { createSlice } from "@reduxjs/toolkit";
import { User } from "./User";

export type UserState = User | null;

const userSlice = createSlice({
  name : 'authAdmin',
  initialState : {user : null, token : null} ,
  reducers : {
      setAdminCredentials : (state, action) => {
          console.log('User Payload', action.payload)
          const { accessToken } = action.payload
          state.user = action.payload
          state.token = accessToken
          console.log('User State', state.user)
          console.log('Token', state.token)
      },
      logOutAdmin: (state) => {
          state.user = null
          state.token = null
      },

  }
})

export const { setAdminCredentials , logOutAdmin} = userSlice.actions


export default userSlice.reducer;

export const selectCurrentAdmin = (state: { authAdmin: { user: User; }; }) => state.authAdmin.user
export const selectCurrentAdminToken = (state: { authAdmin: { token: any; }; }) => state.authAdmin.token

