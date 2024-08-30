import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';
        
import axios from 'axios';

interface Categoria {
    id: number | null;
    nombre: string;
}

const Categorias: React.FC = () => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<Categoria>({ id: null, nombre: '' });
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const toast = useRef<Toast>(null);

    // URL base del backend
    const API_URL = 'http://localhost:5000/api/categorias';

    const [validationErrors, setValidationErrors] = useState({
        nombre: '',
    });

    useEffect(() => {
        // Obtener las categorías desde el backend
        axios.get(API_URL)
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al cargar las categorías', life: 3000 });
            });
    }, []);

    const openNew = () => {
        setCategoria({ id: null, nombre: '' });
        setIsEditing(false);
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const reloadCategorias = () => {
        axios.get(API_URL)
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al cargar las categorías', life: 3000 });
            });
    };
    const validateFields = () => {
        let errors={id:'', nombre: ''};
        let isValid = true;
        
        if (!categoria.nombre.trim()) {
            errors.nombre = 'El nombre es requerido';
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;

    };
    
    const saveCategoria = () => {
        if (validateFields()) {
            if (categoria.nombre.trim()) {
                if (isEditing) {
                    axios.put(`${API_URL}/${categoria.id}`, categoria)
                        .then(() => {
                            reloadCategorias(); // Recargar las categorías
                            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Categoría Actualizada', life: 3000 });
                        })
                        .catch(() => {
                            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al actualizar la categoría', life: 3000 });
                        });
                } else {
                    axios.post(API_URL, categoria)
                        .then(() => {
                            reloadCategorias(); // Recargar las categorías
                            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Categoría Creada', life: 3000 });
                        })
                        .catch(() => {
                            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al crear la categoría', life: 3000 });
                        });
                }
                setDialogVisible(false);
            } 
        }else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos requeridos', life: 3000 });
        }
    };
    
    

    const editCategoria = (categoria: Categoria) => {
        setCategoria({ ...categoria });
        setIsEditing(true);
        setDialogVisible(true);
    };

    const confirmDeleteCategoria = (categoria: Categoria) => {
        confirmDialog({
            message: '¿Está seguro de que desea eliminar esta categoría?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteCategoria(categoria), // Verifica que esta función se esté llamando correctamente
        });
    };
    

    const deleteCategoria = (categoria: Categoria) => {
        axios.delete(`${API_URL}/${categoria.id}`)
            .then(() => {
                setCategorias(categorias.filter((cat) => cat.id !== categoria.id));
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Categoría Eliminada', life: 3000 });
            })
            .catch(() => {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar la categoría', life: 3000 });
            });
    };
    

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nueva Categoría" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
            </React.Fragment>
        );
    };

    return (
        <div>
            <Toast ref={toast} />
            <Toolbar className="mb-4" start ={leftToolbarTemplate} />
            <Card title="Tabla de Categorias">
            <DataTable 
                value={categorias} 
                stripedRows
                tableStyle={{ width: '100%' , minWidth: '50rem'}}
            >
                <Column field="id" header="ID" />
                <Column field="nombre" header="Nombre" />
                <Column
                    header="Acciones"
                    body={(rowData: Categoria) => (
                        <React.Fragment>
                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editCategoria(rowData)} />
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteCategoria(rowData)} />
                        </React.Fragment>
                    )}
                />
            </DataTable>
            </Card>
            <Dialog visible={dialogVisible} style={{ width: '450px' }} header="Detalles de Categoría" modal className="p-fluid" footer={
                <React.Fragment>
                    <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                    <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveCategoria} />
                </React.Fragment>
            } onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="nombre">Nombre</label>
                    <InputText id="nombre" value={categoria.nombre} onChange={(e) => setCategoria({ ...categoria, nombre: e.target.value })} required autoFocus />
                    {validationErrors.nombre && <small className='p-error'>{validationErrors.nombre}</small>}
                </div>
            </Dialog>
            <ConfirmDialog/>
        </div>
    );
};

export default Categorias;
