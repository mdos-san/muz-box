import jwt from "jsonwebtoken";
import runtimeEnv from '@mars/heroku-js-runtime-env';

const AuthService = () => {
  const env = runtimeEnv();
  let decodedJWT = null;

  const init = async () => {
    const response = await fetch(`${env.REACT_APP_AUTH_URL}/anonymous`);
    const json = await response.json();
    decodedJWT = jwt.decode(json.token);
  };

  const getJWT = () => decodedJWT;

  return { init, getJWT };
};

export default AuthService();
