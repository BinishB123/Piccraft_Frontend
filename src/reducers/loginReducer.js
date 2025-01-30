


function loginReducer(action,state){
    switch (action.type) {
        case 'email':return {...state,email:action.email};
        case "passowrd":return {...state,password:action.password}
        default:
            break;
    }
}

export default loginReducer