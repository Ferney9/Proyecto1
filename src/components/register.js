import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/register', { username, password });
            setMessage({ type: 'success', text: 'Usuario registrado con éxito.' });
            setTimeout(() => {
                navigate('/'); // Redirige al login tras 2 segundos
            }, 2000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Error al registrar el usuario. Inténtalo de nuevo.' });
        }
    };
    
    const styles = {
        appContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#ffffff',
            margin: 0,
        },
        container: {
            width: '100%',
            maxWidth: '400px',
            padding: '2rem',
            textAlign: 'center',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box',
  
        },
        header: {
            margin: '0.5rem 0',
        },
        h1: {
            color: '#4665ff',
            fontSize: '1.5rem',
            margin: '3rem 3rem', // Margen de 1rem arriba y abajo

        },
        error: {
            color: 'red',
            marginBottom: '1rem',
        },
        success: {
            color: 'green',
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
            color: 'white',
            backgroundColor: '#4665ff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '1rem',
            width: '100%',
        },
    };

    return (
        <div style={styles.appContainer}>
            <div style={styles.container}>
            <h1 style={{ ...styles.header, ...styles.h1 }}>Registrar Nuevo Usuario</h1>
                {message && (
                    <p style={message.type === 'success' ? styles.success : styles.error}>{message.text}</p>
                )}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Nombre de usuario:</label>
                        <input 
                            type="text" 
                            placeholder="Nombre de usuario" 
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
                            placeholder="Contraseña" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Registrar</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
