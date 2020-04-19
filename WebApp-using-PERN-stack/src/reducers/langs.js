import enMessages from "../lang/en";
import zhMessages from "../lang/zh";
import jaMessages from "../lang/ja";

import {CHANGE_LANG} from '../action_type'


const mapLang = (lang) => {
    switch (lang) {
      case "zh":
        return { locale: lang, messages: zhMessages };
      case "ja":
        return { locale: lang, messages: jaMessages };
      case "en":
        return { locale: lang, messages: enMessages };
      default:
        return { locale: lang, messages: zhMessages };
    }
  }

const langs = (state = { locale: "zh", messages: zhMessages }, action) =>  {
    switch (action.type) {
      case CHANGE_LANG:
        return { ...mapLang(action.lang) }
      default:
        return state;
    }
  }

  export default langs 