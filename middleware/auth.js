import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    // const token = req.headers.Authorization.split(" ")[1];
    const authorizationHeader = req.headers.authorization;

if (!authorizationHeader) {
  // Handle the case where there is no Authorization header
  return res.status(401).json({ message: 'Unauthorized' });
}

const token = authorizationHeader.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;