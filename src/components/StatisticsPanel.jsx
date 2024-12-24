import { ManaStats } from "./ManaStats.jsx";
import { ColorStats } from "./ColorStats.jsx";

function StatisticsPanel({ deck }) {
    // Calculate mana distribution
    const manaDistribution = {};
    const colorDistribution = {};

    deck.forEach(card => {
        // Calculate mana cost distribution
        const manaCost = card.manaCost ? card.manaCost.match(/\d+/g) || [] : [];
        manaCost.forEach(cost => {
            manaDistribution[cost] = (manaDistribution[cost] || 0) + 1;
        });

        // Calculate color distribution
        if (card.colors) {
            card.colors.forEach(color => {
                colorDistribution[color] = (colorDistribution[color] || 0) + 1;
            });
        }
    });

    return (
        <div id="stats">
            <h2>Stats</h2>
            <div className="widgets">
                <ManaStats data={manaDistribution} />
                <ColorStats data={colorDistribution} />
            </div>
        </div>
    );
}

export { StatisticsPanel };