import { MemoryRouter, Route } from 'react-router-dom';

export const returnWithParams = (uri, path, component) => {
  return (
    <MemoryRouter initialEntries={[uri]}>
      <Route path={path}>{component}</Route>
    </MemoryRouter>
  );
};
