/**
 * Decode JWT token without verification
 * Note: This only decodes the payload, it does NOT verify the signature
 * For production, you should verify the token signature on the backend
 */
export const decodeJWT = (token: string): any => {
  try {
    // Clean the token - remove whitespace and quotes
    let cleanToken = token.trim();
    
    // Remove surrounding quotes if present
    if ((cleanToken.startsWith('"') && cleanToken.endsWith('"')) ||
        (cleanToken.startsWith("'") && cleanToken.endsWith("'"))) {
      cleanToken = cleanToken.slice(1, -1);
    }
    
    // Log token info for debugging
    console.log('🔍 Decoding JWT token:', {
      tokenLength: cleanToken.length,
      tokenPreview: cleanToken.substring(0, 50) + '...',
      hasThreeParts: cleanToken.split('.').length === 3,
    });
    
    // JWT should have 3 parts separated by dots
    const parts = cleanToken.split('.');
    if (parts.length !== 3) {
      console.error('❌ Invalid JWT format - expected 3 parts, got:', parts.length);
      throw new Error(`Invalid JWT format: expected 3 parts separated by '.', got ${parts.length}`);
    }
    
    const base64Url = parts[1];
    if (!base64Url) {
      throw new Error('Invalid token format - missing payload');
    }
    
    // Add padding if needed for base64 decoding
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding) {
      base64 += '='.repeat(4 - padding);
    }
    
    // Decode base64
    let decodedPayload;
    try {
      decodedPayload = atob(base64);
    } catch (base64Error) {
      console.error('❌ Base64 decoding error:', base64Error);
      console.error('❌ Base64 string:', base64.substring(0, 100));
      throw new Error('Not a valid base64 encoded string');
    }
    
    // Convert to JSON
    const jsonPayload = decodeURIComponent(
      decodedPayload
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const decoded = JSON.parse(jsonPayload);
    console.log('✅ JWT decoded successfully:', {
      hasSub: !!decoded.sub,
      hasRole: !!decoded.role,
      hasExp: !!decoded.exp,
      decodedKeys: Object.keys(decoded),
    });
    
    return decoded;
  } catch (error: any) {
    console.error('❌ Error decoding JWT:', error.message);
    console.error('❌ Token preview:', token ? token.substring(0, 100) : 'No token');
    return null;
  }
};

/**
 * Check if JWT token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    
    // exp is in seconds, Date.now() is in milliseconds
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

