'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";

function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://3c369d4b-dae1-4911-a6ca-ec86d65cb9e0-00-28jopz1ld9yxf.riker.replit.dev/meshnav/'); // Replace with your actual endpoint URL
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
      <>
        <div className={"bg-white flex justify-center items-center"}>
          <div className={"div w-96 flex"}>
            <Table aria-label="Example static collection table" className={"w-full"}>
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Wp ID</TableColumn>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.wp_id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </>
  );
}

export default Home;
