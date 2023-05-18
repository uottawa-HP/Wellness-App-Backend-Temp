import { SET_LANGUAGE} from "./types";
import { store } from "../reduxStore";

//setting the language to the store
const setLanguage = (payload: any) => {
    return {
      type: "LANGUAGE_CHANGED",
      languagePreference : payload,
    };
  };

const getLanguage = () =>{
  return store.getState().language.label;
}
const LanguageActions={
  setLanguage,
  getLanguage,
}

export default LanguageActions;