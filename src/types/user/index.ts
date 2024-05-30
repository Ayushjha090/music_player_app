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
