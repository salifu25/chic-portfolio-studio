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
interface User {
  id: string;
  email: string;
  role: string;
  name: string;
}

export const authApi = {
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    console.log('API Call: POST /auth/login', { email });
    try {
      const response = await apiRequest<{ token: string; user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('auth_token', response.token);
      return response;
    } catch (error) {
      // Fallback to mock auth for development
      console.log('Using mock auth - backend not available');
      if (email === 'designer@maame.com' && password === 'admin123') {
        const mockResponse = { 
          token: 'mock_jwt_token', 
          user: { id: '1', email, role: 'ADMIN', name: 'Maame Designer' } 
        };
        localStorage.setItem('auth_token', mockResponse.token);
        return mockResponse;
      }
      throw new Error('Invalid credentials');
    }
  },

  logout: async (): Promise<void> => {
    console.log('API Call: POST /auth/logout');
    try {
      await apiRequest<void>('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.log('Logout API failed, clearing local token');
    }
    localStorage.removeItem('auth_token');
  },

  getCurrentUser: async (): Promise<User | null> => {
    console.log('API Call: GET /auth/me');
    try {
      return await apiRequest<User>('/auth/me');
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  },
};

// Collections API
export interface Collection {
  id: string;
  name: string;
  description: string;
  season: string;
  year: number;
  coverImage?: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  pieces?: CollectionPiece[];
}

export interface CollectionPiece {
  id: string;
  collectionId: string;
  name: string;
  description: string;
  image: string;
  price?: string;
  showPrice: boolean;
  available: boolean;
  isVisible: boolean;
  category: 'ready-to-wear' | 'couture' | 'accessories';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
}

// Public collections data (for homepage)
export interface PublicCollection {
  id: string;
  name: string;
  season: string;
  year: number;
  description: string;
  coverImage: string;
  pieces: PublicPiece[];
}

export interface PublicPiece {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: string;
  available: boolean;
  category: 'ready-to-wear' | 'couture' | 'accessories';
}

const defaultCategories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'couture', name: 'Couture' },
  { id: 'ready-to-wear', name: 'Ready-to-Wear' },
  { id: 'accessories', name: 'Accessories' },
];

export const collectionsApi = {
  // Public endpoint - returns visible collections with visible pieces
  getPublic: async (): Promise<PublicCollection[]> => {
    console.log('API Call: GET /public/collections');
    try {
      const data = await apiRequest<PublicCollection[]>('/public/collections');
      return data;
    } catch (error) {
      console.error('Failed to fetch public collections:', error);
      return [];
    }
  },

  getCategories: async (): Promise<Category[]> => {
    console.log('API Call: GET /categories');
    try {
      const data = await apiRequest<Category[]>('/categories');
      return data.length > 0 ? data : defaultCategories;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return defaultCategories;
    }
  },

  getAll: async (): Promise<Collection[]> => {
    console.log('API Call: GET /collections');
    try {
      return await apiRequest<Collection[]>('/collections');
    } catch (error) {
      console.error('Failed to fetch collections:', error);
      return [];
    }
  },

  getById: async (id: string): Promise<Collection | null> => {
    console.log('API Call: GET /collections/' + id);
    try {
      return await apiRequest<Collection>(`/collections/${id}`);
    } catch (error) {
      console.error('Failed to fetch collection:', error);
      return null;
    }
  },

  create: async (data: Partial<Collection>): Promise<Collection> => {
    console.log('API Call: POST /collections', data);
    return apiRequest<Collection>('/collections', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<Collection>): Promise<Collection> => {
    console.log('API Call: PUT /collections/' + id, data);
    return apiRequest<Collection>(`/collections/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<void> => {
    console.log('API Call: DELETE /collections/' + id);
    return apiRequest<void>(`/collections/${id}`, { method: 'DELETE' });
  },

  toggleVisibility: async (id: string, isVisible: boolean): Promise<Collection | void> => {
    console.log('API Call: PATCH /collections/' + id + '/visibility', { isVisible });
    return apiRequest<Collection>(`/collections/${id}/visibility`, {
      method: 'PATCH',
      body: JSON.stringify({ isVisible }),
    });
  },
};

// Pieces API
export const piecesApi = {
  getByCollection: async (collectionId: string): Promise<CollectionPiece[]> => {
    console.log('API Call: GET /collections/' + collectionId + '/pieces');
    try {
      return await apiRequest<CollectionPiece[]>(`/collections/${collectionId}/pieces`);
    } catch (error) {
      console.error('Failed to fetch pieces:', error);
      return [];
    }
  },

  getById: async (id: string): Promise<CollectionPiece | null> => {
    console.log('API Call: GET /pieces/' + id);
    try {
      return await apiRequest<CollectionPiece>(`/pieces/${id}`);
    } catch (error) {
      console.error('Failed to fetch piece:', error);
      return null;
    }
  },

  create: async (data: Partial<CollectionPiece>): Promise<CollectionPiece> => {
    console.log('API Call: POST /pieces', data);
    return apiRequest<CollectionPiece>('/pieces', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<CollectionPiece>): Promise<CollectionPiece> => {
    console.log('API Call: PUT /pieces/' + id, data);
    return apiRequest<CollectionPiece>(`/pieces/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<void> => {
    console.log('API Call: DELETE /pieces/' + id);
    return apiRequest<void>(`/pieces/${id}`, { method: 'DELETE' });
  },

  updatePricing: async (id: string, data: { price: number; showPrice: boolean }): Promise<CollectionPiece | void> => {
    console.log('API Call: PATCH /pieces/' + id + '/pricing', data);
    return apiRequest<CollectionPiece>(`/pieces/${id}/pricing`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  updateAvailability: async (id: string, isAvailable: boolean): Promise<CollectionPiece | void> => {
    console.log('API Call: PATCH /pieces/' + id + '/availability', { isAvailable });
    return apiRequest<CollectionPiece>(`/pieces/${id}/availability`, {
      method: 'PATCH',
      body: JSON.stringify({ isAvailable }),
    });
  },
};

// Upload API
export const uploadApi = {
  uploadImage: async (file: File): Promise<{ url: string }> => {
    console.log('API Call: POST /uploads/images', file.name);
    const token = localStorage.getItem('auth_token');
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${BASE_URL}/uploads/images`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    return response.json();
  },

  deleteImage: async (imageUrl: string): Promise<void> => {
    console.log('API Call: DELETE /uploads/images', { imageUrl });
    return apiRequest<void>('/uploads/images', {
      method: 'DELETE',
      body: JSON.stringify({ url: imageUrl }),
    });
  },
};
