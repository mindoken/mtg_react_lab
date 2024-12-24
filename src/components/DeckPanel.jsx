function DeckPanel({ deck, onAddCard, onRemoveCard }) {
   return( <div className="content">
         <h1 className='contentHeader'>Your Deck</h1>
            <div id="cardsContainer">
                {deck.map(card => (
                    <div key={card.id}>
                        <img src={card.imageUrl} alt={card.name} />
                        <span>{card.name} (x{card.count})</span>
                        <button onClick={() => onRemoveCard(card)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export {DeckPanel}