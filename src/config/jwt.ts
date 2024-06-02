const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

import CustomError from "../utils/CustomError";

const privateKey = fs.readFileSync(
  path.join(__dirname, "..", "keys", "private.pem")
);

const publicKey = fs.readFileSync(
  path.join(__dirname, "..", "keys", "public.pem")
);

if (!privateKey) {
  throw new Error("Private key is required for JWT token");
}

if (!publicKey) {
  throw new Error("Public key is required for JWT token");
}

export const signToken = (payload: any): string => {
  try {
    if (!privateKey) {
      throw new Error("Private key is required for JWT token");
    }
    const jwtToken = jwt.sign(payload, privateKey, {
      expiresIn: "2d",
      algorithm: "RS256",
    });
    if (jwtToken) {
      return jwtToken;
    } else {
      throw new Error("Error generating JWT token");
    }
  } catch (error) {
    throw error;
  }
};

export const verifyToken = (token: string) => {
  try {
    if (!publicKey) {
      throw new Error("Public key is required for JWT token");
    }
    const decodedToken = jwt.verify(token, publicKey, {
      algorithm: "RS256",
    });
    if (decodedToken) {
      return decodedToken;
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    throw error;
  }
};
