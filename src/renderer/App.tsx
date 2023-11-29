import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Window } from './views/Window';
import { useEffect } from 'react';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Window />} />
      </Routes>
    </Router>
  );
}
