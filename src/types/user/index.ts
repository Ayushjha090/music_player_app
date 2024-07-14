export type Registration = {
  firstName: string;
  lastName: string | null;
  email: string;
  password: string;
  dateOfBirth: string | null;
  gender: string | null;
};

export type OTP = {
  email: string;
  password: string;
};

export type Authentication = {
  email: string;
  password: string;
  oneTimePassword: string;
};

export type UserDetails = {
  id: string;
  firstName: string;
  lastName: string | null;
  userName: string;
  email: string;
  dateOfBirth: string;
  gender: string | null;
  contact: string | null;
  subscription: string;
  createdAt: string;
  updatedAt: string;
  token: string;
};
