import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createArtistsListMock } from '../../test-utils/generators/fakeMocks';
import { changeInput } from '../../test-utils/fakeEvent';

import Home from './Home';

const fakeName = 'micheal';

const setupWithoutGraphqlProvider = () => {
  return render(<Home />);
};

const setupWithGraphqlProvider = () => {
  return render(
    <MockedProvider mocks={createArtistsListMock(fakeName)} addTypename={false}>
      <Home />
    </MockedProvider>
  );
};

describe('Home', () => {
  test('should render without error', () => {
    setupWithoutGraphqlProvider();

    const home = screen.getByTestId('home-module');
    expect(home).toBeInTheDocument();
  });

  describe('GraphQl', () => {
    test('should render loading state initially', () => {
      const renderer = setupWithGraphqlProvider();
      changeInput(renderer, fakeName);

      const spinner = renderer.container.querySelector('.spinnerContainer');
      const cards = screen.getByTestId('cards');

      expect(spinner).toBeInTheDocument();
      expect(cards).toBeTruthy();
    });

    test('should render Cards', async () => {
      let cards;
      await act(async () => {
        const renderer = setupWithGraphqlProvider();

        changeInput(renderer, fakeName);

        await new Promise((resolve) => setTimeout(resolve, 0));

        cards = screen.getByTestId('cards');
      });

      expect(cards).toBeTruthy();
    });
  });
});
