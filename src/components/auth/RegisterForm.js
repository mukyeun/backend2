import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../../api/auth';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
    } catch (err) {
      setError(err.message || '회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>회원가입</FormTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>이름</Label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="이름을 입력하세요"
            disabled={isLoading}
          />
        </FormGroup>
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
        <FormGroup>
          <Label>비밀번호 확인</Label>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="비밀번호를 다시 입력하세요"
            disabled={isLoading}
          />
        </FormGroup>
        <ButtonGroup>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? '가입 중...' : '가입하기'}
          </SubmitButton>
          <CancelButton 
            type="button" 
            onClick={() => navigate('/login')}
            disabled={isLoading}
          >
            취소
          </CancelButton>
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

const CancelButton = styled(Button)`
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

export default RegisterForm;