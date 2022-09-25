import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const CountryTable = () => {
  const [country, setCountry] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCountries, setFilterCountries] = useState("");

  const getCountries = async () => {
    try {
      const res = await axios.get("https://restcountries.com/v2/all");
      setCountry(res.data);
      setFilterCountries(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Country Name",
      selector: (row) => row.name,
      sortable:true
    },
    {
      name: "Country Native Name",
      selector: (row) => row.nativeName,
    },
    {
      name: "Country Capital",
      selector: (row) => row.capital,
    },
    {
      name: "Country Flag",
      selector: (row) => <img width={50} height={50} src={row.flag} />,
    },
    {
        name: "Action",
        cell: (row) => <button className="btn btn-primary" onClick={() => alert(row.nativeName) }>Edit</button>
      },
  ];
  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const result = country.filter(country => {
        return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFilterCountries(result)
  },[search])


  return <DataTable 
  columns={columns} 
  data={filterCountries}  
  pagination 
  fixedHeader 
  fixedHeaderScrollHeight="450px"
  selectableRows
  highlightOnHover
  actions={
    <button>Export</button>
  }
  subHeader
  subHeaderComponent={
    <input type={'text'} placeholder="search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    />
  }
  />;
};

export default CountryTable;
