import { TemplateInstance } from "../reducers";

export const NEW_TEMPLATE_INSTANCE = "NEW_TEMPLATE_INSTANCE";
export const UPDATE_PROPERTY_VALUES = "UPDATE_PROPERTY_VALUES";

interface CreateViewTemplateInstanceAction {
  type: typeof NEW_TEMPLATE_INSTANCE;
  templateInstance: TemplateInstance;
}

interface UpdatePropertyValuesAction {
  type: typeof UPDATE_PROPERTY_VALUES;
  templateInstanceId: string;
  index: number;
  value: string;
}

export type TemplateActionTypes =
  | CreateViewTemplateInstanceAction
  | UpdatePropertyValuesAction;

export const createAndViewTemplateInstance = (
  templateInstance: TemplateInstance
): TemplateActionTypes => {
  return {
    type: NEW_TEMPLATE_INSTANCE,
    templateInstance,
  };
};

export const updatePropertyValues = (
  templateInstanceId: string,
  index: number,
  value: string
): TemplateActionTypes => {
  return {
    type: UPDATE_PROPERTY_VALUES,
    templateInstanceId,
    index,
    value,
  };
};
