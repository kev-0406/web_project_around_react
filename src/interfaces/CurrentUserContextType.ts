import type { UserData } from './UserData';
import type {
  UserFormData,
  AvatarFormData,
  CardFormData,
} from '../types/types';

export interface CurrentUserContextType {
  currentUser: UserData | null;
  handleUpdateUser: (data: UserFormData) => Promise<void>;
  handleUpdateAvatar: (data: AvatarFormData) => Promise<void>;
  handleAddPlaceSubmit: (data: CardFormData) => Promise<void>;
}