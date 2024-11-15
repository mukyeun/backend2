import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <PageContainer>
      <LoginForm />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  padding: 1rem;
`;

export default LoginPage;