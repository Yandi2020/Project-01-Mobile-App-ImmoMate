const authReducer = (state, action) => {
    switch(action.type){
        case 'ADD_USER':
            return [
                ...state,
                {
                    id: Math.random(),
                    firstName: action.user.firstName,
                    lastName: action.user.lastName,
                    email: action.user.email,
                    password: action.user.password,
                    gender: action.user.gender,
                }
            ]

        default:
            return state   
    }
}

export default authReducer;

