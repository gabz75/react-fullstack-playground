import Relay from 'react-relay';

export default {
  car: Component => Relay.QL`
    query {
      car(id: $id) {
        ${Component.getFragment('car')}
      }
    }
  `
};
