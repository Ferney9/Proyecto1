import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PetForm from './components/PetForm';
import Login from './components/Login';
import PetsList from './components/PetList'; // Asegúrate de que la importación sea correcta
import RegisterForm from './components/register'; // Asegúrate de que la importación sea correcta

const App = () => {
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    const handleLogin = (id) => {
        setUserId(id);
        localStorage.setItem('userId', id);
    };

    const handleLogout = () => {
        setUserId(null);
        localStorage.removeItem('userId'); // Elimina el userId del almacenamiento local
    };

    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={userId ? <Navigate to="/pets" /> : <Login onLogin={handleLogin} />} 
                />
                <Route 
                    path="/pets" 
                    element={userId ? <PetsList userId={userId} onLogout={handleLogout} /> : <Navigate to="/" />}
                />
                <Route 
                    path="/pets/edit/:id" 
                    element={userId ? <PetForm userId={userId} /> : <Navigate to="/" />}
                />
                <Route 
                    path="/users/:userId/pets/new" 
                    element={userId ? <PetForm userId={userId} /> : <Navigate to="/" />}
                />
                <Route 
                    path="/register" 
                    element={<RegisterForm />} 
                />
            </Routes>
        </Router>
    );
};

export default App;
