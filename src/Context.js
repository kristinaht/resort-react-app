import React, { Component } from 'react';

const RoomContext = React.createContext();
//Provider (RoomContext) is responsible for allowing all components in component tree to access it. Component tree needs to be wrapped with the RoomContextProvider.

//Consumer is used to access that information (info comming from RoomContext Provider)

//RoomProvider is the Context.js
class RoomProvider extends Component {
  state= {
    greeting: 'hello',
    name: 'Kristina'
  };
  render() {
    return ( 
      <RoomContext.Provider value={{...this.state}}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
//since ReactDOM is rendered in index.js, RoomProvider is going to be used in index.js