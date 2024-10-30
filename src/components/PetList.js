import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PetsList = ({ userId, onLogout }) => {
    const [pets, setPets] = useState([]);
    const [username, setUsername] = useState(''); // Estado para almacenar el nombre del usuario
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${userId}/pets`);
                setPets(response.data);
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

        const fetchUsername = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${userId}`);
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        if (userId) {
            fetchPets();
            fetchUsername();
        }
    }, [userId]);

    const handleEdit = (id) => {
        navigate(`/pets/edit/${id}`);
    };

    const handleCreate = () => {
        navigate(`/users/${userId}/pets/new`);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta mascota?');
        if (!confirmed) return;

        try {
            await axios.delete(`http://localhost:3000/pets/${id}`);
            setPets(pets.filter(pet => pet.id !== id));
        } catch (error) {
            console.error('Error deleting pet:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId'); // Elimina el userId del almacenamiento local
        onLogout(); // Llama a la función de cierre de sesión en App.js
        navigate('/'); // Redirige al inicio de sesión
    };

    const styles = {
        appContainer: {
            backgroundColor: '#ADD8E6', // Fondo azul claro
            padding: '20px',
            textAlign: 'center',
        },
        title: {
            margin: '0.5rem 0',
        },
        subtitle: {
            margin: '1rem 0',
            fontSize: '1rem',
        },
        petGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)', // Dos columnas
            gap: '20px', // Espaciado entre elementos
            listStyleType: 'none', // Sin viñetas
            padding: 0,
        },
        petItem: {
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            height: '300px', // Altura del contenedor
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        petName: {
            color:'#4665ff',
            fontWeight: 'bold',
            marginBottom: '10px',
            textAlign: 'center',
        },
        petImage: {
            width: '100%',
            height: '200px', // Ajusta la altura de la imagen
            objectFit: 'cover', // Ajusta la imagen sin deformarla
            borderRadius: '8px',
            marginBottom: '10px',
        },
        buttonRow: {
            display: 'flex',
            gap: '10px', // Espacio entre los botones
        },
        button: {
            flex: 1, // Cada botón ocupa el 50% del ancho disponible
            backgroundColor: '#4665ff',
            color:'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '10px',
            cursor: 'pointer',
            textAlign: 'center',
        },
        addButton: {
            backgroundColor: 'white', // Fondo blanco para el botón de agregar
            border: 'none',
            borderRadius: '4px',
            padding: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10px',
        },
        addIcon: {
            marginRight: '5px', // Espaciado entre icono y texto
        },
    };
    
    return (
        <div style={styles.appContainer}>
            <h2 style={styles.title}>Hola, {username}</h2>
            <p style={styles.subtitle}>Tus mascotas, selecciona la que quieras</p>
            <ul style={styles.petGrid}>
                {pets.map((pet) => {
                    const imageUrl = `http://localhost:3000/${pet.photo}`;
                    return (
                        <li key={pet.id} style={styles.petItem}>
                            <div style={styles.petName}>{pet.name}</div>
                            {pet.photo ? (
                                <img src={imageUrl} alt={pet.name} style={styles.petImage} />
                            ) : (
                                <div
                                    style={{
                                        ...styles.petImage,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#f0f0f0',
                                    }}
                                >
                                    <span>Sin foto</span>
                                </div>
                            )}
                            <div style={styles.buttonRow}>
                                <button style={styles.button} onClick={() => handleEdit(pet.id)}>
                                    Editar
                                </button>
                                <button style={styles.button} onClick={() => handleDelete(pet.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    );
                })}
                <li style={{ ...styles.petItem, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button onClick={handleCreate} style={styles.addButton}>
                        <span style={styles.addIcon}>+</span>
                        Agregar
                    </button>
                </li>
            </ul>
            <button style={styles.button} onClick={handleLogout}>Cerrar sesión</button>
            <br /><br />
        </div>
    );
};

export default PetsList;