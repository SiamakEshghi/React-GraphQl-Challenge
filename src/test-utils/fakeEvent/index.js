import { fireEvent } from '@testing-library/react';

export const changeInput = (renderer) => (name, value) => {
  const $element = renderer.container.querySelector(`input[name="${name}"]`);
  fireEvent.change($element, { target: { value } });
};
