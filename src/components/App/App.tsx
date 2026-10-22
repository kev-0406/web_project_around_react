import { useEffect, useState } from 'react';
import api from '../../utils/api';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import type { UserData } from '../../interfaces/UserData';
import type { CardData } from '../../interfaces/CardData';
import type { ModalData } from '../../interfaces/ModalData';
import type {
  UserFormData,
  AvatarFormData,
  CardFormData,
} from '../../types/types';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App(): React.JSX.Element {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [popup, setPopup] = useState<ModalData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [userData, initialCards] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards(),
        ]);
        setCurrentUser(userData);
        setCards(initialCards);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  function handleOpenPopup(popupData: ModalData): void {
    setPopup(popupData);
  }

  function handleClosePopup(): void {
    setPopup(null);
  }

  const handleCardLike = async (card: CardData) => {
    try {
      const updatedCard = card.isLiked
        ? await api.removeLike(card._id)
        : await api.addLike(card._id);
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? updatedCard : currentCard
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardDelete = async (card: CardData) => {
    try {
      await api.deleteCard(card._id);
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id)
      );
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async (data: UserFormData) => {
    try {
      const updatedUser = await api.updateUserInfo(data);
      setCurrentUser(updatedUser);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateAvatar = async (data: AvatarFormData) => {
    try {
      const updatedUser = await api.updateAvatar(data);
      setCurrentUser(updatedUser);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPlaceSubmit = async (data: CardFormData) => {
    try {
      const newCard = await api.addCard(data);
      setCards((state) => [newCard, ...state]);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <div className='page__content'>
        <Header />
        <Main
          cards={cards}
          popup={popup}
          handleOpenPopup={handleOpenPopup}
          handleClosePopup={handleClosePopup}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

