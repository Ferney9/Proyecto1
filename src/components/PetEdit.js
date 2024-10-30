// src/components/PetEdit.js
import React from 'react';
import PetForm from './PetForm';

const PetEdit = ({ pet, updatePet }) => {
    const handleUpdate = (updatedPet) => {
        // Lógica para actualizar la mascota (llamar a tu API o manejar el estado)
        updatePet(updatedPet);
    };

    return (
        <div>
            <h2>Edit Pet</h2>
            <PetForm pet={pet} onSubmit={handleUpdate} />
        </div>
    );
};

export default PetEdit;
