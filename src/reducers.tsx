import { combineReducers } from "redux";
import {
  TemplateActionTypes,
  NEW_TEMPLATE_INSTANCE,
  UPDATE_PROPERTY_VALUES,
} from "./actions/templateActions";

const initialTemplateInstancesById: TemplateInstancesById = {};

function templateInstancesById(
  state = initialTemplateInstancesById,
  action: TemplateActionTypes
): TemplateInstancesById {
  switch (action.type) {
    case NEW_TEMPLATE_INSTANCE:
      return {
        ...state,
        [action.templateInstance.id]: action.templateInstance,
      };
    case UPDATE_PROPERTY_VALUES:
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

const initialTemplateInstance: TemplateInstance = {
  id: "",
  templateId: "",
  propertyValues: [],
  relatedTemplateIds: [],
};

function templateInstance(
  state = initialTemplateInstance,
  action: TemplateActionTypes
): TemplateInstance {
  switch (action.type) {
    case UPDATE_PROPERTY_VALUES:
      let newPropertyValues = [...state.propertyValues];
      newPropertyValues[action.index] = action.value;
      return { ...state, propertyValues: newPropertyValues };
    default:
      return state;
  }
}

function templateGraphPath(state = [], action: TemplateActionTypes) {
  switch (action.type) {
    case NEW_TEMPLATE_INSTANCE:
      let path = [...state, action.templateInstance.id];
      return path;
    default:
      return state;
  }
}

function templatesById(state = {}, action: TemplateActionTypes) {
  return state;
}

function templateIds(state = [], action: TemplateActionTypes) {
  return state;
}

export default combineReducers({
  templateInstancesById,
  templatesById,
  templateIds,
  templateGraphPath,
});

export interface RootState {
  templateInstancesById: TemplateInstancesById;
  templatesById: TemplatesById;
  templateIds: string[];
  templateGraphPath: string[];
}

interface TemplateInstancesById {
  [id: string]: TemplateInstance;
}

export interface TemplateInstance {
  id: string;
  templateId: string;
  propertyValues: string[];
  relatedTemplateIds: string[];
}

interface Template {
  id: string;
  name: string;
}

export interface TemplatesById {
  [id: string]: Template;
}
