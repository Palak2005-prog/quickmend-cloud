import React, { createContext, useContext, useState } from 'react';
import { sounds } from '../utils/audio';

const SoundContext = createContext({
  isMuted: true,
  toggleSound: () => {},
  playHover: () => {},
  playClick: () => {},
  playSuccess: () => {},
});

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    const isPlaying = sounds.toggleMute();
    setIsMuted(!isPlaying);
  };

  const playHover = () => sounds.playHover();
  const playClick = () => sounds.playClick();
  const playSuccess = () => sounds.playSuccess();

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleSound,
        playHover,
        playClick,
        playSuccess,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
