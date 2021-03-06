import React from 'react';

import renderer from 'react-test-renderer';

import EditDetailsForm from './EditDetailsForm';

/**********************************************************/

describe('EditDetailsForm component', () => {
    test('renders', () => {
        const tree = renderer.create(<EditDetailsForm />).toJSON();
        expect(tree.children).toHaveLength(1);
    });

    test('matches snapshot', () => {
        const tree = renderer.create(<EditDetailsForm />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
