import React, { useState, useEffect } from 'react'
import UserController from './modules/user.controller';

function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const users = await UserController.getUsers();
    setUsers(users);
  };

  const deleteUser = async (id) => {
    await UserController.deleteUser(id);
    fetchUsers();
    closeModal();
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const user = {
      nombre: formData.get('nombre'),
      apellidoPaterno: formData.get('apellidoPaterno'),
      apellidoMaterno: formData.get('apellidoMaterno'),
      correo: formData.get('correo'),
      telefono: formData.get('telefono'),
    };
    if (currentUser) {
      await UserController.updateUser(currentUser.id, user);
    } else {
      await UserController.createUser(user);
    }
    fetchUsers();
    closeModal();
  }

  const openModal = (user = null) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentUser(null);
  };

  return (
     <div className="p-5">
      <div className="flex justify-end mb-5">
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Crear Usuario
        </button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Nombre Completo</th>
            <th className="border border-gray-300 px-4 py-2">Correo</th>
            <th className="border border-gray-300 px-4 py-2">Teléfono</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.nombre + ' ' + user.apellidoPaterno + ' ' + user.apellidoMaterno}</td>
              <td className="border border-gray-300 px-4 py-2">{user.correo}</td>
              <td className="border border-gray-300 px-4 py-2">{user.telefono}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => openModal(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => openDeleteModal(user)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-10 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4"> 
              {currentUser ? 'Editar Usuario' : 'Crear Usuario'}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  name='nombre'
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  defaultValue={currentUser?.nombre || ''}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Apellido Paterno</label>
                <input
                  type="text"
                  name='apellidoPaterno'
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  defaultValue={currentUser?.apellidoPaterno || ''}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Apellido Materno</label>
                <input
                  type="text"
                  name='apellidoMaterno'
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  defaultValue={currentUser?.apellidoMaterno || ''}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Correo</label>
                <input
                  type="email"
                  name='correo'
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  defaultValue={currentUser?.correo || ''}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Teléfono</label>
                <input
                  type="text"
                  name='telefono'
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  defaultValue={currentUser?.telefono || ''}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {currentUser ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-10 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar a {currentUser?.nombre}?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={() => {deleteUser(currentUser.id);}}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
