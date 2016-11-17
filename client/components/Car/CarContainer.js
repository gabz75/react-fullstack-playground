import Relay from 'react-relay';
import Car from './CarComponent';

export default Relay.createContainer(Car, {
  fragments: {
    car: () => Relay.QL`
      fragment on Car {
        id,
        make,
        model,
        year,
        color
      }`
  },
});
