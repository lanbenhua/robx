import React from 'react';
import { Empty } from 'antd';
import { EmptyProps } from 'antd/es/empty';

export default function EmptyContent(p: EmptyProps) {
  const { children, ...others } = p;
  return (
    <Empty
      image="https://static.idata-fe.shopee.io/data_engineering_data_static_file_0601e10c506d2f82cf4a/no-data.svg"
      description="No Data"
      {...others}
    >
      {children}
    </Empty>
  );
}
