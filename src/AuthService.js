import Watcher from "@mdos-san/watcher";
import jwt from "jsonwebtoken";
import runtimeEnv from "@mars/heroku-js-runtime-env";

const AuthService = () => {
  const env = runtimeEnv();
  let encodedJWT = null;
  let decodedJWT = null;
  const [watchJWT, setJWT] = Watcher({});

  const init = async (urlToken) => {
    if (urlToken !== "") {
      encodedJWT = urlToken;
      decodedJWT = jwt.decode(urlToken);
      console.log(encodedJWT, decodedJWT);
      setJWT(decodedJWT);
      return ;
    }

    const token = window.localStorage.getItem("token");
    const isExpired = token ? Date.now() > jwt.decode(token).exp * 1000 : true;

    if (token && !isExpired) {
      encodedJWT = token;
      decodedJWT = jwt.decode(token);
    } else {
      const response = await fetch(`${env.REACT_APP_AUTH_URL}/anonymous`);
      const json = await response.json();

      encodedJWT = json.token;
      decodedJWT = jwt.decode(json.token);
    }
    setJWT(decodedJWT);
    localStorage.setItem("token", encodedJWT);
  };

  const getJWT = () => decodedJWT;

  const getEncodedJWT = () => encodedJWT;

  const clean = () => {};

  return { init, getJWT, getEncodedJWT, watchJWT, clean };
};

export default AuthService();
