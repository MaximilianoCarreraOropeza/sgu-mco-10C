const UserController = {}

const ENV = import.meta.env

const API_URL = `${ENV.VITE_API_PROTOCOL}://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}`

UserController.getUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

UserController.getUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
        return null;
    }
}

UserController.createUser = async (user) => {
    try {
        const response = await fetch(`${API_URL}/user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

UserController.updateUser = async (id, user) => {
    user.id = id;
    try {
        const response = await fetch(`${API_URL}/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error(`Error updating user with id ${id}:`, error);
        return null;
    }
}

UserController.deleteUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
        return null;
    }
}

export default UserController