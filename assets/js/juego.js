/* 
    2C = Two of Clubs (Tréboles)
    2D = Two of Diamonds (Diamantes)
    2H = Two of Hearts (Corazones)
    2S = Two of Spades (Espadas)
*/

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S']; 
const especiales = ['A', 'J', 'Q', 'K' ];

//Esta funcion crea un nuevo deck
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            
            deck.push( i + tipo);
        }        
    }
    
    for (const tipo of tipos) {
        for (const esp of especiales) {
            deck.push( esp + tipo);           
        }
        
    }
    //console.log( deck );
    deck = _.shuffle( deck );
    console.log(deck);
    return deck;

}

crearDeck();

//Esta funcion me permite tomar una carta 

const pedirCarta = () => {

    if (deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    console.log(deck);
    console.log(carta); // carta debe de ser de la baraja


    return carta;
}


pedirCarta();