
import React from 'react'
import RoomFilter from './RoomFilter'
import RoomList from './RoomList'

import { withRoomConsumer } from '../Context' //allows using the value
import Loading from './Loading'

function RoomsContainer({ context }){
  const { loading, sortedRooms, rooms } = context;

  if(loading) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <RoomFilter rooms={rooms}/>
      <RoomList rooms={sortedRooms}/>
    </React.Fragment>
  );
}
      

export default withRoomConsumer(RoomsContainer)


// import React from 'react'
// import RoomFilter from './RoomFilter'
// import RoomList from './RoomList'

// import { RoomConsumer } from '../Context' //allows using the value
// import Loading from './Loading'

// export default function RoomsContainer() {
//   return (
//     <RoomConsumer>
//       { value => {
//           const { loading, sortedRooms, rooms } = value;

//           if(loading) {
//             return <Loading />
//           }

//           return (
//           <div>
//             Hello from Rooms Container
//             <RoomFilter rooms={rooms}/>
//             <RoomList rooms={sortedRooms}/>
//           </div>
//         );
//       }}
//     </RoomConsumer>
//   )
// }


// //lines 11 - 25: this is a function that used to be used more before hooks, today hooks can be used instead. Still, it is fine to use the function as well