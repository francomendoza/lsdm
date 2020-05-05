export const createAndViewTemplateInstance = templateInstance => {
  return {
    type: "NEW_TEMPLATE_INSTANCE",
    templateInstance
  };
};

export const updatePropertyValues = (templateInstanceId, index, value) => {
  return {
    type: "UPDATE_PROPERTY_VALUES",
    templateInstanceId,
    index,
    value
  };
};
