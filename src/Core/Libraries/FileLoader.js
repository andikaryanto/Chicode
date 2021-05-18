import fs from 'fs';
import appRoot from 'app-root-path';

class FileLoader {
     #_path = null;
     constructor(path) {
          this.#_path = appRoot + "/" + path;
     }

     getData() {

          let rawdata = fs.readFileSync(this.#_path);
          let json = JSON.parse(rawdata);
          return json;
     }
}

export default FileLoader;