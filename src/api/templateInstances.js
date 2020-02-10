export function createTemplateInstance(templateId) {
  return {
    id: new Date().toISOString(),
    templateId,
    propertyValues: [],
    relatedTemplateIds: []
  };
}
