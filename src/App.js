import { useDispatch } from "react-redux";
import './App.css';
import { actions, usersTogglePermissions } from "./store/actions";

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
      { list: [1] },
      { effects: { list: filter }, skipActionMW: true },
    ));
  };

  return (
    <div className="App">
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
  );
}

export default App;
