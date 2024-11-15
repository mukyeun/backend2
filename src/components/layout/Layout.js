import React from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/auth';
import PropTypes from 'prop-types';

const MOBILE_BREAKPOINT = '768px';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      // 에러 처리 로직 추가
    }
  };

  return (
    <LayoutContainer>
      <Header>
        <Title>건강정보 시스템</Title>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Header>
      <MainContent>
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #4361ee;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const Title = styled.h1`
  font-size: 1.25rem;
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background-color: transparent;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 2rem;

  > div {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid #e2e8f0;
  }

  h3 {
    color: #fff;
    background: linear-gradient(135deg, #4361ee, #3651d4);
    padding: 0.75rem 1.25rem;
    border-radius: 6px;
    margin: -1.5rem -1.5rem 1.5rem -1.5rem;
    font-size: 1rem;
    font-weight: 500;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .error-message {
    color: #e53e3e;
    font-size: 0.875rem;
    margin-top: -0.5rem;
    margin-bottom: 1rem;
  }
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;