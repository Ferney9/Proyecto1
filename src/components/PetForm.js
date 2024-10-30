import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PetForm = ({ userId }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [photo, setPhoto] = useState(null); // Cambia el estado a null
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchPet = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3000/pets/${id}`);
                    const pet = response.data;
                    setName(pet.name);
                    setType(pet.type);
                    setBreed(pet.breed);
                    setAge(pet.age);
                    setPhoto(pet.photo); // Asegúrate de que la URL de la imagen esté bien
                    setIsEditing(true);
                } catch (error) {
                    console.error('Error fetching pet:', error);
                }
            }
        };

        fetchPet();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const petData = new FormData();
        petData.append('name', name);
        petData.append('type', type);
        petData.append('breed', breed);
        petData.append('age', age);

        if (photo) {
            petData.append('photo', photo); // Añadir el archivo de imagen
        }

        try {
            if (isEditing) {
                await axios.put(`http://localhost:3000/pets/${id}`, petData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Mascota actualizada con éxito');
            } else {
                await axios.post(`http://localhost:3000/users/${userId}/pets`, petData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Mascota creada con éxito');
            }
            // Redirigir al listado de mascotas después de la creación o actualización
            navigate('/pets');
        } catch (error) {
            console.error('Error al guardar la mascota:', error);
            alert('Error al guardar la mascota');
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file); // Guardar el archivo en lugar de convertir a base64
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center', // Centrado horizontal
            alignItems: 'center', // Centrado vertical
            minHeight: '100vh',
            backgroundColor: 'white',
            padding: '20px',
        },
        formContainer: {
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto',
            textAlign: 'center', // Alinea el contenido centrado dentro del contenedor del formulario
        },
        title: {
            color: '#4665ff', // Color azul
            textAlign: 'center', // Centrar texto
            marginBottom: '20px', // Margen inferior para separar del formulario
        },
        input: {
            width: '93%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#4665ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
        },
        imagePreview: {
            width: '100%',
            height: 'auto',
            marginTop: '10px',
        },
    };
    
    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                {/* Título dinámico con estilo */}
                <h2 style={styles.title}>{isEditing ? 'Actualizar datos de mascota' : 'Página para crear mascota'}</h2>
                
                <form onSubmit={handleSubmit}>
                    {/* Campos del formulario */}
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Tipo"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Raza"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="number"
                        placeholder="Edad"
                        value={age}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value < 0) {
                                alert('La edad no puede ser negativa');
                            } else {
                                setAge(value);
                            }
                        }}
                        min="0"
                        required
                        style={styles.input}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={styles.input}
                    />
                    {photo && typeof photo === 'object' && (
                        <img src={URL.createObjectURL(photo)} alt="Pet" style={styles.imagePreview} />
                    )}
                    <button type="submit" style={styles.button}>
                        {isEditing ? 'Actualizar' : 'Crear'} Mascota
                    </button>
                </form>
            </div>
        </div>
    );
    
};

export default PetForm;
