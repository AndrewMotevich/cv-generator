export const JWT_REFRESH_OPTIONS = {
  secret: process.env.JWT_REFRESH_SECRET,
  expiresIn: '1d',
};

export const JWT_ACCESS_OPTIONS = {
  secret: process.env.JWT_ACCESS_SECRET,
  expiresIn: '5m',
};
