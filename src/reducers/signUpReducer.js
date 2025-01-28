function signupReducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.name };
    case "mobile":
      return { ...state, mobile: action.mobile };
    case "email":
      return { ...state, email: action.email };
    case "passoword":
      return { ...state, password: action.password };
  }
}

export default signupReducer;
