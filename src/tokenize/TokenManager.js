const Jwt = require('@hapi/jwt');

const TokenManager = {
  // Jwt.token.generate(payload, secretKey)
  generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
};

module.exports = TokenManager;
