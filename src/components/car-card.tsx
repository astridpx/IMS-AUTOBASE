interface CarProps {
  name: string;
  make: string;
  year: number;
  flag_img: string;
  car_img: string;
}

interface FlagInterface {
  id: string;
  path: string;
}

const Flag: FlagInterface[] = [
  {
    id: "jp",
    path: "flag-jp.svg",
  },
  {
    id: "de",
    path: "flag-de.svg",
  },
  {
    id: "kr",
    path: "flag-kr.svg",
  },
];

// Utility function to find the flag path based on the flag ID
const getFlagPath = (flagId: string): string => {
  const flag = Flag.find((f) => f.id === flagId);
  return flag ? `/assets/icons/${flag.path}` : "";
};

export default function CardCard({
  name,
  make,
  flag_img,
  car_img,
  year,
}: CarProps) {
  const flagPath = getFlagPath(flag_img);

  return (
    <>
      <div className="p-4 bg-[#F2F2F4] rounded-xl flex flex-col justify-between h-[20rem] border hover:border-black hover:shadow-md duration-75">
        <header className="space-y-1">
          <div className="flex justify-between">
            <h4 className="text-3xl font-bold">{name}</h4>

            <img
              // className="inline-block scale-75 rounded-full shadow-lg ring-1 ring-orange-500"
              className="inline-block scale-75 rounded-md shadow-lg h-max ring-1 ring-orange-500"
              src={flagPath}
              alt="flag"
              width={50}
            />
          </div>
          <h5 className="font-medium">{make}</h5>
          <h6 className="font-medium">{year}</h6>
        </header>

        <img src={`/assets/images/${car_img}`} alt="car" />
      </div>
    </>
  );
}
