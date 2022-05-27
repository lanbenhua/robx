import * as React from 'react';

// import { BaseTypeContainer } from 'container/base-type';
// import { IRouterProps } from 'component/router';
// import { ITestParams } from 'types';
import './index.less';

// import { TestIdKeyMapFindPersonProfile } from 'container/array-type/array-children-key-component';
// import { FunctionContianer } from 'container/function-container';
// import { ObjectTypeContainer } from 'container/object-type';
// import { ArrayTypeContainer } from 'container/array-type';
// import { MapTypeContainer } from 'container/map-type';
import { SetContianerValues } from 'container/set-type';
// import { SetContianerValues } from 'container/set-type';
import { observer } from '../../../../src';
// import { testStore } from 'store';

// const testObj = { hello: 'world' };
export const TestPage = observer(() => {
  return (
    <>
      {/* <BaseTypeContainer id={props.match.params.id} test={testObj} /> */}
      {/* <ObjectTypeContainer id={props.match.params.id} /> */}
      {/* <ArrayTypeContainer /> */}
      {/* <MapTypeContainer id={props.match.params.id} /> */}
      <SetContianerValues />
      {/* <SetContianerKeys /> */}
      {/* <TestIdKeyMapFindPersonProfile /> */}
      {/* {testStore.obj.teacher.age > 30 ? <FunctionContianer /> : null} */}
    </>
  );
});
