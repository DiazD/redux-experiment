import { useDispatch } from "react-redux";
import './App.css';

// components
import Section from "./components/Section";

// containers
import Users from "./containers/Users";

// redux related
import users from "./store/users";
import phonebook from "./store/phonebook";
import { usersTogglePermissions } from "./store/actions";

const filter = (map, ids) => {
  ids.forEach((id) => {
    delete map[id];
  });
  return map;
};

const testUser = {
  id: 1,
  name: "Bingo Dingo",
  age: 25,
  address: 1,
  school: 1,
  favorites: ["gaming", "food"],
};

const testPhonebook = {
  id: 2,
  contact: "Mary Jones",
  phone: "555-345-5678",
  email: "mjJones@gmao.coml",
};

const testWorkPhonebook = {
  id: 10,
  contact: "Brodie Barnes",
  phone: "800-578-5583",
  email: "Borodo@barnes.com",
  extension: 556,
};

function App() {
  const dispatch = useDispatch();
  const updateUsers = () => {
    dispatch(users.actions.updateUsersList(testUser));
  };

  const togglePermissions = () => {
    dispatch(usersTogglePermissions());
  };

  const filterOutUser = () => {
    dispatch(users.actions.updateUsersList(
      { users: [1] },
      { effects: { users: filter }, skipActionMW: true },
    ));
  };

  const updateFamilyphonebook = () => {
    dispatch(phonebook.actions.updateFamilyPhonebook(
      testPhonebook
    ));
  };

  const updateWorkphonebook = () => {
    dispatch(phonebook.actions.updateWorkPhonebook({
      work: { [testWorkPhonebook.id]: testWorkPhonebook }
    }));
  };

  return (
    <div className="App">
      <Section header="User controls">
        <button onClick={togglePermissions}>
          toggle permission
        </button>
        <button onClick={updateUsers}>
          Click to update list
        </button>
        <button onClick={filterOutUser}>
          Filter User with Id 1
        </button>
        <Users />
      </Section>
      <Section header="phonebook controls">
        <button onClick={updateFamilyphonebook}>
          Add one to family phonebook
        </button>
        <button onClick={updateWorkphonebook}>
          Add one to work phonebook
        </button>
      </Section>
    </div>
  );
}

export default App;
