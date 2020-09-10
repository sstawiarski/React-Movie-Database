import React, {createContext, useReducer} from 'react';

const initialState = localStorage.getItem("UserInfo") !== null ? JSON.parse(localStorage.getItem("UserInfo")) : { user: null, isAdmin: false };

const store = createContext(initialState);

const { Provider } = store;

const UserProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'login':
                const newState = {
                    ...state,
                    ...action.payload
                }
                return newState;
            case 'logout':
                const newState1 = {
                    ...state,
                    user: null,
                    isAdmin: false,
                }
                return newState1;
            default:
                throw new Error();
        };
    }, initialState);

    React.useEffect(() => {
        localStorage.setItem("UserInfo", JSON.stringify(state))
    }, [state])

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { store, UserProvider };