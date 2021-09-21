import runtimeEnv from "@mars/heroku-js-runtime-env";
import Watcher from "@mdos-san/watcher";
import jwt from "jsonwebtoken";

const AuthService = () => {
  const env = runtimeEnv();
  let encodedJWT = null;
  let decodedJWT = null;
  const [watchJWT, setJWT] = Watcher({});

  const init = async () => {
    const token = window.localStorage.getItem("token");
    const isExpired = token ? Date.now() > jwt.decode(token).exp * 1000 : true;

    if (token && !isExpired) {
      encodedJWT = token;
      decodedJWT = jwt.decode(token);
      setJWT(decodedJWT);
    } else {
      const response = await fetch(`${env.REACT_APP_AUTH_URL}/anonymous`);
      const json = await response.json();

      encodedJWT = json.token;
      decodedJWT = jwt.decode(json.token);

      setJWT(decodedJWT);

      localStorage.setItem("token", encodedJWT);
    }
  };

  const getJWT = () => decodedJWT;

  const getEncodedJWT = () => encodedJWT;

  return { init, getJWT, getEncodedJWT, watchJWT };
};

export default AuthService();
