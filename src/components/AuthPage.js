import axios from 'axios'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.scss';
import './AuthForm.scss';

const AuthPage = ({ title, slug, setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const { data: { userId } } = await axios.post(slug, { email: email, password: password });
    setUserId(userId);
    navigate('/');
  }

  return (
    <div className="auth-page">
      <div className="auth-page__form-wrapper">
        <h1 className="auth-page__title">{title}</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-form__input" 
            onChange={e => setEmail(e.target.value)} 
            name="email"
            placeholder="Email" 
            required
            type="email"
            value={email}
          />
          <input 
            className="auth-form__input" 
            onChange={e => setPassword(e.target.value)} 
            name="password" 
            placeholder="Password"
            required
            type="password"  
            value={password} 
          />
          <input className="auth-form__button" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default AuthPage;