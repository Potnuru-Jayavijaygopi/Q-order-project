import React, { useState, useEffect } from 'react';
import PageOne from './components/canteen/onboarding/PageOne';
import PageTwo from './components/canteen/onboarding/PageTwo';
import ForgotPasswordPage from './components/canteen/onboarding/ForgotPasswordPage';
import CheckYourEmailPage from './components/canteen/onboarding/CheckYourEmailPage';
import SignUpPage from './components/canteen/onboarding/SignUpPage';
import CanteenSignUpPage from './components/canteen/onboarding/CanteenSignUpPage';
import CanteenHome from './components/canteen/Home';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  getStoredToken, 
  getAuthenticatedUser 
} from './services/authService';

function App() {
  const [currentPage, setCurrentPage] = useState('canteen_home'); 
  const [selectedRole, setSelectedRole] = useState('Canteen');

  useEffect(() => {
    const existingToken = getStoredToken();
    const existingUser = getAuthenticatedUser();
    if (existingToken && existingUser) {
      setSelectedRole('Canteen');
      setCurrentPage('canteen_home');
    }
  }, []);

  const handleRoleNavigation = (role) => {
    setSelectedRole('Canteen');
    setCurrentPage('canteen_signup');
  };

  const handleLogin = (role, email, password) => {
    setSelectedRole('Canteen');
    loginUser(email, password, 'Canteen');
    setCurrentPage('canteen_home');
  };

  const handleSignUpSuccess = (roleOrData) => {
    setSelectedRole('Canteen');
    registerUser({ role: 'Canteen' });
    setCurrentPage('canteen_home');
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentPage('onboarding2');
  };

  return (
    <div style={{ margin: 0, padding: 0, width: '100%', minHeight: '100vh' }}>
      {currentPage === 'onboarding1' ? (
        <PageOne onNext={() => setCurrentPage('onboarding2')} />
      ) : currentPage === 'onboarding2' ? (
        <PageTwo 
          onLogin={(role, email, password) => handleLogin(role, email, password)}
          onSignUp={() => handleRoleNavigation('Canteen')}
          onForgotPassword={() => setCurrentPage('forgot_password')}
        />
      ) : currentPage === 'signup' || currentPage === 'canteen_signup' ? (
        <CanteenSignUpPage 
          onSignUpSuccess={(data) => handleSignUpSuccess(data || { role: 'Canteen' })}
          onBackToLogin={() => setCurrentPage('onboarding2')}
          onRoleChange={(newRole) => handleRoleNavigation(newRole)}
        />
      ) : currentPage === 'forgot_password' ? (
        <ForgotPasswordPage
          onSubmitEmail={() => setCurrentPage('check_email')}
          onLogin={() => setCurrentPage('check_email')}
          onBackToLogin={() => setCurrentPage('onboarding2')}
        />
      ) : currentPage === 'check_email' ? (
        <CheckYourEmailPage
          onVerifySuccess={() => handleLogin('Canteen')}
          onBackToForgot={() => setCurrentPage('forgot_password')}
        />
      ) : (
        <CanteenHome onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;