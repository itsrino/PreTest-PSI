import { Button, Col, Row, Table } from 'antd';
import Search, { SearchProps } from 'antd/es/input/Search';
import { DataType } from './shared/types';
import { columns } from './shared/columns';
import { useFetch } from './shared/hooks/useFetch';
import * as React from 'react';

function App() {
  const { users } = useFetch();
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearchQuery(value.toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <h1>List</h1>
      <Row
        style={{
          justifyContent: 'space-between',
          margin: '0px 0px 20px 0px',
        }}
      >
        <Col span={10}>
          <Search
            placeholder='Search'
            allowClear
            onSearch={onSearch}
            style={{ width: 500 }}
          />
        </Col>
        <Col span={4} offset={10}>
          <Button
            type='default'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='14'
                height='14'
                fill='#000000'
                viewBox='0 0 256 256'
              >
                <path d='M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z'></path>
              </svg>
            }
          >
            New Data
          </Button>
        </Col>
      </Row>

      <Table<DataType> columns={columns} dataSource={filteredUsers} />
    </>
  );
}

export default App;
