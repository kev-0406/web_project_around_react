import { useState, useContext } from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext';

export default function EditProfile(): React.JSX.Element {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name || '');
  const [description, setDescription] = useState(currentUser?.about || '');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUpdateUser({ name, about: description });
  };

  return (
    <form
      className='popup__form'
      id='edit-profile-form'
      name='edit-profile-form'
      onSubmit={handleSubmit}
    >
      <label className='popup__field'>
        <input
          id='profile-name'
          className='popup__input popup__input_type_name'
          name='name'
          placeholder='Nombre'
          minLength={2}
          maxLength={40}
          required
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className='popup__error' id='profile-name-error'></span>
      </label>
      <label className='popup__field'>
        <input
          id='profile-description'
          className='popup__input popup__input_type_description'
          name='description'
          placeholder='Acerca de mí'
          minLength={2}
          maxLength={200}
          required
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className='popup__error' id='profile-description-error'></span>
      </label>
      <button className='button popup__button' type='submit'>
        Guardar
      </button>
    </form>
  );
}