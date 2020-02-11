import { combineReducers } from "redux";

function templateInstancesById(state = {}, action) {
  switch (action.type) {
    case "NEW_TEMPLATE_INSTANCE":
      return {
        ...state,
        [action.templateInstance.id]: action.templateInstance
      };
    default:
      return state;
  }
}

function templateGraphPath(state = [], action) {
  switch (action.type) {
    case "NEW_TEMPLATE_INSTANCE":
      let path = [...state, action.templateInstance.id];

      return path;
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
