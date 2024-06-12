"use client"

// src/App.tsx
import React from 'react';
import Login from './components/Login';
import Payment from './components/Payment';

const App: React.FC = () => {
  return (
    <div className=''>
      <h1>App de Pagamentos</h1>
      <Login />
      <Payment />
    </div>
  );
};

export default App;
