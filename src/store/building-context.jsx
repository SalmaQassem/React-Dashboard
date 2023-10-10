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
  attached_type: "",
  setFirstPage: (
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
    generator
  ) => {},
  setSecondPage: (
    bilud_component,
    institution_maintenance,
    institution_safty,
    price_hajj,
    price_years,
    attached_type
  ) => {},
});

export const BuildingContextProvider = (props) => {
  //First Page State
  const [firstPageData, setFirstPageData] = useState({
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
  });
  const setFirstDataHandler = (
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
    generator
  ) => {
    setFirstPageData({
      house_name: house_name,
      type: type,
      total_room: total_room,
      street: street,
      hajjaj_count: hajjaj_count,
      hajjaj_accsept: hajjaj_accsept,
      number_prrmit: number_prrmit,
      house_owner_name: house_owner_name,
      phone: phone,
      build_number_prrmit: build_number_prrmit,
      total_floor: total_floor,
      owner_ip: owner_ip,
      lessor_name: lessor_name,
      alarm_network: alarm_network,
      fire_network: fire_network,
      fire_pump: fire_pump,
      generator: generator,
    });
  };

  //Second Page State
  const [secondPageData, setSecondPageData] = useState({
    bilud_component: "",
    institution_maintenance: "",
    institution_safty: "",
    price_hajj: "",
    price_years: "",
    attached_type: "",
  });
  const setSecondDataHandler = (attached_type) => {
    setSecondPageData((prevState) => {
      return { ...prevState, attached_type: attached_type };
    });
  };
  /*const setSecondDataHandler = (
    bilud_component,
    institution_maintenance,
    institution_safty,
    price_hajj,
    price_years,
    attached_type
  ) => {
    setSecondPageData({
      bilud_component: bilud_component,
      institution_maintenance: institution_maintenance,
      institution_safty: institution_safty,
      price_hajj: price_hajj,
      price_years: price_years,
      attached_type: attached_type,
    });
  };*/
  return (
    <BuildingContext.Provider
      value={{
        house_name: firstPageData.house_name,
        type: firstPageData.type,
        total_room: firstPageData.total_room,
        street: firstPageData.street,
        hajjaj_count: firstPageData.hajjaj_count,
        hajjaj_accsept: firstPageData.hajjaj_accsept,
        number_prrmit: firstPageData.number_prrmit,
        house_owner_name: firstPageData.house_owner_name,
        phone: firstPageData.phone,
        build_number_prrmit: firstPageData.build_number_prrmit,
        total_floor: firstPageData.total_floor,
        owner_ip: firstPageData.owner_ip,
        lessor_name: firstPageData.lessor_name,
        alarm_network: firstPageData.alarm_network,
        fire_network: firstPageData.fire_network,
        fire_pump: firstPageData.fire_pump,
        generator: firstPageData.generator,
        bilud_component: secondPageData.bilud_component,
        institution_maintenance: secondPageData.institution_maintenance,
        institution_safty: secondPageData.institution_safty,
        price_hajj: secondPageData.price_hajj,
        price_years: secondPageData.price_years,
        attached_type: secondPageData.attached_type,
        setFirstPage: setFirstDataHandler,
        setSecondPage: setSecondDataHandler,
      }}
    >
      {props.children}
    </BuildingContext.Provider>
  );
};

export default BuildingContext;
