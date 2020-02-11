export function createTemplateInstance(templateId) {
  let templateInstance = {
    id: new Date().toISOString(),
    templateId,
    propertyValues: [],
    relatedTemplateIds: []
  };

  storeInSession(templateInstance);
  return templateInstance;
}

function storeInSession(templateInstance) {
  let templateInstancesById =
    JSON.parse(sessionStorage.getItem("templateInstancesById")) || {};
  templateInstancesById[templateInstance.id] = templateInstance;
  sessionStorage.setItem(
    "templateInstancesById",
    JSON.stringify(templateInstancesById)
  );
}
