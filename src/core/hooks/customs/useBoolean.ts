import { useState, useCallback } from "react";

interface UseBooleanReturn {
  setTrue: () => void;
  setFalse: () => void;
  setToggle: () => void;
}

export const useBoolean = (initialState = false): [boolean, UseBooleanReturn] => {
  const [state, setState] = useState<boolean>(initialState);

  const handleTrue = useCallback(() => setState(true), []);
  const handleFalse = useCallback(() => setState(false), []);
  const handleToggle = useCallback(() => setState(prev => !prev), []);

  return [
    state,
    {
      setTrue: handleTrue,
      setFalse: handleFalse,
      setToggle: handleToggle,
    },
  ];
};
