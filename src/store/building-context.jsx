import React, { useState } from "react";

const BuildingContext = React.createContext({
  house_name: "",
  type: "",
  total_room: "",
  street: "",
  hajjaj_count: "",
  hajjaj_accsept: "",
  number_prrmit: "",
  house_owner_name: "",
  phone: "",
  build_number_prrmit: "",
  total_floor: "",
  owner_ip: "",
  lessor_name: "",
  alarm_network: "",
  fire_network: "",
  fire_pump: "",
  generator: "",
  bilud_component: "",
  institution_maintenance: "",
  institution_safty: "",
  price_hajj: "",
  price_years: "",
  media: [],
  attached_file: [],
  page: 0,
  setPage: () => {},
  setFormData: (
    house_name,
    type,
    total_room,
    street,
    hajjaj_count,
    hajjaj_accsept,
    number_prrmit,
    house_owner_name,
    phone,
    build_number_prrmit,
    total_floor,
    owner_ip,
    lessor_name,
    alarm_network,
    fire_network,
    fire_pump,
    generator,
    bilud_component,
    institution_maintenance,
    institution_safty,
    price_hajj,
    price_years,
    media,
    attached_file
  ) => {},
});

export const BuildingContextProvider = (props) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState({
    house_name: "",
    type: "",
    total_room: "",
    street: "",
    hajjaj_count: "",
    hajjaj_accsept: "",
    number_prrmit: "",
    house_owner_name: "",
    phone: "",
    build_number_prrmit: "",
    total_floor: "",
    owner_ip: "",
    lessor_name: "",
    alarm_network: "",
    fire_network: "",
    fire_pump: "",
    generator: "",
    bilud_component: "",
    institution_maintenance: "",
    institution_safty: "",
    price_hajj: "",
    price_years: "",
    media: [],
    attached_file: [],
  });
  const setPageHandler = () => {
    setPageNumber((prevPage) => {
      return prevPage + 1;
    });
  };
  return (
    <BuildingContext.Provider
      value={{
        house_name: data.house_name,
        type: data.type,
        total_room: data.total_room,
        street: data.street,
        house_owner_name: data.house_owner_name,
        hajjaj_count: data.hajjaj_count,
        hajjaj_accsept: data.hajjaj_accsept,
        number_prrmit: data.number_prrmit,
        phone: data.phone,
        build_number_prrmit: data.build_number_prrmit,
        total_floor: data.total_floor,
        owner_ip: data.owner_ip,
        lessor_name: data.lessor_name,
        alarm_network: data.alarm_network,
        fire_network: data.fire_network,
        fire_pump: data.fire_pump,
        generator: data.generator,
        bilud_component: data.bilud_component,
        institution_maintenance: data.institution_maintenance,
        institution_safty: data.institution_safty,
        price_hajj: data.price_hajj,
        price_years: data.price_years,
        media: data.media.slice(),
        attached_file: data.attached_file.slice(),
        page: pageNumber,
        setPage: setPageHandler,
        setFormData: setData,
      }}
    >
      {props.children}
    </BuildingContext.Provider>
  );
};

export default BuildingContext;
