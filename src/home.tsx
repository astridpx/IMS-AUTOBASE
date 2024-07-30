import { useEffect, useState } from "react";

// component
import Navbar from "./components/navbar";
import Layout from "./components/layout";
import CarCard from "./components/car-card";
import CarFilter from "./components/car-filter";

// library
import axios from "./lib/axios";
import { useSearchParams } from "react-router-dom";

interface Car {
  _id: string;
  name: string;
  make: string;
  release: string;
  origin: string;
  image: string;
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>();
  const [searchParams] = useSearchParams();

  // fetch cars
  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await axios.get("/cars", {
        params: {
          search: searchParams.get("search"),
          make: searchParams.get("make"),
          origin: searchParams.get("origin"),
          releaseFrom: searchParams.get("year"),
        },
      });

      setCars(data?.cars);
    };

    try {
      fetchCars();
    } catch (error) {
      console.error(error);
    }
  }, [searchParams]);

  return (
    <>
      <Layout>
        <Navbar />

        {/* CAR FILTER */}
        <CarFilter />

        {/* CAR DISPLAY */}
        <div className="grid grid-cols-4 gap-6 px-8">
          {cars?.map((car) => (
            <CarCard
              key={car._id}
              name={car.name}
              make={car.make}
              flag_img={car.origin}
              car_img={car.image}
              year={Number(car.release)}
            />
          ))}
        </div>
      </Layout>
    </>
  );
}
