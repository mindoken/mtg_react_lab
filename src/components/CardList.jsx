import {useEffect, useState} from "react";
import {Mtg} from "../api/mtg.js";

function CardList({ onSelectCard }) {
    const [cards, setCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const mtg = new Mtg();
        mtg.loadCards()
            .then((loadedCards) => {
                setCards(loadedCards)
            });
    }, []);
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const filteredCards = cards.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
   return <div id="menu">
        <h2>Cards</h2>
        <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
        <div id="listContainer">
        {filteredCards.map(card => (
                    <li key={card.id} onClick={() => onSelectCard(card)}>
                        {card.name}
                    </li>
                ))}
        </div>
    </div>
}

export {CardList}