import React, { useState, useEffect } from 'react';
import PageOne from './components/restaurant/onboarding/PageOne';
import PageTwo from './components/restaurant/onboarding/PageTwo';
import ForgotPasswordPage from './components/restaurant/onboarding/ForgotPasswordPage';
import CheckYourEmailPage from './components/restaurant/onboarding/CheckYourEmailPage';
import SignUpPage from './components/restaurant/onboarding/SignUpPage';
import CanteenSignUpPage from './components/canteen/onboarding/CanteenSignUpPage';
import StudentUniversitySelectPage from './components/student/onboarding/StudentUniversitySelectPage';
import StudentSignUpPage from './components/student/onboarding/StudentSignUpPage';
import ChefSignUpPage from './components/chef/onboarding/ChefSignUpPage';
import Home from './components/restaurant/home/Home';
import CanteenHome from './components/canteen/Home';
import StudentHome from './components/student/Home';
import ChefHome from './components/chef/Home';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  getStoredToken, 
  getAuthenticatedUser 
} from './services/authService';

function App() {
  const [currentPage, setCurrentPage] = useState('onboarding1'); 
  const [selectedRole, setSelectedRole] = useState('Restaurant');

  useEffect(() => {
    const existingToken = getStoredToken();
    const existingUser = getAuthenticatedUser();
    if (existingToken && existingUser) {
      setSelectedRole(existingUser.role || 'Restaurant');
      if (existingUser.role === 'Canteen') {
        setCurrentPage('canteen_home');
      } else if (existingUser.role === 'Student') {
        setCurrentPage('student_home');
      } else if (existingUser.role === 'Chef') {
        setCurrentPage('chef_home');
      } else {
        setCurrentPage('home');
      }
    }
  }, []);

  const handleRoleNavigation = (role) => {
    if (!role) return;
    setSelectedRole(role);
    if (role === 'Canteen') {
      setCurrentPage('canteen_signup');
    } else if (role === 'Student') {
      setCurrentPage('student_university_select');
    } else if (role === 'Chef') {
      setCurrentPage('chef_signup');
    } else if (role === 'Restaurant') {
      setCurrentPage('signup');
    }
  };

  const handleLogin = (role, email, password) => {
    const userRole = role || selectedRole || 'Restaurant';
    setSelectedRole(userRole);

    loginUser(email, password, userRole);

    if (userRole === 'Canteen') {
      setCurrentPage('canteen_home');
    } else if (userRole === 'Student') {
      setCurrentPage('student_home');
    } else if (userRole === 'Chef') {
      setCurrentPage('chef_home');
    } else {
      setCurrentPage('home');
    }
  };

  const handleSignUpSuccess = (roleOrData) => {
    const userData = typeof roleOrData === 'object' ? roleOrData : { role: roleOrData || selectedRole };
    const userRole = userData.role || selectedRole || 'Restaurant';
    setSelectedRole(userRole);

    registerUser({ ...userData, role: userRole });

    if (userRole === 'Canteen') {
      setCurrentPage('canteen_home');
    } else if (userRole === 'Student') {
      setCurrentPage('student_home');
    } else if (userRole === 'Chef') {
      setCurrentPage('chef_home');
    } else {
      setCurrentPage('home');
    }
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
          onSignUp={() => handleRoleNavigation(selectedRole || 'Restaurant')}
          onForgotPassword={() => setCurrentPage('forgot_password')}
        />
      ) : currentPage === 'signup' ? (
        <SignUpPage 
          onSignUpSuccess={(data) => handleSignUpSuccess(data || { role: 'Restaurant' })}
          onBackToLogin={() => setCurrentPage('onboarding2')}
          onRoleChange={(role) => handleRoleNavigation(role)}
        />
      ) : currentPage === 'canteen_signup' ? (
        <CanteenSignUpPage 
          onSignUpSuccess={(data) => handleSignUpSuccess(data || { role: 'Canteen' })}
          onBackToLogin={() => setCurrentPage('onboarding2')}
          onRoleChange={(newRole) => handleRoleNavigation(newRole)}
        />
      ) : currentPage === 'chef_signup' ? (
        <ChefSignUpPage 
          onSignUpSuccess={(data) => handleSignUpSuccess(data || { role: 'Chef' })}
          onBackToLogin={() => setCurrentPage('onboarding2')}
          onRoleChange={(newRole) => handleRoleNavigation(newRole)}
        />
      ) : currentPage === 'student_university_select' ? (
        <StudentUniversitySelectPage 
          onSubmitUniversity={() => setCurrentPage('student_signup')}
          onBackToLogin={() => setCurrentPage('onboarding2')}
        />
      ) : currentPage === 'student_signup' ? (
        <StudentSignUpPage 
          onSignUpSuccess={(data) => handleSignUpSuccess(data || { role: 'Student' })}
          onBackToUniversity={() => setCurrentPage('student_university_select')}
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
          onVerifySuccess={() => handleLogin(selectedRole)}
          onBackToForgot={() => setCurrentPage('forgot_password')}
        />
      ) : currentPage === 'student_home' ? (
        <StudentHome onLogout={handleLogout} />
      ) : currentPage === 'canteen_home' ? (
        <CanteenHome onLogout={handleLogout} />
      ) : currentPage === 'chef_home' ? (
        <ChefHome onLogout={handleLogout} />
      ) : (
        <Home onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;