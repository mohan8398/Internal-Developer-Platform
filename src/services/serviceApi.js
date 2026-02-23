const API_BASE_URL = 'http://localhost:3000/api/v1';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'API request failed');
    }
    return response.json();
};

export const serviceApi = {
    getServices: async (filters = {}) => {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) queryParams.append(key, value);
        });

        const response = await fetch(`${API_BASE_URL}/services?${queryParams.toString()}`);
        return handleResponse(response);
    },

    getServiceById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/services/${id}`);
        return handleResponse(response);
    },

    createService: async (data) => {
        const response = await fetch(`${API_BASE_URL}/services`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${localStorage.getItem('token')}` // Placeholder for auth
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    updateService: async (id, data) => {
        const response = await fetch(`${API_BASE_URL}/services/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    deleteService: async (id) => {
        const response = await fetch(`${API_BASE_URL}/services/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete service');
        return true;
    },

    getHealth: async (id) => {
        const response = await fetch(`${API_BASE_URL}/services/${id}/health`);
        return handleResponse(response);
    },

    getMetrics: async (id, range = '1h') => {
        const response = await fetch(`${API_BASE_URL}/services/${id}/metrics?range=${range}`);
        return handleResponse(response);
    },

    getDeployments: async (id) => {
        const response = await fetch(`${API_BASE_URL}/services/${id}/deployments`);
        return handleResponse(response);
    },
};
