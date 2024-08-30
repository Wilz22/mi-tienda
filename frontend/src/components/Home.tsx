import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

const Home = () => {
    return (
        <div className="p-grid p-justify-center">
            <div className="p-col-12 p-md-8">
                <Card title="Bienvenido a la Gestión de Productos y Categorías" subTitle="Utiliza el menú para navegar a las secciones de categorías y productos.">
                    <p className="p-mb-3">
                        Esta aplicación te permite gestionar tus <strong>categorías</strong> y <strong>productos</strong>. Para acceder a las diferentes secciones, por favor utiliza el menú de navegación en la parte superior.
                    </p>

                    <Divider />

                    <div className="p-d-flex p-jc-center">
                        <Button label="Ir a Categorías en el Menú" icon="pi pi-tags" className="p-button-info p-mr-2" />
                        <Button label="Ir a Productos en el Menú" icon="pi pi-box" className="p-button-success" />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Home;
