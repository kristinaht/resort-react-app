import React, { Component } from 'react';
import items from './data'

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


  componentDidMount() {
    let rooms = this.formatData(items);
    console.log(rooms);
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
    })
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
    const type = event.target.type;
    const name = event.target.name;
    const value = event.target.value;
    console.log(type, name, value);
  }

  filterRooms = () => {
    console.log('hello')
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