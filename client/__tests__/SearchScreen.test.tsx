import '@testing-library/jest-native/extend-expect';
import React from 'react';
import Login from '../pages/Login/Login';

// mock result data
// mock call to api
// should render test results


const myMock = jest.fn();

myMock('arg1', 'arg2');

expect(myMock).toHaveBeenCalledWith('arg1', 'arg2');
