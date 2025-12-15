import React from "react";

//* Questo componente definisce lo stato generico dei bottoni di scroll e di visualizza dettagli, in base al nome del file dell'icona, riceve l'indice corrente e lo aggiorna, oppure cambia pagina

type ScrollBtnProps = {
  currentIndex: number,
  onClick: (newIndex: number) => void;
  maxIndex: number,
  isIncrement: boolean,
  cursor: string,
  opacity: string
};

const ScrollBtn: React.FC<ScrollBtnProps> = ({ 
  currentIndex, 
  onClick, 
  maxIndex, 
  isIncrement ,
  cursor,
  opacity
}: ScrollBtnProps) => {

  //# definisco incrementare o decrementare l'indice
  const params = isIncrement 
                  ? currentIndex < maxIndex
                    ? currentIndex = currentIndex + 1
                    : currentIndex
                  : currentIndex > 0
                    ? currentIndex = currentIndex - 1
                    : currentIndex

  return (
    <button
      className={`${opacity} ${cursor} text-6xl font-bold text-green-700 hover:text-green-900 transition-colors px-4 py-2 rounded-full hover:bg-green-100`}
      onClick={() => onClick(params)}
    >
      {isIncrement ? "→" : "←"}
    </button>
  );
};

export default ScrollBtn;