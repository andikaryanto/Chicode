import Request from "../Http/Request"

const CsrfToken = () => {
     if (process.env.CSRF_UASEGE == "true") {
          const request = Request.getInstance();
          return `<input hidden name="_csrf" value="${request.csrfToken()}"/>`;
     } else {
          return null;
     }
}

export default CsrfToken;