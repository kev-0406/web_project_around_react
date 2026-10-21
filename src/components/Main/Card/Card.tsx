import type { CardData, PopupConfig } from '../../../types/types';
import ImagePopup from '../Popup/ImagePopup/ImagePopup';

type CardProps = {
  card: CardData;
  handleOpenPopup: (popup: PopupConfig) => void;
  onCardLike: (card: CardData) => void;
  onCardDelete: (card: CardData) => void;
};

export default function Card(props: CardProps): React.JSX.Element {
  const { card, handleOpenPopup, onCardLike, onCardDelete } = props;
  const { name, link, isLiked } = card;

  const imageComponent: PopupConfig = {
    children: <ImagePopup card={card} />,
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
        onClick={() => handleOpenPopup(imageComponent)}
      />
      <button
        aria-label='Eliminar tarjeta'
        className='card__delete-button'
        type='button'
        onClick={() => onCardDelete(card)}
      />
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