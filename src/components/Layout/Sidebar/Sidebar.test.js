import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import { createFav } from '../../../test-utils/generators/fakeData';

const mockEvent = jest.fn();

// mocking useSelector
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

const defaultProps = {
  selectFavHandler: mockEvent,
};

const setup = (partialState, partialProps) => {
  useSelector.mockImplementation((selector) => selector(partialState));
  return render(<Sidebar {...partialProps} />);
};

describe('Sidebar', () => {
  afterEach(() => {
    mockEvent.mockClear();
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

    const { container } = setup(partialState);

    expect(container).toMatchSnapshot();
  });

  test('render correct amount of li based on length of favList. Amount should be favList.length + 1 because first li is the title', () => {
    const favObj1 = createFav('mbid-1');
    const favObj2 = createFav('mbid-2');
    const favObj3 = createFav('mbid-3');

    const partialState = {
      fav: {
        favList: [favObj1, favObj2, favObj3],
      },
    };

    const { container } = setup(partialState);
    const favLiElements = container.querySelectorAll('li');

    expect(favLiElements.length).toBe(4);
  });

  test('click on link call function with fav mbid property', () => {
    const favObj1 = createFav('mbid-1');

    const partialState = {
      fav: {
        favList: [favObj1],
      },
    };

    setup(partialState, defaultProps);

    const liElement = screen.getByText(favObj1.name);

    fireEvent.click(liElement);

    expect(mockEvent).toBeCalledWith(favObj1.mbid);
  });
});
