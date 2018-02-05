import jwt from 'hapi-auth-jwt';
console.log(jwt);
jwt.name = 'jwt';
exports.plugin = jwt;
