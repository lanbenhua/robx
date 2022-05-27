import React from 'react';

import { observer } from '../../../../src';
import { testStore } from 'store';

export const FunctionContianer = observer(() => {
  console.log('test function component', testStore.obj.boy, testStore.obj.girl);
  return (
    <>
      <div>{testStore.obj.boy}</div>
      <div>{testStore.obj.girl}</div>
      <div
        onClick={() => {
          testStore.updateObj();
        }}
      >
        update function component obj
      </div>
    </>
  );
});
