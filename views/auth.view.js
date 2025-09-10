exports.successRegister = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

exports.successLogin = (result) => ({
  token: result.token,
  expiresIn: result.expiresIn,
  role:result.role
});
