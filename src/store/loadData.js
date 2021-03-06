import data from "../resources/MOCK_DATA";

export const parseData = () => {
  return data.reduce((acc, item) => {
    const { address, ...rest } = item;
    acc.users[rest.id] = { ...rest, address: address.id };
    acc.address[address.id] = address;

    return acc;
  }, { users: {}, address: {} })
}
