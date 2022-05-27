import React from 'react';
import { testStore } from 'store';
import { ITestParams } from 'types';
import { observer } from '../../../../src';

type IProps = { id: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShowFruit = observer((props: IProps) => {
  console.log('Friut ==>', testStore.fruits[props.id]);
  // console.log('Friut ==>', props.id);
  return (
    <div>
      {/* <span>{props.id}</span> */}
      <span>{testStore.fruits[props.id]}</span>
    </div>
  );
});

// @observer
// class ShowFruit extends React.Component<IProps> {
//   render() {
//     console.log('Friut ==>', testStore.fruits.length);
//     // console.log('Friut ==>', props.id);
//     return (
//       <div>
//         {/* <span>{props.id}</span> */}
//         <span>{testStore.fruits[this.props.id]}</span>
//       </div>
//     );
//   }
// }

@observer
export class ArrayTypeContainer extends React.PureComponent<ITestParams> {
  public renderProfile() {
    console.log('Friut test array re-render', testStore.fruits);
    // for (const v in testStore.fruits) {
    //   console.log('--->', v);
    // }
    return (
      <div>
        {testStore.fruits.map((_, index) => {
          return <ShowFruit key={index} id={index} />;
        })}
        {/* <ShowFruit key={0} id={0} />; */}
      </div>
    );
  }

  renderUpdateName() {
    return <div onClick={() => testStore.updateFruits()}>update array</div>;
  }

  public render() {
    return (
      <>
        {this.renderProfile()}
        {this.renderUpdateName()}
      </>
    );
  }
}
