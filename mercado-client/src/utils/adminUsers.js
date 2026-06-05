import usersSeed from '../data/users.json?raw';

export const roles = ['admin', 'editor', 'user'];
export const genders = ['male', 'female', 'other'];
export const statuses = ['active', 'inactive'];

export const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

export const loadUsers = () => {
  try {
    return JSON.parse(usersSeed).map((user, index) => ({
      id: Number(user.id) || index + 1,
      firstName: String(user.firstName ?? '').trim(),
      lastName: String(user.lastName ?? '').trim(),
      age: String(user.age ?? '').trim(),
      gender: genders.includes(
        String(user.gender ?? '')
          .trim()
          .toLowerCase()
      )
        ? String(user.gender ?? '')
            .trim()
            .toLowerCase()
        : '',
      contactNumber: String(user.contactNumber ?? '').trim(),
      email: String(user.email ?? '')
        .trim()
        .toLowerCase(),
      role: roles.includes(
        String(user.role ?? '')
          .trim()
          .toLowerCase()
      )
        ? String(user.role ?? '')
            .trim()
            .toLowerCase()
        : 'user',
      username: String(user.username ?? '')
        .trim()
        .toLowerCase(),
      password: String(user.password ?? ''),
      address: String(user.address ?? '').trim(),
      isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
    }));
  } catch {
    return [];
  }
};

export const getStatus = (user) => (user.isActive ? 'active' : 'inactive');

export const userMatchesFilters = (user, filters) => {
  const query = filters.search.trim().toLowerCase();
  const searchable = [
    user.firstName,
    user.lastName,
    user.email,
    user.username,
    user.contactNumber,
  ]
    .join(' ')
    .toLowerCase();

  return (
    (!query || searchable.includes(query)) &&
    (!filters.role || user.role === filters.role) &&
    (!filters.gender || user.gender === filters.gender) &&
    (!filters.status || getStatus(user) === filters.status)
  );
};
