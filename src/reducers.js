import { combineReducers } from "redux";

function templateInstancesById(state = {}, action) {
  switch (action.type) {
    case "NEW_TEMPLATE_INSTANCE":
      return {
        ...state,
        [action.templateInstance.id]: action.templateInstance,
      };
    case "UPDATE_PROPERTY_VALUES":
      return {
        ...state,
        [action.templateInstanceId]: templateInstance(
          state[action.templateInstanceId],
          action
        ),
      };
    default:
      return state;
  }
}

function templateInstance(state = {}, action) {
  switch (action.type) {
    case "UPDATE_PROPERTY_VALUES":
      let newPropertyValues = [...state.propertyValues];
      newPropertyValues[action.index] = action.value;
      return { ...state, propertyValues: newPropertyValues };
    default:
      return state;
  }
}

function templateGraphPath(state = [], action) {
  switch (action.type) {
    case "NEW_TEMPLATE_INSTANCE":
      let path = [...state, action.templateInstance.id];
      return path;
    // case "REMOVE_SUBSEQUENT_NODES":
    //   let i = 0;
    //   while (state[i] !== action.templateInstanceId) {

    //   }
    default:
      return state;
  }
}

function templatesById(state = {}, action) {
  return state;
}

function templateIds(state = [], action) {
  return state;
}

export default combineReducers({
  templateInstancesById,
  templatesById,
  templateIds,
  templateGraphPath
});
