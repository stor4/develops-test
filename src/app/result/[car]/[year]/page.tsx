'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import preloader from '../../../../../public/preloader.gif';

interface Model {
  ModelID: string;
  Make_Name: string;
  Model_Name: string;
}

const ModelsList = () => {
  const { car, year } = useParams();
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (car && year) {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const fetchData = async () => {
        try {
          const res = await fetch(
            `${apiUrl}/vehicles/GetModelsForMakeIdYear/makeId/${car}/modelyear/${year}?format=json`
          );
          const data = await res.json();
          console.log(data);
          setModels(data.Results);
        } catch (error) {
          console.error('Failed to fetch models:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [car, year]);

  if (loading) {
    return (
      <div>
        <Image src={preloader} alt="loading" />
      </div>
    );
  }

  if (!models.length) {
    return <div>No models found :(</div>;
  }

  return (
    <ul className="mt-8 max-h-[500px] text-center w-full overflow-auto">
      {models.map((model) => (
        <li key={model.ModelID}>
          {model.Make_Name}
          <span> {model.Model_Name}</span>
        </li>
      ))}
    </ul>
  );
};

const Page = () => {
  return (
    <main className="h-full w-full flex justify-center">
      <div className="h-[100vh] max-w-[500px] w-full flex flex-col justify-center items-center">
        <h1 className="text-[34px] font-bold">Founded models:</h1>
        <Suspense fallback={<div>Loading models...</div>}>
          <ModelsList />
        </Suspense>
        <Link
          className="mt-8 text-center inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-purple-600 hover:bg-purple-700"
          href="/"
        >
          Go back
        </Link>
      </div>
    </main>
  );
};

export default Page;
