type CardListItemProps = {
  index: number;
  label?: string;
  question: string;
};

export function CardListItem({ index, label, question }: CardListItemProps) {
  return (
    <article className="card-list-item">
      <div className="card-list-item-icon">
        <span aria-hidden="true">{index + 1}</span>
      </div>
      <div className="card-list-item-copy">
        <h3 className="card-list-item-title">{question}</h3>
        {label ? (
          <p className="card-list-item-meta">
            Card {index + 1} • {label}
          </p>
        ) : null}
      </div>
    </article>
  );
}
