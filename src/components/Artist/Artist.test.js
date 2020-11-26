import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useDispatch } from 'react-redux';
import { returnWithParams } from '../../test-utils';
import { createArtistMock } from '../../test-utils/generators/fakeMocks';

import Artist from './Artist';

const artistId = 'artistId';

// mock useDispatch neccessary for test
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

const setup = () => {
  return render(
    <MockedProvider mocks={createArtistMock(artistId)} addTypename={false}>
      {returnWithParams(`/artist/${artistId}`, '/artist/:artistId', <Artist />)}
    </MockedProvider>
  );
};

describe('Artist', () => {
  describe('GraphQl', () => {
    afterEach(cleanup);

    test('should render loading state initially', () => {
      const { container } = setup();

      const spinner = container.querySelector('.spinnerContainer');
      expect(spinner).toBeInTheDocument();
    });

    test('should render Artist', async () => {
      let artistElement;
      await act(async () => {
        setup();

        await new Promise((resolve) => setTimeout(resolve, 0));

        artistElement = screen.getByTestId('artist-module');
      });
      expect(artistElement).toBeTruthy();
    });
  });
});
