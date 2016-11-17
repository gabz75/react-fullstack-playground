import Relay from 'react-relay';

export default {
  cars: (Component, variables) => Relay.QL`
    query {
      root {
        ${Component.getFragment('cars', { limit: variables.limit, offset: variables.offset })}
      }
    }
  `
};
