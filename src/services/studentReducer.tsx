import { createSlice } from "@reduxjs/toolkit";
import { User, UserStudent } from "./User";

export type UserState = User | null;



const userStudentSlice = createSlice({
  name : 'authStudent',
  initialState : {user : null, token : null} ,
  reducers : {
      setStudentCredentials : (state, action) => {
          console.log('User Payload', action.payload)
          const { accessToken } = action.payload
          state.user = action.payload
          state.token = accessToken
          console.log('User State', state.user)
          console.log('Token', state.token)
      },
      logOutStudent: (state) => {
          state.user = null
          state.token = null
      },

  }
})

export const { setStudentCredentials , logOutStudent} = userStudentSlice.actions


export default userStudentSlice.reducer;

export const selectCurrentStudentUser = (state: { authStudent: { user: UserStudent; }; }) => state.authStudent.user
export const selectCurrentStudentToken = (state: { authStudent: { token: any; }; }) => state.authStudent.token

