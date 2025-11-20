import React, { useState, useEffect } from 'react';
import './ApiKeyPage.css';
import logo from "../assets/AmC.svg";
import { useAppStore } from '../store';

const ApiKeyPage: React.FC = () => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const { setApiKey, setPage } = useAppStore();

  useEffect(() => {
    document.body.classList.add('api-key-active');
    return () => {
      document.body.classList.remove('api-key-active');
    };
  }, []);

  const handleAccess = () => {
    if (apiKeyInput.trim()) {
      setApiKey(apiKeyInput);
      setPage({ page: 'search' });
    } else {
      alert('Inserisci una chiave API valida.');
    }
  };

  const handleUseMocks = () => {
    setApiKey('');
    setPage({ page: 'search' });
  };

  return (
    <div className="api-key-page">
      <div className="api-key-container">
        <img src={logo} alt="logo" className="logo-image" />
        <h1>Inserisci la tua API Key</h1>
        <p>Per utilizzare l'app, inserisci la tua chiave API di Spoonacular.</p>
        <input
          type="text"
          placeholder="Inserisci API Key"
          value={apiKeyInput}
          onChange={(e) => setApiKeyInput(e.target.value)}
          className="api-key-input"
        />
        <button onClick={handleAccess} className="access-btn">Accedi</button>
        <button onClick={handleUseMocks} className="mocks-btn">Usa Mocks</button>
      </div>
    </div>
  );
};

export default ApiKeyPage;