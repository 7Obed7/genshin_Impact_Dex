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

  const fetchTypes = async (url, item) => {
    const respuestaJson = await fetchHelper(url);
    const respuesta = await respuestaJson.json();

    if (item === "types") {
      setSelectets({ ...selects, [item]: respuesta[item] });
    } else {
      setSelectets({ ...selects, [item]: respuesta });
    }
    console.log(selects);
  };

  useEffect(() => {
    fetchTypes("https://api.genshin.dev/", "types").catch(console.error);
  }, []);

  const handleChangeType = ({ target }) => {
    fetchTypes(`https://api.genshin.dev/${target.value}`, target.value);
  };
  return (
    <div className="container">
      <h1>Genshin Impact Dex</h1>
      <hr />
      <select onChange={handleChangeType}>
        <option value="">Seleccione el tipo de material</option>
        {selects.types.map((type) => (
          <option value={type} key={type}>
            {tipos[type]}
          </option>
        ))}
      </select>
      {selects.materials && (
        <select name="materials">
          <option value="">Seleccione un artefacto</option>
          {selects.materials.map((material) => (
            <option value={material} key={material}>
              {material}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default App;
