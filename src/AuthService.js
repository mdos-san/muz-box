import jwt from "jsonwebtoken";
import runtimeEnv from '@mars/heroku-js-runtime-env';
import Watcher from "@mdos-san/watcher"

const AuthService = () => {
  const env = runtimeEnv();
  let encodedJWT = null;
  let decodedJWT = null;
  const [ watchJWT, setJWT ] = Watcher({});

  const init = async () => {
    const response = await fetch(`${env.REACT_APP_AUTH_URL}/anonymous`);
    const json = await response.json();
    encodedJWT = json.token;
    decodedJWT = jwt.decode(json.token);
    setJWT(decodedJWT);
  };

  const getJWT = () => decodedJWT;

  const getEncodedJWT = () => encodedJWT;

  return { init, getJWT, getEncodedJWT, watchJWT };
};

export default AuthService();
