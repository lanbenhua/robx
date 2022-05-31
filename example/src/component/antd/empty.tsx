import React from 'react';
import { Empty } from 'antd';
import { EmptyProps } from 'antd/es/empty';

export default function EmptyContent(p: EmptyProps) {
  const { children, ...others } = p;
  return (
    <Empty
      image=""
      description="No Data"
      {...others}
    >
      {children}
    </Empty>
  );
}
