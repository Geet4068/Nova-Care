// import React from 'react'

// interface User {
//   id: number;
//   name: string;
//   username: string;
// }

// interface Props {
//   usersdata: User[];
// }

// const StaticSideGeneration = ({ usersdata }: Props) => {
//   return (
//     <div>
//       <h1>Static Side Generator</h1>
//       <ul>
//         {usersdata.map((user) => (
//           <li key={user.id}>
//             <p>Name: {user.name}</p>
//             <p>Username: {user.username}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export const getStaticProps = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users");
//   const data = await res.json();

//   return {
//     props: {
//       usersdata: data
//     }
//   };
// };

// export default StaticSideGeneration;
