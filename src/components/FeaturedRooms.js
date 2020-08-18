import React, { Component } from 'react'
import { RoomContext } from '../Context'
import Loading from './Loading'
import Room from './Room'
import Title from './Title'

export default class FeaturedRooms extends Component {
  //static below can only be used in Class components
  static contextType = RoomContext;
  render() {
    let { loading, featuredRooms: rooms } = this.context;
    
    rooms = rooms.map(room => {
      return <Room key={room.id} room={room} />
    });

    return (
      <section className='reatured-rooms'>
        <Title title='featured rooms' />
        <div className='featured-rooms-center'>
          { loading ? <Loading /> : rooms }
        </div>
      </section>
    )
  }
}
