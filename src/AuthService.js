import jwt from "jsonwebtoken";

const AuthService = () => {
  let decodedJWT = null;

  const init = async () => {
    const response = await fetch(`${process.env.REACT_APP_AUTH_URL}/anonymous`);
    const json = await response.json();
    decodedJWT = jwt.decode(json.token);
  };

  const getJWT = () => decodedJWT;

  return { init, getJWT };
};

export default AuthService();
