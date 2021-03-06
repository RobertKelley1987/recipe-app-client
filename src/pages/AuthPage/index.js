import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.scss';
import './AuthForm.scss';

const AuthPage = ({ authFn, title, setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    const { userId, err } = await authFn(email, password);
    if(err) {
      setErrorMessage(err.message);
    } else {
      setUserId(userId);
      navigate('/');
    }
    setSubmitting(false);
  }

  // Clear form inputs and error message if switching from log in to sign in screen, or vice versa
  useEffect(() => {
    setEmail('');
    setPassword('');
    setErrorMessage('')
  }, [title])

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
          <input className="auth-form__button" disabled={submitting} type="submit" value="Submit" />
        </form>
        {errorMessage && <p className="auth-page__error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default AuthPage;