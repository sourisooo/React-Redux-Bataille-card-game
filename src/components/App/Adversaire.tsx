

import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { useState } from "react";




function Adversairecard() {

    const {deck, player, adversaire, gameover} = useSelector((store:any) => store.deck)

    const [hidden,sethidden] = useState(true);

    const [image, setimage] = useState('url(./favicon.ico)');

    const dispatch = useDispatch();

    const throwthecard = (event) => {

        console.log(event.target.parentNode.id)

        // dispatch({type:'ADVTHROWCARD', payload:event.target.parentNode.id})


    }

    const toggle = () => {

      if (hidden==true){sethidden(false), setimage('url(./fulldeck.png)'), dispatch({type:'ORDERCARD'});} else {sethidden(true), setimage('url(./favicon.ico)'), dispatch({type:'SHUFFLECARD'});};

    }

    const echangethecard = (event) => {

      checkgamestate();

      if (gameover==false){

      dispatch({type:'ORDERCARD'});

      console.log(event.target.parentNode.id)

      let adversairecard = adversaire.filter(e => e.index ==event.target.parentNode.id);

      console.log(adversairecard);

       dispatch({type:'ECHANGECARDPART1', payload:adversairecard[0]})

       dispatch({type:'ECHANGECARDPART2', payload:player[0]})

       dispatch({type:'SHUFFLECARD'});}


    }

    const throwalert = () => {

      alert('you only can trade card while hidden')


    }


    const checkgamestate = () => {
  
      console.log(deck.length);
     if(deck.length<2){sethidden(true), dispatch({type:'GAMEOVER'}), alert('gameover, please restart the game'), window.location.reload()} 
  
    }


if (hidden==false) {
  return (

    <>

    <button type="button" onClick={toggle}>hide/reveal card</button>

    <div style={{display:'flex', flexDirection:'row'}} onClick={throwalert}>


    {adversaire.map(card => (
        
    <Card card={card} image={image}/>

    ))}

    </div>

    </>
  )} else {

        return(

          <>

          <button type="button" onClick={toggle}>hide/reveal card</button>
      
          <div style={{display:'flex', flexDirection:'row'}} onClick={echangethecard}>
      
      
          {adversaire.map(card => (
              
          <Card card={card} image={image}/>
      
          ))}
      
          </div>
      
          </>
    )

  }


}

export default Adversairecard;
