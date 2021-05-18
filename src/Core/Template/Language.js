import dotenv from 'dotenv';
import Session from '../Http/Session';
import FileLoader from '../Libraries/FileLoader';
dotenv.config();

const Language = (string) => {
     let session = Session.getInstance();
     let appLanguage = session.userlanguage == null ? session.language : session.userlanguage;

     let file = string.split(".");
     let json = new FileLoader(`src/App/Language/${appLanguage}/${file[0]}.json`).getData();

     return json[file[1]];
}

export default Language;