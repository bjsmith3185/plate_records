import React, { Component } from "react";

// Redux
import { connect } from "react-redux";

export default function(ComposedComponent) {

    class WithAuth extends Component {
        componentWillMount() {
         if(!this.props.isAuthenicated) {
            console.log("not authenicated")
            this.props.history.push('/')
         }
        }

        
      
        render() {
          return (
            <ComposedComponent {...this.props} />
          );
        }
      }

      const mapStateToProps = state => {
        return {
            // userId: state.userId,
            isAuthenicated: state.isAuthenicated,
           
        };
};

      return connect(mapStateToProps)(WithAuth);
}


// // this brings in the state to display on this component
// const mapStateToProps = state => {
//   return {
//     // userId: state.userId,
//     // allList: state.allList,
//     // myStore: state.myStore,
//     // editing: state.editing,
//     // storeList: state.storeList,
//   };
// };

// const mapDispachToProps = dispach => {
//   return {
//     // loadAllData: (id, history) => {
//     //   dispach({ type: "LOAD_DATA", payload: { id, history } });
//     // },

//     // setHistory: history => {
//     //   dispach({ type: "SET_HISTORY", payload: { history } });
//     // }
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispachToProps
// )(HomePage);
