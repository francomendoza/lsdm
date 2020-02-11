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
  let templateInstances =
    JSON.parse(sessionStorage.getItem("templateInstances")) || [];
  templateInstances.push(templateInstance);
  sessionStorage.setItem(
    "templateInstances",
    JSON.stringify(templateInstances)
  );
}
