// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', { username, password });
            onLogin(response.data.userId);
        } catch (error) {
            setError('Error al iniciar sesión. Inténtalo de nuevo.');
        }
    };

    const styles = {
        appContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',  // Ocupa toda la altura de la ventana
            backgroundColor: '#e0e0e0',
            margin: 0,        // Asegura que no haya margen en el contenedor principal
        },
        container: {
            width: '100%',
            maxWidth: '400px',  // Limita el ancho máximo del contenedor
            padding: '2rem',
            textAlign: 'center',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box',
            marginTop: '200px',  // Agrega un margen superior para despegarlo de la parte superior
        },
        header: {
            margin: '0.5rem 0',
        },
        h1: {
            color:  '#4665ff',
            fontSize: '1.5rem',
        },
        h2: {
            color: 'black',
            fontSize: '1.5rem',
        },
        error: {
            color: 'red',
            marginBottom: '1rem',
        },
        form: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginBottom: '1rem',
            textAlign: 'left',
        },
        label: {
            marginBottom: '0.5rem',
            fontWeight: 'bold',
        },
        input: {
            padding: '0.5rem',
            fontSize: '1rem',
            width: '100%',
            borderRadius: '4px',
            border: '1px solid #ccc',
        },
        button: {
            padding: '0.7rem 1rem',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#4665ff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '1rem',
            width: '100%',
        },
        secondaryButton: {
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            color: '#4665ff',
            backgroundColor: 'transparent',
            border: '1px solid #4665ff',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={{ ...styles.header, ...styles.h1 }}>Bienvenidos a Help & Health</h1>
            <h2 style={styles.header}>Iniciar Sesión</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Usuario:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Contraseña:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Login</button>
            </form>
            <button onClick={() => navigate('/register')} style={styles.secondaryButton}>
                Crear Usuario Nuevo
            </button>
        </div>
    );
    
};

export default Login;
