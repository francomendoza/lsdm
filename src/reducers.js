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

const temp1 = {
  id: 1,
  name: "Column Chromatography",
  properties: [
    {
      name: "Name"
    },
    {
      name: "Description"
    },
    {
      name: "Linear Velocity"
    }
  ],
  relatedTemplates: [
    {
      name: "Pre Equilibration",
      templateId: 2
    },
    {
      name: "Equilibration",
      templateId: 2
    },
    {
      name: "Load",
      templateId: 2
    },
    {
      name: "Wash",
      templateId: 2
    }
  ]
};
const temp2 = {
  id: 2,
  name: "Column Chromatography Step",
  properties: [
    {
      name: "Name"
    },
    {
      name: "Description"
    },
    {
      name: "Linear Velocity"
    }
  ],
  relatedTemplates: []
};

function templatesById(state = {}, action) {
  return {
    1: temp1,
    2: temp2
  };
}

function templateIds(state = [], action) {
  return [1, 2];
}

export default combineReducers({
  templateInstancesById,
  templatesById,
  templateIds,
  templateGraphPath
});
