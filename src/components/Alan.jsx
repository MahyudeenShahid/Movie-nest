import { useContext, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from './utils/ToggleTheme';

function useAlan(alanBtnContainer) {
  const { setMode } = useContext(ColorModeContext);

  useEffect(() => {
    if (!alanBtnContainer.current) return;

    alanBtn({
      key: '361387945e62743dea77b7da4bc15d632e956eca572e1d8b807a3e2338fdd0dc/stage',
      rootEl: alanBtnContainer.current, // attach Alan button to the div
      onCommand: ({ command, mode }) => {
        if (command === 'changeMode') {
          setMode(mode === 'light' ? 'light' : 'dark');
        }
      },
    });
  }, [alanBtnContainer, setMode]);
}

export default useAlan;
