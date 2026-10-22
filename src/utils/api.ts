import type { UserData } from '../interfaces/UserData';
import type { CardData } from '../interfaces/CardData';
import type {
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

  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      return await response.json();
    }
    const detail = await response.text();
    throw new Error(`Error: ${response.status}: ${detail}`);
  }

  async getUserInfo(): Promise<UserData> {
    const response = await fetch(`${this.baseUrl}/users/me`, {
      headers: { authorization: this.headers.authorization },
    });
    return this.handleResponse<UserData>(response);
  }

  async getInitialCards(): Promise<CardData[]> {
    const response = await fetch(`${this.baseUrl}/cards`, {
      headers: { authorization: this.headers.authorization },
    });
    return this.handleResponse<CardData[]>(response);
  }

  async addCard(data: CardFormData): Promise<CardData> {
    const response = await fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse<CardData>(response);
  }

  async updateUserInfo(data: UserFormData): Promise<UserData> {
    const response = await fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse<UserData>(response);
  }

  async updateAvatar(data: AvatarFormData): Promise<UserData> {
    const response = await fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse<UserData>(response);
  }

  async addLike(cardId: string): Promise<CardData> {
    const response = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
    });
    return this.handleResponse<CardData>(response);
  }

  async removeLike(cardId: string): Promise<CardData> {
    const response = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    });
    return this.handleResponse<CardData>(response);
  }

  async deleteCard(cardId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  }
}

const api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: 'c8103da6-646f-4d22-b1ec-a615c552b361',
    'Content-Type': 'application/json',
  },
});

export default api;