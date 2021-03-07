### Redux Experiment
It's tiring writing all the boilerplate with redux. Not just that, when reading code we see an `action` being dispatched and in order to find out what changes it causes, we have to do the following:

- Find the actionCreator function
- Look at the action-type
- Find the reducing function(s) that handles that action
- Read the reducer code for that action-type

Instead what I want to do is not write reducer boilerplate and be able to read my `actionCreator` and see what effects it has to the world.
You can find a working example in this repo of the implementation and usage of this experiment.

### Problem Statement(Some of my petpeeves)
Often times I find myself doing writing reducers that are as follows

```
// NOTE: I using immer
switch(action.type) {
  case USERS_SET_LIST: {
    state.users = action.payload;
    break;
  }
  case USERS_FILTER_LIST: {
    state.users = state.users.filter(
	  ({ id }) => !action.payload.includes(id)
    );
	break;
  }
}
```

I dislike having to write the switch statement and setting or filtering a value.  These operations are very common that you could turn them into reducing functions, `(currentState, data) => newState`.

Another petpeevee is writing actions that don't tell me much of what they do other than reading the name. For example, imagine we have an action that takes a list and updates state with that list then updates a loading state. Normally we'd have something like this

```
const updateList = (payload, meta = {}) => ({
  type: "UPDATE_LIST",
  payload,
  meta
})

// or if you create a wrapper around actionCreators it could turn into
const updateList = createAction("UPDATE_LIST");

// sample reducer of how it would handle it

...
switch(action.type) {
  case UPDATE_LIST: {
    state.users = action.payload;
    state.loading = false;
  }
}
...
```

`updateList` doesn't really tell me that it's going to update some loading state. It's obviously a terrible name but we could make it better by calling it `updateUsersList`. However this tells what what resource we're updating, great, but it doesn't tell us what other effects are happening.

### Small Solution
This repo explores a way to reduce boilerplate by making `actionCreators` more declaritive and removing the need to write `reducers`(the switch statement type).
The main idea is that we want `actionCreators` to describe how it will affect our state and `reducers` turning into generic reducing functions.

Here's a little preview of how it would look like:

```
// actions.js

// our redux store shape for reference
const store = {
  db: {
	users: {},
	loading: true,
	...
  }
}

// still same name not too descriptive but at least it tells us about the subject of the action.
const updateUsersList = registerAction({
  name: "UPDATE_USERS_LIST",     // 1
  effects: {
    users: shallowMerge,         // 2
    loading: constantly(false),  // 3
  }
})
```

1. We register our action name
2. We register an effect on `users`, `shallowMerge` this is the update strategy between our current data and new data.
3. We register an effect on `loading`, `constantly` just returns the value you provide as an argument and replace whatever value is in state.

RegisterAction returns for us a regular actionCreator function and registers the effects that will be handled by our reducer.

#### Further Details
There are 5 components(not JSX components) that make up the whole system

- RegisterAction
- Effects Registrar
- Root Reducer(only 1)
- HandleAction middleware
- HandleAction function
- Action Registrar

The `RegisterAction` handles the logic of providing an `actionCreator` as well as registering our effects into the effects register.

The `Effects Registrar` is a map that is keyed by the `name` provided in the `registerAction`. This allows the `Root Reducer` to fetch the effects based on the `action.type`. 

The `Root Reducer` handles `ALL` actions, it reads off the `Effects Registrar` and attempts to retrieve the effects for the given action. It loops through the effects and and extracts the reducing function to reduce the action payload and the current state.

The `HandleAction middleware` is an interceptor that sits between the action-dispatched event and reducer. This allows us to intercept a given action and transform it's data as we wish. 

The `HandleAction function ` registers the `handler` provided in the `handleAction` into the `Action Register`. The `Action Register` is just a map where the key is the action name and value is the handler that will provide a transformation.

#### Register Action in detail
TODO

#### Root Reducer in detail
TODO

#### HandleAction middleware in deteail
TODO

#### HandleAction function in detail
TODO
