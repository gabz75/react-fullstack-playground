import React from 'react';
import EditableInput from '../EditableInput/EditableInput';
import UpdateCarMutation from '../../mutations/UpdateCarMutation';

export default class Car extends React.Component {
  static propTypes = {
    car: React.PropTypes.object.isRequired,
    relay: React.PropTypes.object.isRequired,
  };

  handleModelChange(attrName, attrValue) {
    this.props.car[attrName] = attrValue;
    this.props.relay.commitUpdate(
      new UpdateCarMutation({
        car: {
          id: this.props.car.id,
          make: this.props.car.make,
          model: this.props.car.model,
          year: this.props.car.year,
          color: this.props.car.color
        }
      })
    );
  }

  render() {
    const car = this.props.car;

    return (
      <li>
        Car # {car.id}
        <ul>
          <EditableInput value={car.make} onChange={this.handleModelChange.bind(this, 'make')} />
          <EditableInput value={car.model} onChange={this.handleModelChange.bind(this, 'model')} />
          <EditableInput value={car.color} onChange={this.handleModelChange.bind(this, 'color')} />
          <EditableInput value={car.year} onChange={this.handleModelChange.bind(this, 'year')} />
        </ul>
      </li>
    );
  }
}
