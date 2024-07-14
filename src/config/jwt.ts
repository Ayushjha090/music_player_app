const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

import { DecodedToken, JWTPayload } from "../types/jwt";
import CustomError from "../utils/CustomError";

const getPrivateKey = (): string => {
  const privateKey = fs.readFileSync(
    path.join(__dirname, "..", "keys", "private.pem")
  );
  return privateKey;
};

const getPublicKey = (): string => {
  const publicKey = fs.readFileSync(
    path.join(__dirname, "..", "keys", "public.pem")
  );
  return publicKey;
};

export const signToken = (payload: JWTPayload): string => {
  try {
    const privateKey = getPrivateKey();
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
    console.log("Error signing JWT token: ", error);
    throw new CustomError(500, "Internal Server Error");
  }
};

export const verifyToken = (token: string): DecodedToken => {
  try {
    const publicKey = getPublicKey();
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
    console.log("Error verifying JWT Token", error);
    throw new CustomError(500, "Internal Server Error");
  }
};
