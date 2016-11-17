import Relay from 'react-relay';

export default class UpdateCarMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation UpdateCar {
      updateCar(input: { id: $id, make: $make, model: $model, year: $year, color: $color})
    }`;
  }
  // This mutation declares a dependency on a document's ID
  static fragments = {
    car: () => Relay.QL`fragment on Car {
      id,
      make,
      model,
      year,
      color
    }`,
  };
  // We know that only the car's model can change as a result
  // of this mutation, and specify it here in the fat query.
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateCarPayload { car {
        make,
        model,
        year,
        color
      }
    }`;
  }
  getVariables() {
    return {
      id: this.props.car.id,
      make: this.props.car.make,
      model: this.props.car.model,
      year: this.props.car.year,
      color: this.props.car.color,
    };
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      // Correlate the `car` field in the response
      // with the DataID of the record we would like updated.
      fieldIDs: {
        car: this.props.car.id
      },
    }];
  }
}
