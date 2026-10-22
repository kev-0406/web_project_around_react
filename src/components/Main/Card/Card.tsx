import { useContext } from 'react';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import type { CardData } from '../../../interfaces/CardData';
import type { ModalData } from '../../../interfaces/ModalData';
import ImagePopup from '../Popup/ImagePopup/ImagePopup';
import RemoveCard from '../Popup/RemoveCard/RemoveCard';

type CardProps = {
  card: CardData;
  handleOpenPopup: (popup: ModalData) => void;
  onCardLike: (card: CardData) => void;
  onCardDelete: (card: CardData) => void;
};

export default function Card(props: CardProps): React.JSX.Element {
  const { card, handleOpenPopup, onCardLike, onCardDelete } = props;
  const { name, link, isLiked } = card;
  const { currentUser } = useContext(CurrentUserContext);

  const isOwnCard = card.owner === currentUser?._id;

  const imagePopup: ModalData = {
    children: <ImagePopup card={card} />,
  };

  const removeCardPopup: ModalData = {
    title: '¿Estás seguro?',
    children: <RemoveCard onConfirm={() => onCardDelete(card)} />,
  };

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_is-active' : ''
  }`;

  return (
    <li className='card'>
      <img
        className='card__image'
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imagePopup)}
      />
      {isOwnCard && (
        <button
          aria-label='Eliminar tarjeta'
          className='card__delete-button'
          type='button'
          onClick={() => handleOpenPopup(removeCardPopup)}
        />
      )}
      <div className='card__description'>
        <h2 className='card__title'>{name}</h2>
        <button
          aria-label='Botón Me gusta'
          type='button'
          className={cardLikeButtonClassName}
          onClick={() => onCardLike(card)}
        />
      </div>
    </li>
  );
}