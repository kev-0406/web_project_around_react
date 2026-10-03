import { useState } from 'react';
import type { PopupConfig } from '../../types/types';
import avatar from '../../images/avatar.jpg';
import Popup from './Popup/Popup';
import NewCard from './Popup/NewCard/NewCard';
import EditProfile from './Popup/EditProfile/EditProfile';
import EditAvatar from './Popup/EditAvatar/EditAvatar';

export default function Main(): React.JSX.Element {
  const [popup, setPopup] = useState<PopupConfig | null>(null);

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

  function handleOpenPopup(popup: PopupConfig): void {
    setPopup(popup);
  }

  function handleClosePopup(): void {
    setPopup(null);
  }

  return (
    <main className='content'>
      <section className='profile page__section'>
        <div className='profile__avatar-wrapper'>
          <img
            className='profile__image'
            src={avatar}
            alt='Foto de perfil de Jacques Cousteau'
          />
          <button
            aria-label='Editar foto de perfil'
            className='profile__avatar-edit-button'
            type='button'
            onClick={() => handleOpenPopup(editAvatarPopup)}
          />
        </div>
        <div className='profile__info'>
          <h1 className='profile__title'>Jacques Cousteau</h1>
          <button
            aria-label='Editar perfil'
            className='profile__edit-button'
            type='button'
            onClick={() => handleOpenPopup(editProfilePopup)}
          />
          <p className='profile__description'>Explorador</p>
        </div>
        <button
          aria-label='Agregar tarjeta'
          className='profile__add-button'
          type='button'
          onClick={() => handleOpenPopup(newCardPopup)}
        />
      </section>
      <section className='cards page__section'>
        <ul className='cards__list'></ul>
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