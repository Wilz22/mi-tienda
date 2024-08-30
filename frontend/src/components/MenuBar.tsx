import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const MenuBar:React.FC = () => {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => { navigate("/home") }
            
        },
        {
            label: 'Categoria',
            icon: 'pi pi-fw pi-objects-column',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    command: () => { navigate("/categorias") }
                },
                { separator: true },
                {
                    label: 'Quit',
                    icon: 'pi pi-fw pi-times'
                }
            ]
        },
        {
            label: 'Producto',
            icon: 'pi pi-fw pi-cart-plus',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    command: () => { navigate("/productos") }
                },
                { separator: true },
                {
                    label: 'Quit',
                    icon: 'pi pi-fw pi-times'
                }
            ]
        },
    ];

    return (
        <div>
            <Menubar model={items} />
        </div>
    );
}

export default MenuBar;
