// API Configuration - Update BASE_URL to your Spring Boot backend
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('auth_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    // TODO: Connect to Spring Boot /auth/login endpoint
    console.log('API Call: POST /auth/login', { email });
    // Placeholder - replace with actual API call
    // return apiRequest<{ token: string; user: User }>('/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, password }),
    // });
    
    // Mock response for development
    if (email === 'designer@maame.com' && password === 'admin123') {
      return { 
        token: 'mock_jwt_token', 
        user: { id: '1', email, role: 'ADMIN', name: 'Maame Designer' } 
      };
    }
    throw new Error('Invalid credentials');
  },

  logout: async () => {
    // TODO: Connect to Spring Boot /auth/logout endpoint
    console.log('API Call: POST /auth/logout');
    localStorage.removeItem('auth_token');
  },

  getCurrentUser: async () => {
    // TODO: Connect to Spring Boot /auth/me endpoint
    console.log('API Call: GET /auth/me');
    // return apiRequest<User>('/auth/me');
    return null;
  },
};

// Collections API
export interface Collection {
  id: string;
  name: string;
  description: string;
  season: string;
  year: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionPiece {
  id: string;
  collectionId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  showPrice: boolean;
  isAvailable: boolean;
  isVisible: boolean;
  images: string[];
  materials: string[];
  createdAt: string;
  updatedAt: string;
}

export const collectionsApi = {
  getAll: async () => {
    // TODO: Connect to Spring Boot /collections endpoint
    console.log('API Call: GET /collections');
    // return apiRequest<Collection[]>('/collections');
    return [] as Collection[];
  },

  getById: async (id: string) => {
    // TODO: Connect to Spring Boot /collections/{id} endpoint
    console.log('API Call: GET /collections/' + id);
    // return apiRequest<Collection>(`/collections/${id}`);
    return null;
  },

  create: async (data: Partial<Collection>) => {
    // TODO: Connect to Spring Boot /collections endpoint
    console.log('API Call: POST /collections', data);
    // return apiRequest<Collection>('/collections', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    return { id: Date.now().toString(), ...data } as Collection;
  },

  update: async (id: string, data: Partial<Collection>) => {
    // TODO: Connect to Spring Boot /collections/{id} endpoint
    console.log('API Call: PUT /collections/' + id, data);
    // return apiRequest<Collection>(`/collections/${id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    // });
    return { id, ...data } as Collection;
  },

  delete: async (id: string) => {
    // TODO: Connect to Spring Boot /collections/{id} endpoint
    console.log('API Call: DELETE /collections/' + id);
    // return apiRequest<void>(`/collections/${id}`, { method: 'DELETE' });
  },

  toggleVisibility: async (id: string, isVisible: boolean) => {
    // TODO: Connect to Spring Boot /collections/{id}/visibility endpoint
    console.log('API Call: PATCH /collections/' + id + '/visibility', { isVisible });
    // return apiRequest<Collection>(`/collections/${id}/visibility`, {
    //   method: 'PATCH',
    //   body: JSON.stringify({ isVisible }),
    // });
  },
};

// Pieces API
export const piecesApi = {
  getByCollection: async (collectionId: string) => {
    // TODO: Connect to Spring Boot /collections/{id}/pieces endpoint
    console.log('API Call: GET /collections/' + collectionId + '/pieces');
    // return apiRequest<CollectionPiece[]>(`/collections/${collectionId}/pieces`);
    return [] as CollectionPiece[];
  },

  getById: async (id: string) => {
    // TODO: Connect to Spring Boot /pieces/{id} endpoint
    console.log('API Call: GET /pieces/' + id);
    // return apiRequest<CollectionPiece>(`/pieces/${id}`);
    return null;
  },

  create: async (data: Partial<CollectionPiece>) => {
    // TODO: Connect to Spring Boot /pieces endpoint
    console.log('API Call: POST /pieces', data);
    // return apiRequest<CollectionPiece>('/pieces', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    return { id: Date.now().toString(), ...data } as CollectionPiece;
  },

  update: async (id: string, data: Partial<CollectionPiece>) => {
    // TODO: Connect to Spring Boot /pieces/{id} endpoint
    console.log('API Call: PUT /pieces/' + id, data);
    // return apiRequest<CollectionPiece>(`/pieces/${id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    // });
    return { id, ...data } as CollectionPiece;
  },

  delete: async (id: string) => {
    // TODO: Connect to Spring Boot /pieces/{id} endpoint
    console.log('API Call: DELETE /pieces/' + id);
    // return apiRequest<void>(`/pieces/${id}`, { method: 'DELETE' });
  },

  updatePricing: async (id: string, data: { price: number; showPrice: boolean }) => {
    // TODO: Connect to Spring Boot /pieces/{id}/pricing endpoint
    console.log('API Call: PATCH /pieces/' + id + '/pricing', data);
    // return apiRequest<CollectionPiece>(`/pieces/${id}/pricing`, {
    //   method: 'PATCH',
    //   body: JSON.stringify(data),
    // });
  },

  updateAvailability: async (id: string, isAvailable: boolean) => {
    // TODO: Connect to Spring Boot /pieces/{id}/availability endpoint
    console.log('API Call: PATCH /pieces/' + id + '/availability', { isAvailable });
    // return apiRequest<CollectionPiece>(`/pieces/${id}/availability`, {
    //   method: 'PATCH',
    //   body: JSON.stringify({ isAvailable }),
    // });
  },
};

// Upload API
export const uploadApi = {
  uploadImage: async (file: File) => {
    // TODO: Connect to Spring Boot /uploads/images endpoint
    console.log('API Call: POST /uploads/images', file.name);
    // const formData = new FormData();
    // formData.append('file', file);
    // return apiRequest<{ url: string }>('/uploads/images', {
    //   method: 'POST',
    //   headers: {}, // Let browser set Content-Type for FormData
    //   body: formData,
    // });
    
    // Mock response - return a placeholder URL
    return { url: URL.createObjectURL(file) };
  },

  deleteImage: async (imageUrl: string) => {
    // TODO: Connect to Spring Boot /uploads/images endpoint
    console.log('API Call: DELETE /uploads/images', { imageUrl });
    // return apiRequest<void>('/uploads/images', {
    //   method: 'DELETE',
    //   body: JSON.stringify({ url: imageUrl }),
    // });
  },
};
