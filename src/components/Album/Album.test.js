import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { returnWithParams } from '../../test-utils';
import { createAlbumMock } from '../../test-utils/generators/fakeMocks';

import Album from './Album';

const fakeArtistMbid = 'artistId';
const fakeAlbumMbid = 'albumId';

const setup = () => {
  return render(
    <MockedProvider mocks={createAlbumMock(fakeAlbumMbid)} addTypename={false}>
      {returnWithParams(
        `/artist/${fakeArtistMbid}/album/${fakeAlbumMbid}`,
        '/artist/:artistId/album/:albumId',
        <Album />
      )}
    </MockedProvider>
  );
};

describe('Album', () => {
  describe('GraphQl', () => {
    afterEach(cleanup);

    test('should render loading state initially', () => {
      const { container } = setup();

      const spinner = container.querySelector('.spinnerContainer');
      expect(spinner).toBeInTheDocument();
    });

    test('should render Album', async () => {
      let albumElement;

      await act(async () => {
        setup();

        await new Promise((resolve) => setTimeout(resolve, 0));

        albumElement = screen.getByTestId('album-module');
      });

      expect(albumElement).not.toBeTruthy();
    });
  });
});
