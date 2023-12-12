const jwt = require('jsonwebtoken');
const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

class TokenManager {
  static getGenerateAccessToken(payload)
  {
    return jwt.sign(
        payload,
        ACCESS_SECRET,
        {'expiresIn':'1d'}
      );
  }
  static getGenerateRefreshToken(payload)
  {
    return jwt.sign(
        payload,
        REFRESH_SECRET,
        {'expiresIn':'30d'}
      );
  }
  static authAccess(req) {
    try {
      let accessToken = req.headers.authorization.split(' ')[1];
      let jwtRes = jwt.verify(String(accessToken),ACCESS_SECRET)
      return jwtRes
    }catch(err) {
      return false
    }
  }
  static authRefresh(req) {
    try {
      let refreshToken = req.headers.authorization.split(' ')[1];
      let jwtRes = jwt.verify(String(refreshToken),REFRESH_SECRET)
      return jwtRes
    }catch(err) {
      return false
    }
  }
  static getSecret() {
    return require('crypto').randomBytes(64).toString('hex');
  }
}
module.exports = TokenManager;
// console.log(TokenManager.getSecret());