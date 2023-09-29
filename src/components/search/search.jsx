import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { BASE_URL, geoApiOption } from "./../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  function handlerChange(searchData) {
    setSearch(searchData);
    onSearchChange(searchData);
  }

  // function loadOptions(inputValue) {
  //   return fetch(
  //     `${BASE_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
  //     geoApiOption
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       return {
  //         options: response.data.map((city) => {
  //           return {
  //             value: `${city.latitude} ${city.longitude}`,
  //             label: `${city.name} ${city.countryCode}`,
  //           };
  //         }),
  //       };
  //     })
  //     .catch((error) => console.log(error));
  // }

  async function loadOptions(inputValue) {
    try {
      const response = await fetch(
        `${BASE_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOption
      );
      const result = await response.json();
      return {
        options: result.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name} ${city.countryCode}`,
          };
        }),
      };
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AsyncPaginate
      placeholder="Search the City"
      debounceTimeout={600}
      value={search}
      onChange={handlerChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
