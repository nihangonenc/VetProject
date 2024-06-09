import { createContext, useContext, useState } from "react";

const AnimalContext = createContext();

export const AnimalContextProvider = ({ children }) => {
  const [animal, setAnimal] = useState({});
  const [animals, setAnimals] = useState([]);

  const updateAnimals = (animals) => {
    setAnimals(animals);
  };

  const addAnimal = (animal) => {
    setAnimals([...animals, animal]);
  };

  const updateAnimal = (animal) => {
    setAnimal(animal);
  };

  const removeAnimalById = (id) => {
    const newAnimals = animals.filter((animal) => animal.id !== id);
    setAnimals(newAnimals);
  };

  const values = {
    animal,
    animals,
    updateAnimals,
    addAnimal,
    updateAnimal,
    removeAnimalById,
  };

  return (
    <AnimalContext.Provider value={values}>{children}</AnimalContext.Provider>
  );
};
export const useAnimal = () => {
  const context = useContext(AnimalContext);
  if (context === undefined) {
    //provider ile sarmalanmalı. Yoksa hata fırlattık.
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default AnimalContext;
