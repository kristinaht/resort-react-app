import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../Context';
import StyledHero from '../components/StyledHero'

export default class SingleRoom extends Component {
  //props below is available through React Router, I am not passing it myself to the SingleRoom component!
    constructor(props){
      super(props);
      this.state = {
        slug: this.props.match.params.slug,
        defaultBcg
      };
    }

    //need contextType to be able to access getRoom
    static contextType = RoomContext;

  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    console.log(room)

    if(!room){
      return <div className='error'>
        <h3>no such room could be found...</h3>
        <Link to='/rooms' className='btn-primary'>
          back to rooms
        </Link>
      </div>
    }

    const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;
    return (
      <React.Fragment>
        <StyledHero  img={images[0] || this.state.defaultBcg}>
          <Banner title={`${name} room`}>
            <Link to='/rooms' className='btn-primary'>
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
      </React.Fragment>
    );
  }
}

//having the StyledHero img prop set up as it is now is an overkill, but I am using it as a reference that I have the option to set up the defaultBcg option this way and not only with a ternary operator used in StyledHero component
