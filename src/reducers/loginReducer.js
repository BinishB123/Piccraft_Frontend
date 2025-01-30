


function loginReducer(state,action){
   
    
    switch (action.type) {
        case 'email':return {...state,email:action.email};
        case "password":return {...state,password:action.password};
        default:
         state;
    }
}

export default loginReducer