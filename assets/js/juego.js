/* 
    2C = Two of Clubs (Tréboles)
    2D = Two of Diamonds (Diamantes)
    2H = Two of Hearts (Corazones)
    2S = Two of Spades (Espadas)
*/

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S']; 
const especiales = ['A', 'J', 'Q', 'K' ];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias del HTML

const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');

const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHtml = document.querySelectorAll('small');




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

    return carta;
}


//pedirCarta();

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor )) ? 
            ( valor === 'A' ) ? 11 : 10 
            :valor * 1;

    //console.log({valor});
    // let puntos = 0;
    // if ( isNaN( valor ) ){
    //     console.log('No es un número');
        // puntos = ( valor === 'A' ) ? 11 : 10; 
    // }else{
    //     console.log('Es un número');
    //     puntos = valor * 1; // lo multiplico por uno para convertirlo en número
    // }

    //console.log(puntos);

}

// turno de la computadora

const turnoComputadora = ( puntosMinimos ) => {
    
   do {

        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHtml[1].innerText = puntosComputadora

        //<img class='carta' src="assets/cartas/2C.png" alt=""></img>
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        if( puntosMinimos > 21 ) {
            break;
        }



    }while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21 ) );


}

//Eventos

btnPedir.addEventListener('click', () => {
    
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHtml[0].innerText = puntosJugador;

    //<img class='carta' src="assets/cartas/2C.png" alt=""></img>
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );

    } else if ( puntosJugador === 21 ){
        console.warn('21, genial!');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }

});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled   = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );


})


