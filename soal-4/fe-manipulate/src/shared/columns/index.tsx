import { TableProps } from 'antd';
import { DataType } from '../types';

export const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Nama',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Umur',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Alamat',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'No Telepon 1',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'No Telepon 2',
    dataIndex: 'cell',
    key: 'cell',
  },

  {
    title: 'Gambar',
    dataIndex: 'picture',
    key: 'picture',
    render: (_, { picture }) => (
      <>
        {picture.map((picture) => (
          <img
            src={picture}
            alt='gambar'
            style={{ width: '50px', height: '50px' }}
          />
        ))}
      </>
    ),
  },
];
