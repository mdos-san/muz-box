import jwt from "jsonwebtoken";

const AuthService = () => {
  let decodedJWT = null;

  const init = async () => {
    const response = await fetch("http://localhost:4242/anonymous");
    const json = await response.json();
    decodedJWT = jwt.decode(json.token);
  };

  const getJWT = () => decodedJWT;

  return { init, getJWT };
};

export default AuthService();
