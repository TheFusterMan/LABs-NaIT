let guests = ['петр', 'иван', 'алина', 'ольга', 'матвей'];

const search = (users, newUser) => {
    const exists = users.includes(newUser);
    return exists ? [...users] : [...users, newUser];
};

console.log(search(guests, 'анна'));
console.log(guests);