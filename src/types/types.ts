import type { ReactNode } from 'react';

export interface PopupConfig {
  title?: string;
  children: ReactNode;
}

export interface UserData {
  _id: string;
  name: string;
  about: string;
  avatar: string;
}

export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

export interface UserFormData { name: string; about: string }
export interface AvatarFormData { avatar: string }
export interface CardFormData { name: string; link: string }

export interface CurrentUserContextType {
  currentUser: UserData | null;
  handleUpdateUser: (data: UserFormData) => Promise<void>;
  handleUpdateAvatar: (data: AvatarFormData) => Promise<void>;
  handleAddPlaceSubmit: (data: CardFormData) => Promise<void>;
}