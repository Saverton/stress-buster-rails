import { createContext } from 'react';

const UserContext = createContext({
  username: 'test-user',
  id: 6
});

export { UserContext };
