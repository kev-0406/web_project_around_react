import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import type { PopupConfig, CardData } from '../../types/types';
import Popup from './Popup/Popup';
import NewCard from './Popup/NewCard/NewCard';
import EditProfile from './Popup/EditProfile/EditProfile';
import EditAvatar from './Popup/EditAvatar/EditAvatar';
import Card from './Card/Card';

type MainProps = {
  cards: CardData[];
  popup: PopupConfig | null;
  handleOpenPopup: (popup: PopupConfig) => void;
  handleClosePopup: () => void;
  onCardLike: (card: CardData) => void;
  onCardDelete: (card: CardData) => void;
};

export default function Main(props: MainProps): React.JSX.Element {
  const { cards, popup, handleOpenPopup, handleClosePopup, onCardLike, onCardDelete } = props;
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup: PopupConfig = {
    title: 'Nuevo lugar',
    children: <NewCard />,
  };

  const editProfilePopup: PopupConfig = {
    title: 'Editar perfil',
    children: <EditProfile />,
  };

  const editAvatarPopup: PopupConfig = {
    title: 'Actualizar foto de perfil',
    children: <EditAvatar />,
  };

  return (
    <main className='content'>
      <section className='profile page__section'>
        <div className='profile__avatar-wrapper'>
          <img
            className='profile__image'
            src={currentUser?.avatar}
            alt={currentUser?.name}
          />
          <button
            aria-label='Editar foto de perfil'
            className='profile__avatar-edit-button'
            type='button'
            onClick={() => handleOpenPopup(editAvatarPopup)}
          />
        </div>
        <div className='profile__info'>
          <h1 className='profile__title'>{currentUser?.name}</h1>
          <button
            aria-label='Editar perfil'
            className='profile__edit-button'
            type='button'
            onClick={() => handleOpenPopup(editProfilePopup)}
          />
          <p className='profile__description'>{currentUser?.about}</p>
        </div>
        <button
          aria-label='Agregar tarjeta'
          className='profile__add-button'
          type='button'
          onClick={() => handleOpenPopup(newCardPopup)}
        />
      </section>
      <section className='cards page__section'>
        <ul className='cards__list'>
          {cards.map((card) => (
            <Card 
            key={card._id} 
            card={card} 
            handleOpenPopup={handleOpenPopup} 
            onCardLike={onCardLike}
            onCardDelete={onCardDelete} 
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup
          onClose={handleClosePopup}
          title={popup.title}
          isOpen={popup !== null}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}