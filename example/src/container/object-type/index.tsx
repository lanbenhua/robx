import React from 'react';
import { testStore } from 'store';

import { ITestParams } from 'types';
import { observer } from '../../../../src';

@observer
export class ObjectTypeContainer extends React.Component<ITestParams> {
  private number = 0;
  public renderBoy() {
    if (this.number > 5) return null;
    return <div>{testStore.obj.boy}</div>;
  }

  public renderGirl() {
    return (
      <div>
        <span>girl name: </span>
        {testStore.obj.girl}
      </div>
    );
  }

  // public renderTeacher() {
  //   return (
  //     <div>
  //       <span>{testStore.teacher}</span>
  //     </div>
  //   );
  // }

  // public renderHeadMaster() {
  //   return (
  //     <div>
  //       <span>{testStore.headMaster}</span>
  //     </div>
  //   );
  // }

  // renderUpdateAge() {
  //   return (
  //     <div
  //       onClick={() => {
  //         testStore.updateTeacher();
  //       }}
  //     >
  //       update teacher
  //     </div>
  //   );
  // }

  renderUpdateGirlName() {
    return (
      <div
        onClick={() => {
          testStore.updateGirlName();
        }}
      >
        update girl name
      </div>
    );
  }

  renderUpdateHeadMaster() {
    return (
      <div
        onClick={() => {
          testStore.updateTeacher();
        }}
      >
        update headmaster via updateTeacher
      </div>
    );
  }

  public render() {
    console.log('test object', testStore.obj);
    return (
      <>
        {/* {this.renderBoy()} */}
        {this.renderGirl()}
        {/* {this.renderTeacher()} */}
        {/* {this.renderHeadMaster()} */}
        {/* {this.renderUpdateAge()} */}
        {this.renderUpdateGirlName()}
        {/* {this.renderUpdateHeadMaster()} */}
      </>
    );
  }
}
