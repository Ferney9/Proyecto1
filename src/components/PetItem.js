import React, { useState } from 'react';
import axios from 'axios';

const PetItem = ({ pet, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPet, setEditedPet] = useState(pet);

    const handleDelete = async () => {
        await axios.delete(`http://localhost:3000/pets/${pet.id}`);
        window.location.reload(); // Recargar para ver la lista actualizada
    };

    const handleEdit = async () => {
        await axios.put(`http://localhost:3000/pets/${pet.id}`, editedPet);
        setIsEditing(false); // Cierra el modo de edición
        onUpdate(); // Llama a la función para actualizar la lista de mascotas
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPet({ ...editedPet, [name]: value });
    };

    return (
        <li>
            <img src={pet.photo} alt={pet.name} width="100" />
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="name"
                        value={editedPet.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="type"
                        value={editedPet.type}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="breed"
                        value={editedPet.breed}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="age"
                        value={editedPet.age}
                        onChange={handleChange}
                    />
                    <button onClick={handleEdit}>Guardar</button>
                    <button onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>
            ) : (
                <div>
                    <p>Name: {pet.name}</p>
                    <p>Type: {pet.type}</p>
                    <p>Breed: {pet.breed}</p>
                    <p>Age: {pet.age} años</p>
                    <button onClick={() => setIsEditing(true)}>Editar</button>
                    <button onClick={handleDelete}>Eliminar</button>
                </div>
            )}
        </li>
    );
};

export default PetItem;
