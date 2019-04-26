
// function findTag(state, tag) {
//     return new Promise((resolve, reject) => {
//       state.findByTag(tag)
//       .then(dbresult => {
//         if(dbresult) {
//           resolve(dbresult);
//         } else {
//           resolve(null)
//         }
//       })
//       .catch(err => resolve(err))
//     })
//   };


// async function main(array, tag) {
//   return new Promise((resolve, reject) => {

//     let returnData = [];

//     for (let i = 0; i < array.length; i++) {
//         let state = array[i];
//         let data = await findTag(state, tag)
//         if(data){
//             returnData.push(data);
//         }
//     }
//     console.log('finished searching all collections')
//     if (returnData) {
//         console.log("the results are");
//         console.log(returnData);
//         resolve(returnData);
//     } else {
//         console.log("tag not found")
//         resolve({error: "tag not found"})
//     }

// })
// }

// exports.main = main;










