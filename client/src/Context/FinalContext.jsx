import { createContext, useContext, useState } from "react";

// Creación del contexto
export const FinalContext = createContext();


//creando un Hook

export const useFinalContext = ()=>{
  const miContext = useContext(FinalContext)
  if(!miContext) throw new Error('¡useFinalContext must be used in a Provider')
  return miContext
}

// Proveedor del contexto
 const FinalContextProvider = ({ children }) => {
const [modalCheck, setModalCheck]=useState(null);
const [Id, setId]=useState(null);
return (
    <FinalContext.Provider value={{ 
      modalCheck,
      setModalCheck,
      Id,
      setId
      }}>
      {children}
    </FinalContext.Provider>
  );
};

export default FinalContextProvider;
