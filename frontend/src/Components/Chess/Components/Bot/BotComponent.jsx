import { useEffect } from 'react';
import { ChessBot } from './Bot'; 
import { useBot } from './BotContext'; 
import { Side } from "../../Types";

export const BotComponent = ({ board, setBoard }) => { 
  const { isBotActive } = useBot();

  useEffect(() => {
    if (isBotActive && board.currentSide === Side.OPPONENT) { 
      const bot = new ChessBot(board, Side.OPPONENT);
      bot.makeBotMove();
      setBoard({ ...bot.board }); 
    }
  }, [board, isBotActive, setBoard]);

  return null;
};
