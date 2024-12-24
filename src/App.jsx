import './App.css';
import { useState } from 'react';
import { CardList } from "./components/CardList.jsx";
import { DeckPanel } from "./components/DeckPanel.jsx";
import { StatisticsPanel } from "./components/StatisticsPanel.jsx";

function App() {
    const [deck, setDeck] = useState([]); // Initialize the deck state
    const [selectedCard, setSelectedCard] = useState(null);

    // Function to add a card to the deck
    const addCardToDeck = (card) => {
        const cardInDeck = deck.find(deckCard => deckCard.id === card.id);
        if (!cardInDeck || card.type === "Land") { // Allow multiple lands
            setDeck(prevDeck => {
                const newDeck = [...prevDeck];
                if (cardInDeck) {
                    const index = newDeck.indexOf(cardInDeck);
                    newDeck[index].count += 1; // Increment count if card already exists
                } else {
                    newDeck.push({ ...card, count: 1 }); // Add new card with count
                }
                return newDeck;
            });
        }
    };

    // Function to remove a card from the deck
    const removeCardFromDeck = (card) => {
        setDeck(prevDeck => {
            return prevDeck.filter(deckCard => deckCard.id !== card.id);
        });
    };

    return (
        <>
            <header>
                <h1>MTG Deck Builder</h1>
            </header>
            <main className="main">
                <CardList onSelectCard={setSelectedCard} />
                <DeckPanel deck={deck} onAddCard={addCardToDeck} onRemoveCard={removeCardFromDeck} />
                <StatisticsPanel deck={deck} /> {/* Pass the deck state to StatisticsPanel */}
            </main>
            {selectedCard && (
                <div className="card-details">
                    <h2>{selectedCard.name}</h2>
                    <img src={selectedCard.imageUrl} alt={selectedCard.name} />
                    <p>{selectedCard.text}</p>
                    <button onClick={() => addCardToDeck(selectedCard)}>Add to Deck</button>
                </div>
            )}
        </>
    );
}

export default App;
