const generateManipulateRandomUser = async (results, page) => {
  try {
    const response = await fetch(
      `https://randomuser.me/api?results=${results}&page=${page}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

generateManipulateRandomUser(10, 1).then(({ results }) => {
  const manipluateUsers = results.map((user) => ({
    name: `${user.name.first} ${user.name.last}`,
    location: `${user.location.street.number},${user.location.street.name}, ${user.location.state} , ${user.location.country}`,
    email: user.email,
    age: user.dob.age,
    phone: user.phone,
    cell: user.cell.split(' ').join('-'),
    picture: [user.picture.large, user.picture.medium, user.picture.thumbnail],
  }));
  console.log(manipluateUsers);
});
