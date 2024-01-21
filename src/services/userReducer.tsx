import { User } from "./User";
import { UserAction } from "./userActions";

export type UserState = User | null;

const userReducer = (state: UserState = null, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      return state;
  }
};
export default userReducer;


// function userReducer(state = initialState, action) {
//   switch (action.type) {
//     case "LOGIN_SUCCESS":
//       return {
//         ...state,
//         user: action.payload.user,
//       };
//     case "LOGOUT":
//       return {
//         ...state,
//         user: null,
//       };
//     default:
//       return state;
//   }
//  }
