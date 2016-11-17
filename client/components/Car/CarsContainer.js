import Relay from 'react-relay';
import Cars from './CarsComponent';

export default Relay.createContainer(Cars, {
  initialVariables: {
    limit: 10,
    offset: 0
  },
  fragments: {
    cars: () => Relay.QL`
      fragment on Root {
        cars(limit: $limit, offset: $offset) {
          id,
          model,
          make,
          year,
          color
        }
      }
    `
  }
});
