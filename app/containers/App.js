// @flow
import * as React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}
