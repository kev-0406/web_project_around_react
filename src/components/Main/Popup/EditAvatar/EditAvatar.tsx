import { useRef, useContext } from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext';

export default function EditAvatar(): React.JSX.Element {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (avatarRef.current) {
      handleUpdateAvatar({ avatar: avatarRef.current.value });
    }
  };

  return (
    <form className='popup__form' id='edit-avatar-form' name='edit-avatar-form' onSubmit={handleSubmit}>
      <label className='popup__field'>
        <input
          id='avatar-url'
          className='popup__input popup__input_type_avatar'
          name='avatar'
          placeholder='Enlace a la imagen'
          required
          type='url'
          ref={avatarRef}
        />
        <span className='popup__error' id='avatar-link-error'></span>
      </label>
      <button className='button popup__button' type='submit'>
        Guardar
      </button>
    </form>
  );
}