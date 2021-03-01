import { useDispatch } from "react-redux";
import './App.css';
import { usersUpdateList_, usersTogglePermissions } from "./store/actions";

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
    dispatch(usersUpdateList_(testUser));
  };

  const togglePermissions = () => {
    dispatch(usersTogglePermissions());
  };

  return (
    <div className="App">
      <button onClick={togglePermissions}>
        toggle permission
      </button>
      <button onClick={updateUsers}>
        Click to update list
      </button>
    </div>
  );
}

export default App;
