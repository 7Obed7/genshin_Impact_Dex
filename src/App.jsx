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
  const initialSelected = {
    artifacts: false,
    boss: false,
    characters: false,
    consumables: false,
    domains: false,
    elements: false,
    enemies: false,
    materials: false,
    nations: false,
    weapons: false,
  };
  const [selects, setSelects] = useState({
    types: [],
    selected: {
      ...initialSelected,
    },
  });

  const fetchTypes = async (url, item) => {
    const respuestaJson = await fetchHelper(url);
    const respuesta = await respuestaJson.json();

    if (item === "types") {
      setSelects({ ...selects, [item]: respuesta[item] });
    } else {
      setSelects({
        ...selects,
        [item]: respuesta,
        selected: { ...initialSelected, [item]: true },
      });
    }
    console.log(selects);
  };

  useEffect(() => {
    fetchTypes("https://api.genshin.dev/", "types").catch(console.error);
  }, []);

  const handleChangeType = ({ target }) => {
    fetchTypes(`https://api.genshin.dev/${target.value}`, target.value).catch(
      console.error
    );
  };
  return (
    <div className="container">
      <h1>Genshin Impact Dex</h1>
      <hr />
      <select name="types" onChange={handleChangeType}>
        <option value="">Seleccione el tipo de material</option>
        {selects.types.map((type) => (
          <option value={type} key={type}>
            {tipos[type]}
          </option>
        ))}
      </select>
      {selects.selected.materials && (
        <select name="materials">
          <option value="">Seleccione un material</option>
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
