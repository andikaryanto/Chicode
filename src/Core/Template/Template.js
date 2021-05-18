import CsrfToken from "./CsrfToken"
import Language from "./Language";

const Template = () => {
     let csrfToken = CsrfToken();
     let lang =  Language;
     return {
          csrfToken,
          lang
     }
} 

export default Template;