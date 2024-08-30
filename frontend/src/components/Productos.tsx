import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import axios from 'axios';
import { Card } from 'primereact/card';

interface Categoria {
    id: number;
    nombre: string;
}

interface Producto {
    id: number | null;
    nombre: string;
    precio: number;
    categoriaId: number;
}

const Productos: React.FC = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [producto, setProducto] = useState<Producto>({ id: null, nombre: '', precio: 0, categoriaId: 0 });
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const toast = useRef<Toast>(null);

    const API_URL_PRODUCTOS = 'http://localhost:5000/api/productos';
    const API_URL_CATEGORIAS = 'http://localhost:5000/api/categorias';

    const [validationErrors, setValidationErrors] = useState({
        nombre: '',
        precio: '',
        categoriaId: ''
    });
    
    useEffect(() => {
        // Cargar los productos desde la API
        axios.get(API_URL_PRODUCTOS)
            .then((response) => {
                setProductos(response.data);
            })
            .catch((error) => {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al cargar los productos', life: 3000 });
            });

        // Cargar las categorías desde la API
        axios.get(API_URL_CATEGORIAS)
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al cargar las categorías', life: 3000 });
            });
    }, []);

    const openNew = () => {
        setProducto({ id: null, nombre: '', precio: 0, categoriaId: 0 });
        setIsEditing(false);
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };
    const reloadProductos = () => {
        axios.get(API_URL_PRODUCTOS)
            .then((response) => {
                setProductos(response.data);
            })
            .catch((error) => {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al recargar los productos', life: 3000 });
            });
    };
    const validateFields = () => {
        let errors={nombre:'', precio: '', categoriaId:''};
        let isValid = true;
        
        if (!producto.nombre.trim()) {
            errors.nombre = 'El nombre es requerido';
            isValid = false;
        }
        if (!producto.precio || producto.precio <= 0) {
            errors.precio = 'El precio es requerido y debe ser mayor a 0';
            isValid = false;
        }
        if (!producto.categoriaId) {
            errors.categoriaId = 'La categoría es requerida';
            isValid = false;
        }
        setValidationErrors(errors);
        return isValid;

    };
    
    const saveProducto = () => {
        if (validateFields()){
            if (producto.nombre.trim()) {
                const productoData = {
                    nombre: producto.nombre,
                    precio: producto.precio,
                    categoriaId: producto.categoriaId
                };
        
                if (isEditing) {
                    axios.put(`${API_URL_PRODUCTOS}/${producto.id}`, productoData)
                        .then(() => {
                            reloadProductos(); // Recargar los productos después de actualizar
                            toast.current?.show({ severity: 'success', summary: 'Producto Actualizado', detail: 'El producto ha sido actualizado exitosamente', life: 3000 });
                        })
                        .catch((error) => {
                            console.error('Error al actualizar el producto:', error);
                            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar el producto', life: 3000 });
                        });
                } else {
                    axios.post(API_URL_PRODUCTOS, productoData)
                        .then((response) => {
                            reloadProductos(); // Recargar los productos después de crear
                            toast.current?.show({ severity: 'success', summary: 'Producto Creado', detail: 'El producto ha sido creado exitosamente', life: 3000 });
                        })
                        .catch((error) => {
                            console.error('Error al crear el producto:', error.response ? error.response.data : error.message);
                            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear el producto', life: 3000 });
                        });
                }
                setDialogVisible(false);
            }
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos requeridos', life: 3000 });
        }
    };
    

    const editProducto = (producto: Producto) => {
        setProducto({ ...producto });
        setIsEditing(true);
        setDialogVisible(true);
    };

    const confirmDeleteProducto = (producto: Producto) => {
        confirmDialog({
            message: '¿Está seguro de que desea eliminar este producto?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteProducto(producto),
        });
    };

    const deleteProducto = (producto: Producto) => {
        axios.delete(`${API_URL_PRODUCTOS}/${producto.id}`)
            .then(() => {
                setProductos(productos.filter((prod) => prod.id !== producto.id));
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Producto Eliminado', life: 3000 });
            })
            .catch(() => {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el producto', life: 3000 });
            });
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo Producto" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
            </React.Fragment>
        );
    };

    return (
        <div>
            <Toast ref={toast} />
            <Toolbar className="mb-4" start={leftToolbarTemplate} />
            <Card title="Tabla de Productos">
            <DataTable value={productos} stripedRows>
                <Column field="id" header="ID" />
                <Column field="nombre" header="Nombre" />
                <Column field="precio" header="Precio" />
                <Column field="categoriaId" header="Categoría" body={(rowData: Producto) => categorias.find(cat => cat.id === rowData.categoriaId)?.nombre || ''} />
                <Column
                    header="Acciones"
                    body={(rowData: Producto) => (
                        <React.Fragment>
                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProducto(rowData)} />
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProducto(rowData)} />
                        </React.Fragment>
                    )}
                />
            </DataTable>
            </Card>
            <Dialog visible={dialogVisible} style={{ width: '450px' }} header="Detalles de Producto" modal className="p-fluid" footer={
                <React.Fragment>
                    <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                    <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProducto} />
                </React.Fragment>
            } onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="nombre">Nombre</label>
                    <InputText id="nombre" value={producto.nombre} onChange={(e) => setProducto({ ...producto, nombre: e.target.value })} required autoFocus />
                    {validationErrors.nombre && <small className='p-error'>{validationErrors.nombre}</small>}
                </div>
                <br/>
                <div className="field">
                    <label htmlFor="precio">Precio</label>
                    <InputText 
                        id="precio" 
                        value={producto.precio.toString()} 
                        onChange={(e) => setProducto({ ...producto, precio: parseFloat(e.target.value) })} 
                        required 
                    />
                    {validationErrors.precio && <small className='p-error'>{validationErrors.precio}</small>}
                </div>
                <br/>
                <div className="field">
                    <label htmlFor="categoria">Categoría</label>
                    <Dropdown 
                        id="categoria" 
                        value={producto.categoriaId} 
                        options={categorias} 
                        onChange={(e) => setProducto({ ...producto, categoriaId: e.value })} 
                        optionLabel="nombre" 
                        optionValue="id"  
                        placeholder="Seleccionar Categoría" 
                        required
                        className={producto.categoriaId ? '' : ''} 
                    />
                    {validationErrors.categoriaId && <small className='p-error'>{validationErrors.categoriaId}</small>}

                </div>
            </Dialog>
            <ConfirmDialog />
        </div>
        
    );
};

export default Productos;
