import '@testing-library/jest-native/extend-expect';
import React from 'react';
import mocks from '../mocks/eventMocks.json'
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import SearchScreen from '../pages/SearchScreen/SearchScreen';
import {GoogleService} from '../services/GoogleApiServices';

// mock result data
// mock call to api
jest.mock('../services/GoogleApiServices', () => {
  return {
    GoogleService: {
      getGeocode: jest.fn(),
      getDogParks: jest.fn(),
  }}
})

let searchBtn;

beforeEach(() => {
  const component = render(<SearchScreen />)
  searchBtn = component.getByTestId('search-btn')
})

describe('Search Screen', () => {
  it('Search btn should call googleApis', async () => {
    fireEvent.press(searchBtn);
    await waitFor(() => {
      expect(GoogleService.getGeocode).toHaveBeenCalled()
      expect(GoogleService.getDogParks).toHaveBeenCalled()
    })
  })
})
