import { createContext, useContext, useState } from 'react';

const BotContext = createContext();

export const useBot = () => useContext(BotContext);

export const BotProvider = ({ children }) => {
  const [isBotActive, setIsBotActive] = useState(false);

  const toggleBot = (isActive) => {
    setIsBotActive(isActive);
  };

  return (
    <BotContext.Provider value={{ isBotActive, toggleBot }}>
      {children}
    </BotContext.Provider>
  );
};
