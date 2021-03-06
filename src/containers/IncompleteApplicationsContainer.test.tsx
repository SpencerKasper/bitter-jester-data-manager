import React from 'react';
import { shallow } from 'enzyme';
import { IncompleteApplicationsContainer } from './IncompleteApplicationsContainer';

describe('IncompleteApplicationsContainer', () => {
    const component = shallow(<IncompleteApplicationsContainer />);
    
    it('should render a div', () => {
        expect(component.find('div')).toHaveLength(1);
    });
});