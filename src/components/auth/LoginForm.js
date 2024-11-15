import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../../api/auth';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(formData);
      navigate('/'); // 로그인 성공 시 메인 페이지로 이동
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>로그인</FormTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>이메일</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="이메일을 입력하세요"
            disabled={isLoading}
          />
        </FormGroup>
        <FormGroup>
          <Label>비밀번호</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="비밀번호를 입력하세요"
            disabled={isLoading}
          />
        </FormGroup>
        <ButtonGroup>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </SubmitButton>
          <RegisterButton 
            type="button" 
            onClick={() => navigate('/register')}
            disabled={isLoading}
          >
            회원가입
          </RegisterButton>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};
const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #666;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4361ee;
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(Button)`
  background: #4361ee;
  color: white;

  &:hover:not(:disabled) {
    background: #3730a3;
  }
`;

const RegisterButton = styled(Button)`
  background: #e5e7eb;
  color: #4b5563;

  &:hover:not(:disabled) {
    background: #d1d5db;
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  padding: 0.5rem;
  background-color: #fff5f5;
  border-radius: 4px;
`;

export default LoginForm;