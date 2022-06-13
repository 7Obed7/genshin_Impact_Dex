const CustomSelect = ({ name, label, itemArray }) => {
  return (
    <select name={name}>
      <option value="">{label}</option>
      {itemArray.map((item) => (
        <option value={item} key={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
