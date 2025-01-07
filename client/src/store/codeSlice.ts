import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language } from "../features/LanguageSelect";

interface CodeState {
  code: string;
  output: string;
  language: Language;
  isLoading: boolean;
}

const initialState: CodeState = {
  code: "",
  output: "",
  language: "python",
  isLoading: false,
};

export const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setOutput: (state, action: PayloadAction<string>) => {
      state.output = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCode, setOutput, setLanguage, setIsLoading } = codeSlice.actions;
export default codeSlice.reducer;
