import usersSeed from '../data/users.json';

const STORAGE_KEY = 'mercado_users';

const clone = (value) => JSON.parse(JSON.stringify(value));

const normalizeUsers = (users) =>
  users.map((user, index) => ({
    ...user,
    _id: user._id || user.id || String(index + 1),
    id: user.id || user._id || index + 1,
    isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
  }));

const readUsers = () => {
  if (typeof window === 'undefined') {
    return normalizeUsers(usersSeed);
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const seeded = normalizeUsers(usersSeed);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    return normalizeUsers(JSON.parse(stored));
  } catch {
    return normalizeUsers(usersSeed);
  }
};

const writeUsers = (users) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }
};

export const fetchUsers = () =>
  Promise.resolve({
    data: {
      users: clone(readUsers()),
    },
  });

export const createUser = (user) => {
  const users = readUsers();
  const nextUser = {
    ...user,
    _id: user._id || user.id || String(Date.now()),
    id: user.id || users.length + 1,
    isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
  };
  const nextUsers = [...users, nextUser];
  writeUsers(nextUsers);
  return Promise.resolve({ data: { user: clone(nextUser) } });
};

export const registerUser = createUser;

export const updateUser = (id, user) => {
  const users = readUsers();
  const nextUsers = users.map((item) =>
    item._id === id || item.id === id ? { ...item, ...user } : item,
  );
  writeUsers(nextUsers);
  return Promise.resolve({
    data: {
      user: clone(nextUsers.find((item) => item._id === id || item.id === id)),
    },
  });
};

export const deleteUser = (id) => {
  const nextUsers = readUsers().filter((item) => item._id !== id && item.id !== id);
  writeUsers(nextUsers);
  return Promise.resolve({ data: { success: true } });
};

export const loginUser = (credentials) => {
  const username = String(credentials?.username || credentials?.email || '').trim().toLowerCase();
  const password = String(credentials?.password || '');
  const user = readUsers().find((item) => {
    const sameUsername = String(item.username || '').toLowerCase() === username;
    const sameEmail = String(item.email || '').toLowerCase() === username;
    return (sameUsername || sameEmail) && String(item.password || '') === password;
  });

  if (!user) {
    return Promise.reject(new Error('Invalid username or password.'));
  }

  return Promise.resolve({
    data: {
      user: clone(user),
      token: `local-${user._id || user.id}`,
    },
  });
};
