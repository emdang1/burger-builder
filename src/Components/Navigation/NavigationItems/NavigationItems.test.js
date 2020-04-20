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
  let wrapper;
  // is called before each test
  beforeEach(() => {
    wrapper = shallow(<Navigation />);
  });

  it('should render two <NavigationItem/> if unauthenticated', () => {
    // const wrapper = shallow(<Navigation />); --- can be deleted due to the beforeEach
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  // passing prop "isAuthenticated" as true to the <Navigation/> component
  it('should render three <NavigationItem/> if authenticated', () => {
    // const wrapper = shallow(<Navigation isAuthenticated />); --- can be deleted due to the beforeEach
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});
