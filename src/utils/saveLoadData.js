const data_url = "/data/genericData.json";

export function saveData(data) {
  return null;
}

export function loadData(userToFetch = { id: 0 }) {
  return fetch(data_url)
    .then((response) => {
      if (response.status != 200) return { users: [] };
      return response.json();
    })
    .then((jsondata) => {
      const data = jsondata.users.filter((user) => {
        if (user.id == userToFetch.id) {
          return user;
        }
      });
      return data;
    });
}
