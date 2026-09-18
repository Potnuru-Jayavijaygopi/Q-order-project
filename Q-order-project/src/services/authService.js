
const TOKEN_KEY = 'qorder_jwt_access_token';
const REFRESH_TOKEN_KEY = 'qorder_jwt_refresh_token';
const USER_KEY = 'qorder_auth_user';

const base64UrlEncode = (str) => {
  return btoa(str)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const base64UrlDecode = (str) => {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
};

export const generateJWTToken = (userPayload) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const nowInSeconds = Math.floor(Date.now() / 1000);
  const payload = {
    sub: userPayload.email || userPayload.username || '',
    role: userPayload.role || '',
    iat: nowInSeconds,
    exp: nowInSeconds + (24 * 60 * 60), 
    iss: 'qorder-auth-server'
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const dummySignature = base64UrlEncode(`sig_${nowInSeconds}_${payload.role}`);

  return `${encodedHeader}.${encodedPayload}.${dummySignature}`;
};

export const decodeToken = (token) => {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const decodedPayloadStr = base64UrlDecode(parts[1]);
    return JSON.parse(decodedPayloadStr);
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return null;
  }
};

export const isTokenValid = (token) => {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return false;
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp > currentTime;
};

export const loginUser = (emailOrUsername, password, role) => {
  const selectedRole = role || '';
  const userPayload = {
    email: emailOrUsername || '',
    role: selectedRole
  };

  const token = generateJWTToken(userPayload);
  const refreshToken = generateJWTToken({ ...userPayload, type: 'refresh' });

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(userPayload));

  console.log(
    '%c 🔑 [JWT Auth] Token Generated Successfully! ',
    'background: #111827; color: #ff5200; font-weight: bold; font-size: 14px; padding: 4px 8px; border-radius: 4px;'
  );
  console.log('👤 Role:', selectedRole);
  console.log('📧 User:', userPayload.email);
  console.log('🎟️ JWT Access Token:\n', token);
  console.log('🔄 JWT Refresh Token:\n', refreshToken);
  console.log('📦 Decoded Payload:', decodeToken(token));

  return {
    success: true,
    token,
    refreshToken,
    user: userPayload,
    decoded: decodeToken(token)
  };
};

export const registerUser = (userData) => {
  const userPayload = {
    email: userData.emailId || userData.username || '',
    role: userData.role || '',
    firstName: userData.firstName || '',
    lastName: userData.lastName || ''
  };

  const token = generateJWTToken(userPayload);
  const refreshToken = generateJWTToken({ ...userPayload, type: 'refresh' });

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(userPayload));

  console.log(
    '%c 🔑 [JWT Auth] Sign Up Token Generated Successfully! ',
    'background: #111827; color: #10b981; font-weight: bold; font-size: 14px; padding: 4px 8px; border-radius: 4px;'
  );
  console.log('👤 Role:', userPayload.role);
  console.log('📧 User:', userPayload.email);
  console.log('🎟️ JWT Access Token:\n', token);
  console.log('🔄 JWT Refresh Token:\n', refreshToken);
  console.log('📦 Decoded Payload:', decodeToken(token));

  return {
    success: true,
    token,
    refreshToken,
    user: userPayload,
    decoded: decodeToken(token)
  };
};

export const logoutUser = () => {
  console.log(
    '%c 🚪 [JWT Auth] User Logged Out - Tokens Purged ',
    'background: #111827; color: #ef4444; font-weight: bold; font-size: 13px; padding: 4px 8px; border-radius: 4px;'
  );
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getStoredToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && isTokenValid(token)) {
    return token;
  }
  return null;
};

export const getAuthenticatedUser = () => {
  const token = getStoredToken();
  if (!token) return null;
  return decodeToken(token);
};
