const authData = {
    Allusers: [],
    currentuser: [],
    oldChats: []
}

const store = (state = authData, action) => {

    switch (action.type) {
        case "currentUser":
            return ({
                ...state,
                currentuser: action.payload
            })
        case "getAllUsers":

            return ({
                ...state,
                Allusers: action.payload
            })
        case "getOldchats":

            return ({
                ...state,
                oldChats: action.payload
            })
        case "logOut":
            return ({
                ...state,
                currentuser: ''
            })
        default:
            return (state)
    }
}

export default store;