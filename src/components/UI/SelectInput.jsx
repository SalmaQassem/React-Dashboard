import styles from "../../styles/_SelectInput.module.scss";
import { useState } from "react";
import Select, { components } from "react-select";
import { Controller } from "react-hook-form";

const SelectInput = ({
  name,
  isError,
  control,
  options,
  placeholder,
  icon,
  selectedItem,
  setSelect,
  value,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const arrowIcon = icon;
  //const [selectedOptions, setSelectedOptions] = useState(null);

  const handleChange = (option) => {
    //console.log(option);
    setSelect(option);
  };
  const handleMenuOpen = () => {
    setMenuOpen(true);
  };
  const handleMenuClose = () => {
    setMenuOpen(false);
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {arrowIcon}
      </components.DropdownIndicator>
    );
  };
  const Option = (props) => {
    return (
      <components.Option {...props}>
        <div className={styles.option}>
          <span>{props.data.label}</span>
          {props.data.icon && (
            <div className={styles.icon}>{props.data.icon}</div>
          )}
        </div>
      </components.Option>
    );
  };
  const customStyles = {
    container: (baseStyles) => ({
      ...baseStyles,
      minHeight: menuOpen ? "11.5625rem" : "3.125rem",
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      width: "100%",
      height: "3.125rem",
      padding: "0 0.9375rem",
      fontFamily: "Cairo-Regular",
      fontSize: "1rem",
      //border: "none",
      borderRadius: "0.5rem",
      border: "0.0625rem solid #4e4b4b",
      boxShadow: "none",
      "&.invalid": {
        borderColor: "red",
      },
      "&:hover": {
        border: "0.0625rem solid #4e4b4b",
      },
      cursor: "pointer",
    }),
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      padding: "0",
      flex: "1 0",
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      margin: "0",
      textTransform: "capitalize",
    }),
    input: (baseStyles) => ({
      ...baseStyles,
      margin: "0",
      padding: "0",
    }),
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      padding: "0",
      fontSize: "1.5rem",
    }),
    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      display: "none",
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      width: "100%",
      top: "3.125rem",
      overflow: "hidden",
      margin: "0.125rem 0",
      borderRadius: "0.5rem",
    }),
    menuList: (baseStyles) => ({
      ...baseStyles,
      fontFamily: "Cairo-Regular",
      fontSize: "1rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      textTransform: "capitalize",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.isFocused && !state.isSelected
          ? "#c3c3c3"
          : state.isSelected && "#d11242",
      textTransform: "capitalize",
    }),
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...field } }) => (
        <Select
          className={
            isError !== undefined
              ? `${styles.select} ${styles.invalid}`
              : styles.select
          }
          options={options}
          {...field}
          onChange={handleChange}
          menuIsOpen={menuOpen}
          onMenuOpen={handleMenuOpen}
          onMenuClose={handleMenuClose}
          components={{ DropdownIndicator, Option }}
          placeholder={placeholder}
          icon={icon}
          //selected={selectedItem}
          //value={value}
          styles={customStyles}
          //setSelected={setItem}
          //value={props.value && props.value}
        />
      )}
    />
  );
};

export default SelectInput;
/*<Select
      {...props}
      className={
        props.isError ? `${styles.select} ${styles.invalid}` : styles.select
      }
      defaultValue={props.selected}
      //onChange={props.selectHandler}
      placeholder={props.placeholder}
      //menuIsOpen={menuOpen}
      //onMenuOpen={handleMenuOpen}
      //onMenuClose={handleMenuClose}
      components={{ DropdownIndicator, Option }}
      styles={customStyles}
    />*/
