import { useEffect, useState } from "react";
import { fetchHelper } from "./helpers/fetchHelper";

const tipos = {
  artifacts: "Artefactos",
  boss: "Jefes",
  characters: "Personajes",
  consumables: "Consumibles",
  domains: "Dominios",
  elements: "Elementos",
  enemies: "Enemigos",
  materials: "Materiales",
  nations: "Naciones",
  weapons: "Armas",
};

const App = () => {
  const [selects, setSelectets] = useState({
    types: [],
  });

  const fetchTypes = async () => {
    const respuesta = await fetchHelper("https://api.genshin.dev/");
    const { types } = await respuesta.json();
    console.log({ types });
    setSelectets({ ...selects, types });
  };

  useEffect(() => {
    fetchTypes().catch(console.error);
  }, []);

  return (
    <div className="container">
      <h1>Genshin Impact Dex</h1>
      <hr />
      <select>
        <option value="">Seleccione el tipo de información</option>
        {selects.types.map((type) => (
          <option value={type}>{tipos[type]}</option>
        ))}
      </select>
    </div>
  );
};

export default App;
