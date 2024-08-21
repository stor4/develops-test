'use client';

import DefDropdown from '@/components/DefDropdown';
import Image from 'next/image';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

interface Car {
  MakeID: number;
  MakeName: string;
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    fetch(`${apiUrl}/vehicles/GetMakesForVehicleType/car?format=json`)
      .then((res) => res.json())
      .then((res) => setCars(res.Results));
  }, []);

  useEffect(() => {
    if (selectedCar && selectedYear) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [selectedCar, selectedYear, selectedId]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex align-middle justify-center h-[100vh] w-full">
        <div className="flex flex-col h-full align-middle justify-center">
          <h1 className="text-center text-[34px] font-bold">
            Choose the vehicle
          </h1>
          <div className="flex flex-row gap-12 mt-5">
            <DefDropdown
              data={cars}
              title="Choose the car"
              onSelect={(value: string) => setSelectedCar(value)}
              setId={(id: number) => setSelectedId(id)}
            />
            <DefDropdown
              data={years}
              title="Choose model year"
              onSelect={(value: number) => setSelectedYear(value)}
            />
          </div>
          {isButtonEnabled ? (
            <Link
              className={`mt-8 w-full text-center inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-purple-600 hover:bg-purple-700`}
              href={`/result/${selectedId}/${selectedYear}`}
            >
              <p>Next</p>
            </Link>
          ) : (
            <a
              className={`mt-8 w-full text-center inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-gray-400 cursor-not-allowed`}
              href="#"
            >
              <p>Next</p>
            </a>
          )}
        </div>
      </main>
    </Suspense>
  );
}
