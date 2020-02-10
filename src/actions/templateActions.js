export const createAndViewTemplateInstance = (
  templateId,
  parentTemplateInstanceId
) => {
  return {
    type: "NEW_TEMPLATE_INSTANCE",
    templateId,
    templateInstanceId: new Date().toISOString(),
    parentTemplateInstanceId
  };
};
