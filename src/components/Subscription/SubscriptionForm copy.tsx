import React, { useState, ChangeEvent } from "react";

const SubscriptionForm: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (text: ChangeEvent<HTMLInputElement>) => {
        setName(text.target.value);
        console.log(text.target.value)
    };

    const handlePriceChange = (text: ChangeEvent<HTMLInputElement>) => {
        setPrice(text.target.value);
    };

    const handleDescriptionChange = (text: ChangeEvent<HTMLInputElement>) => {
        setDescription(text.target.value);
    };

    const handleCreateProduct = () => {
        // Aquí puedes realizar alguna acción con los datos del producto
        console.log('Nombre:', name);
        console.log('Precio:', price);
        console.log('Descripción:', description);
        // Resto de la lógica...
        setName('');
        setPrice('');
        setDescription('');
    };

    return (
        <form >
            <div className="form-group">
                <input
                    className="form-control"
                    placeholder="Nombre del producto"
                    value={name}
                    onChange={handleNameChange}
                />
                <input
                    className="form-control"
                    placeholder="Precio"
                    value={price}
                    onChange={handlePriceChange}
                />
                <input
                    className="form-control"
                    placeholder="Descripción"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <button className="btn btn-success" title="Crear Producto" onClick={handleCreateProduct}>Crear Listado</button>

            </div>
        </form>
    );
};

export default SubscriptionForm;