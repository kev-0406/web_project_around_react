type RemoveCardProps = {
  onConfirm: () => void;
};

export default function RemoveCard(props: RemoveCardProps): React.JSX.Element {
  const { onConfirm } = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onConfirm();
  };

  return (
    <form
      className='popup__form'
      name='remove-card-form'
      onSubmit={handleSubmit}
    >
      <button className='button popup__button' type='submit'>
        Sí
      </button>
    </form>
  );
}