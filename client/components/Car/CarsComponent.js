import React from 'react';
import Car from './CarComponent';

export default class Cars extends React.Component {
  static propTypes = {
    cars: React.PropTypes.object.isRequired,
    relay: React.PropTypes.object.isRequired,
  };

  render() {
    const cars = this.props.cars;
    const relay = this.props.relay;
    return (
      <ul>
        {
          cars.cars.map((car, idx) => <Car car={car} relay={relay} key={idx} />)
        }
      </ul>
    );
  }
}
