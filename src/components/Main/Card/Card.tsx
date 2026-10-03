import type { CardData, PopupConfig } from '../../../types/types';
import ImagePopup from '../Popup/ImagePopup/ImagePopup';

type CardProps = {
  card: CardData;
  handleOpenPopus: (popup: PopupConfig) => void;
};

export default function Card(props: CardProps): React.JSX.Element {
    const { card, handleOpenPopus } = props;  
    const { name, link } = props.card;

    const imageComponent: PopupConfig = {
      children: <ImagePopup card={card} />,
    };

  return (
    <li className='card'>
      <img 
      className='card__image' 
      src={link} 
      alt={name} 
      onClick={() => handleOpenPopus(imageComponent)}
      />
      <button
        aria-label='Eliminar tarjeta'
        className='card__delete-button'
        type='button'
      />
      <div className='card__description'>
        <h2 className='card__title'>{name}</h2>
        <button
          aria-label='Botón Me gusta'
          type='button'
          className='card__like-button'
        />
      </div>
    </li>
  );
}