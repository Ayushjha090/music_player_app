export type JWTPayload = {
  id: string;
  userId: string;
  expirationTime: Date;
};

export type DecodedToken = {
  id: string;
  userId: string;
  expirationTime: string;
  iat: number;
  exp: number;
};
