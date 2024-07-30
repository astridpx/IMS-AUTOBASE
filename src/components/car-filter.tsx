import { useEffect, useState } from "react";
import Dropdown from "./dropdown-select";
import axios from "../lib/axios";
import { useSearchParams } from "react-router-dom";

const years: number[] = [2020, 2010, 2000, 1990, 1980, 1970, 1960, 1950];

export default function CarFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [make, setMake] = useState<string[]>([]);
  const [origin, setOrigin] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  //   FETCH DROPDOWN FILTER OPTIONS
  useEffect(() => {
    // fetch filters
    const fetchFilter = async () => {
      const { data: makes } = await axios.get("/cars/makes");
      const { data: origins } = await axios.get("/cars/origins");

      setMake(makes?.makes);
      setOrigin(origins?.origins);
    };

    try {
      fetchFilter();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSearchInput = (e: string) => {
    setSearch(e);

    const params = new URLSearchParams(searchParams);
    // delete params if search length is 0
    if (!e.length) {
      params.delete("search");
      setSearchParams(params);
    } else {
      // set search param
      params.set("search", e);
      setSearchParams(params);
    }
  };

  return (
    <>
      <section className="grid items-center grid-cols-8 mt-6 mb-16">
        <div className="col-span-3">
          <h3 className="text-4xl font-bold">Car Showcase</h3>
          <h5 className="text-sm font-semibold text-gray-600">
            Uncover your dream car!
          </h5>
        </div>

        <div className="flex items-center col-span-5 space-x-2">
          <input
            name="search"
            type="search"
            className="block w-full max-w-sm px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
            placeholder="Search..."
            value={search}
            onChange={(e) => handleSearchInput(e.target.value)}
          />

          <Dropdown options={make} placeholder="Filter make" param="make" />
          <Dropdown options={years} placeholder="Filter year" param="year" />
          <Dropdown
            options={origin}
            placeholder="Filter origin"
            param="origin"
          />
        </div>
      </section>
    </>
  );
}
