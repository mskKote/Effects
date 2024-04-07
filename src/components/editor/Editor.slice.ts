import { ELanguages } from "@interfaces/IContentPage";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface EditorState {
  isEditMode: boolean;
  isParallax: boolean;
  contentLang: ELanguages;
}

const initialState: EditorState = {
  isEditMode: true,
  isParallax: true,
  contentLang: ELanguages.ru,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    toggleEditMode: (state) => {
      state.isEditMode = !state.isEditMode;
    },
    toggleParallax: (state) => {
      state.isParallax = !state.isParallax;
    },
    changeContentLang: (state, action: PayloadAction<ELanguages>) => {
      state.contentLang = action.payload;
    },
  },
});

export const { toggleEditMode, toggleParallax } = editorSlice.actions;
export default editorSlice.reducer;
