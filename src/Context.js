import React, { Component } from 'react';
// import items from './data'

import Client from './Contentful'

// Client.getEntries({
//   content_type: 'beachResortRoom' //filters the content types in my contentful space
// })
//   .then((response) => console.log(response.items))
//   .catch(console.error)

const RoomContext = React.createContext();
//RoomContext is the context API.
// Provider (RoomContext) is responsible for allowing all components in component tree to access it. Component tree needs to be wrapped with the RoomContextProvider.

//Consumer is used to access that information (info comming from RoomContext Provider)

//RoomProvider is the Context.js
class RoomProvider extends Component {
  state= {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  //getData
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: 'beachResortRoom',
        // order: 'sys.createdAt'
        order: 'fields.price'
      });

      let rooms = this.formatData(response.items);
      // console.log(rooms);
      let featuredRooms = rooms.filter(room => room.featured === true);
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));
  
      this.setState({
        rooms, 
        featuredRooms, 
        sortedRooms: rooms, 
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      });


    } catch(error) {
      console.log(error)
    }
  } 


  componentDidMount() {
   this.getData();
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      //let room object has all the properties it normally has, but we are overwritting the existing image if there is one & we are adding the id property as it is not normally part of the fields props (id comes from sys)
      let room = {
        ...item.fields, 
        images,
        id}

      return room;
    })
    return tempItems;
  }

  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug); //find returns an object which is why we use it here. with filter, we would get an array that would than need to be dealt with to get a single object.
    return room;
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value; //we are just using the .checked attribute of the target element. this is why we check the .type. if .type was checkbox than we know that we are targeting the .checked attribute instead of the value attribute
    const name = event.target.name;
    this.setState({
      [name]: value
    }, this.filterRooms);
   
  }

  filterRooms = () => {
    let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = this.state;

    // all the rooms
    let tempRooms = [...rooms];

    //transform value, i.e. we already got the capacity from the state, but we get it as a string & we need to transform it back into a number
    capacity = parseInt(capacity);

    price = parseInt(price);

    //filter by type
    if(type !== 'all'){
      tempRooms = tempRooms.filter(room => room.type === type) //get me all the rooms that have the same type value that we are getting from the state.
    }

    //filter by capacity
    if(capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    //filter by price - doesn't need an if statement, price just needs to be less than price
    tempRooms = tempRooms.filter(room => room.price <= price);

    //filter by size
    tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

    //filter by breakfast
    if(breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

      //filter by pets
      if(pets) {
        tempRooms = tempRooms.filter(room => room.pets === true);
      }

    //change state
    this.setState({
      sortedRooms: tempRooms,
    })
  }

  render() {
    return ( 
      <RoomContext.Provider value={{
        ...this.state,
        getRoom: this.getRoom,
        handleChange: this.handleChange
        }}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

//I can use arrow function here as well
export function withRoomConsumer(Component){
  return function ConsumerWrapper(props){
    return <RoomConsumer>
      {value => <Component {...props} context={value} />}
    </RoomConsumer>
  }
}

export { RoomProvider, RoomConsumer, RoomContext };
//since ReactDOM is rendered in index.js, RoomProvider is going to be used in index.js