const SHOW_RENAME = "modal/SHOW_RENAME"
const HIDE_RENAME = "modal/HIDE_RENAME"

export const showRename = () => ({
    type: SHOW_RENAME,
});

export const hideRename = () => ({
    type: HIDE_RENAME
})

const initialState = {rename: false, create: false}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_RENAME:
            state.rename = true
            return state
        case HIDE_RENAME:
            state.rename = false
            return state
        default:
            return state;
    }
}

export default modalReducer
