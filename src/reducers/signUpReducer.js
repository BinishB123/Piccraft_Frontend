function signupReducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.name };
    case "mobile":
     
      
      return { ...state, mobile: action.mobile };
    case "email":
      return { ...state, email: action.email };
    case "password":
      return { ...state, password: action.password };
    default:
    return state;
  }
}

export default signupReducer;
