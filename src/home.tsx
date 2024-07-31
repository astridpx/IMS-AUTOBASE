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
        <div className="grid gap-6 pb-10 md:grid-cols-2 lg:grid-cols-4">
          {cars?.length ? (
            cars.map((car) => (
              <CarCard
                key={car._id}
                name={car.name}
                make={car.make}
                flag_img={car.origin}
                car_img={car.image}
                year={Number(car.release)}
              />
            ))
          ) : (
            <div className="text-xl font-bold text-center text-gray-600 lg:-translate-y-8 col-span-full">
              <h3>No Item Found.</h3>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
