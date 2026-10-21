import type {
  UserData,
  CardData,
  CardFormData,
  UserFormData,
  AvatarFormData,
} from '../types/types';

interface ApiOptions {
  baseUrl: string;
  headers: {
    authorization: string;
    'Content-Type': string;
  };
}

class Api {
  private baseUrl: string;
  private headers: ApiOptions['headers'];

  constructor(options: ApiOptions) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return await res.json();
    }
    const detail = await res.text();
    throw new Error(`Error: ${res.status}: ${detail}`);
  }

  async getUserInfo(): Promise<UserData> {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      headers: { authorization: this.headers.authorization },
    });
    return this.handleResponse<UserData>(res);
  }

  async getInitialCards(): Promise<CardData[]> {
    const res = await fetch(`${this.baseUrl}/cards`, {
      headers: { authorization: this.headers.authorization },
    });
    return this.handleResponse<CardData[]>(res);
  }

  async addCard(data: CardFormData): Promise<CardData> {
    const res = await fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse<CardData>(res);
  }

  async updateUserInfo(data: UserFormData): Promise<UserData> {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse<UserData>(res);
  }

  async updateAvatar(data: AvatarFormData): Promise<UserData> {
    const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse<UserData>(res);
  }

  async addLike(cardId: string): Promise<CardData> {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
    });
    return this.handleResponse<CardData>(res);
  }

  async removeLike(cardId: string): Promise<CardData> {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    });
    return this.handleResponse<CardData>(res);
  }

  async deleteCard(cardId: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
  }
}

const api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: import.meta.env.VITE_API_TOKEN,
    'Content-Type': 'application/json',
  },
});

export default api;