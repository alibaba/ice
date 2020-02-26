// 测试原始的 rematch
// import * as React from 'react';
// import { init } from '@rematch/core'
// import { Provider, connect } from 'react-redux'

// const countModel = {
//   state: {
//     value: 0
//   }, // initial state
//   reducers: {
//     // handle state changes with pure functions
//     increment(state, payload) {
//       return {...state, value: state.value + payload};
//     },
//   },
//   effects: dispatch => ({
//     // handle state changes with impure functions.
//     // use async/await for async actions
//     async incrementAsync(payload, rootState) {
//       await new Promise(resolve => setTimeout(resolve, 1000))
//       dispatch.count.increment(payload)
//     },
//   }),
// }

// const store = init({
//   models: {
//     count: countModel
//   },
// });

// const Child = (props) => (
//   <div>
//     The count is {props.count.value}
//     <button type="button" onClick={props.increment.bind(null, 1)}>increment</button>
//     <button type="button" onClick={props.incrementAsync.bind(null, 1)}>incrementAsync</button>
//   </div>
// )

// const mapState = state => ({
//   count: state.count,
// })

// const mapDispatch = ({ count: { increment, incrementAsync } }) => ({
//   increment,
//   incrementAsync,
// })

// const CountContainer = connect(
//   mapState,
//   mapDispatch,
// )(Child)

// const Page = () => {
//   return (
//     <Provider store={store}>
//       <CountContainer />
//     </Provider>
//   );
// };

// export default Page;
