export function addUser(
  users: Map<string, NodeJS.Timeout | null>,
  username: string,
  callback: () => void
) {
  if (users.has(username)) {
    const timerId = users.get(username);
    if (timerId) clearTimeout(timerId);
    users.set(username, null);
  } else {
    callback();
  }
}

export function deleteUser(
  users: Map<string, NodeJS.Timeout | null>,
  username: string,
  callback: () => void
) {
  const timerId = setTimeout(() => {
    callback();
    users.delete(username);
  }, 1000);

  users.set(username, timerId);
}
