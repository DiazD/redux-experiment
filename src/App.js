import { useDispatch } from "react-redux";
import './App.css';
import { actions, usersTogglePermissions, phoneActions } from "./store/actions";

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
    dispatch(actions.usersUpdateList(testUser));
  };

  const togglePermissions = () => {
    dispatch(usersTogglePermissions());
  };

  const filterOutUser = () => {
    dispatch(actions.usersUpdateList(
      { users: [1] },
      { effects: { users: filter }, skipActionMW: true },
    ));
  };

  const updateFamilyphonebook = () => {
    dispatch(phoneActions.updateFamilyPhonebook(
      testPhonebook
    ));
  };

  const updateWorkphonebook = () => {
    dispatch(phoneActions.updateWorkPhonebook({
      work: { [testWorkPhonebook.id]: testWorkPhonebook }
    }));
  };

  return (
    <div className="App">
      <div>
        <h4>User reducer controls</h4>
        <button onClick={togglePermissions}>
          toggle permission
        </button>
        <button onClick={updateUsers}>
          Click to update list
        </button>
        <button onClick={filterOutUser}>
          Filter User with Id 1
        </button>
      </div>
      <div>
        <h4>phonebook controls</h4>
        <button onClick={updateFamilyphonebook}>
          Add one to family phonebook
        </button>
        <button onClick={updateWorkphonebook}>
          Add one to work phonebook
        </button>
      </div>
    </div>
  );
}

export default App;
