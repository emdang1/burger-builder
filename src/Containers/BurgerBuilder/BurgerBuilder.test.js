import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder/>', () => {
  let wrapper;

  // if the component needs or accesses some prop right on the componentDidMount
  // you need to pass it here, in the shallow method, thats like "mounting it", so thats the reason
  // you cannot do it through the "setProps", that is already too late
  // here we are just passing an anonymous function to fulfill the need of this prop, thats it
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });

  it('should render <BuildControls/> component if having "ingredients" prop', () => {
    wrapper.setProps({
      ings: { salad: 0 },
    });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
