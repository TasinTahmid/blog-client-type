import { createSlice } from "@reduxjs/toolkit";

export interface PageTypeState {
    value: "login" | "register" | null;
}

const initialState: PageTypeState = {
    value: null,
};

export const pageTypeSlice = createSlice({
    name: "pageType",
    initialState,
    reducers: {
        setPageTypeLogin: (state) => {
            state.value = "login";
        },
        setPageTypeRegister: (state) => {
            state.value = "register";
        },
    },
});

export const { setPageTypeLogin, setPageTypeRegister } = pageTypeSlice.actions;
export default pageTypeSlice.reducer;
