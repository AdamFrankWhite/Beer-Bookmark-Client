export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");

        if (serializedState === null) {
            return undefined;
        }
        //Reset fields on refresh
        const parsedState = JSON.parse(serializedState);
        parsedState.user.resetEmailMessage = null;
        return parsedState;
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (err) {
        //Log error
    }
};
