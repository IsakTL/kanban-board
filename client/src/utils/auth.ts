// import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    return;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    return token;
  }

  getToken(): string {
    // Returns the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    localStorage.setItem('id_token',idToken);
    // Redirect to the home page for user
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    // Redirect to general login page
    window.location.assign('/login');
  }
}

export default new AuthService();
