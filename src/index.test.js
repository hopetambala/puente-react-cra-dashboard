import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Layout from './js/components/Layout';
import './index.css';

/*
describe("Header component", () => {
  test("it matches the snapshot", () => {
    const component = create(<Header />);
    expect(component.toJSON()).toMatchSnapshot();
  });
}); */

it('renders without crashing', () => {
  const app =  document.getElementById('root')
  ReactDOM.render(<Layout/>,app);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Layout/>, div);
});