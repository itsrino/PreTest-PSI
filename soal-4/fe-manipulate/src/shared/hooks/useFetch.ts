import * as React from 'react';
import { DataType } from '../types';

export const useFetch = () => {
  const [page, setPage] = React.useState<number>(1);
  const [users, setUsers] = React.useState<DataType[]>([]);

  const getDataUsers = async (results: number, page: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/random?results=${results}&page=${page}`
      );
      const result = await response.json();
      const formatedUsers = result.map((user: DataType, index: number) => ({
        ...user,
        key: String(index),
      }));
      setUsers(formatedUsers);
    } catch (error) {
      console.log('err', error);
    }
  };

  React.useEffect(() => {
    getDataUsers(5, page);
  }, [page]);

  return { users, setPage };
};
