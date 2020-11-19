export const initialState = {user:null,}
export const choices = {
    SET_USER: "SET_USER", 
    RESET_USER: "RESET_USER",
}


const reducer = (state,choice) => {
    switch (choice.type){
        case choices.SET_USER:
            return  {
                ...state,
                user: choice.user,          //  Change the user to what we dispatched
            };
        case choices.RESET_USER:
            return {
                ...state,
                user: null,
            }
        default:
            return state;
        }

};

export default reducer
