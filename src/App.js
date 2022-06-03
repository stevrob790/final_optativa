import React from 'react';
import { UserProvider } from './Models/User';
import { Router } from './Views/Router';

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;
