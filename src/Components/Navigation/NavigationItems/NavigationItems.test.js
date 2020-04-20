import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Navigation } from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// connecting the enzyme
configure({ adapter: new Adapter() });

// setting up test bundle with "describe"
// seting up test case with "it"
describe('<NavigationItems/>', () => {
  it('should render two <NavigationItem/> if unauthenticated', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
});
