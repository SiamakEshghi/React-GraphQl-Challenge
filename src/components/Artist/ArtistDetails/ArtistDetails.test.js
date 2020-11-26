import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';

import { createArtist } from '../../../test-utils/generators/fakeData';
import ArtistDetails from './ArtistDetails';

const mockEvent1 = jest.fn();
const mockEvent2 = jest.fn();

// mocking useSelector
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const defaultArtist = createArtist('mbid-1');

const defaultProps = {
  artist: defaultArtist,
  addToFaveHandler: mockEvent1,
  removeFromFaveHandler: mockEvent2,
};

const setup = (partialState, partialProps) => {
  useSelector.mockImplementation((selector) => selector(partialState));
  return render(<ArtistDetails {...partialProps} />);
};

describe('ArtistDetails', () => {
  afterEach(() => {
    mockEvent1.mockClear();
    mockEvent2.mockClear();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('renders without error', () => {
    const partialState = {
      fav: {
        favList: [],
      },
    };

    const { container } = setup(partialState, defaultProps);

    expect(container).toMatchSnapshot();
  });

  describe('Heart Icons', () => {
    const favObj = {
      name: 'name-test',
      mbid: 'mbid-test',
    };

    const setupHeart = () => {
      const partialStateHeart = {
        fav: {
          favList: [favObj],
        },
      };

      const propsHeart = {
        ...defaultProps,
        ...{ artist: { ...defaultArtist, ...favObj } },
      };
      return setup(partialStateHeart, propsHeart);
    };

    const setupEmptyHeart = () => {
      const partialStateEmptyHeart = {
        fav: {
          favList: [],
        },
      };
      return setup(partialStateEmptyHeart, defaultProps);
    };

    test('render heart icon if favList includes artist mbid', () => {
      setupHeart();
      const heartIcon = screen.queryAllByText('heart-icon');
      const emptyHeartIcon = screen.queryAllByText('empty-heart-icon');

      expect(heartIcon.length).toBe(1);
      expect(emptyHeartIcon.length).toBe(0);
    });

    test('render empty-heart icon if favList does not includes artist mbid', () => {
      setupEmptyHeart();
      const heartIcon = screen.queryAllByText('heart-icon');
      const emptyHeartIcon = screen.queryAllByText('empty-heart-icon');

      expect(heartIcon.length).toBe(0);
      expect(emptyHeartIcon.length).toBe(1);
    });

    test('clic on empty-heart icon should call mockEvent1', () => {
      setupEmptyHeart();
      const [emptyHeartIcon] = screen.queryAllByText('empty-heart-icon');
      fireEvent.click(emptyHeartIcon);

      expect(mockEvent1).toBeCalled();
    });

    test('clic on heart icon should call mockEvent2', () => {
      setupHeart();
      const [heartIcon] = screen.queryAllByText('heart-icon');
      fireEvent.click(heartIcon);

      expect(mockEvent2).toBeCalled();
    });
  });
});
