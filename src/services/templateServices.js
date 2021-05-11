import API from "../utils/api";

const getTemplates = async (course) => {
  const response = await API.get("/template");
  return response;
};

const getTemplate = async (id) => {
  const response = await API.post("/template/get/"+id);
  return response;
};

const addTemplate = async (template) => {
  const response = await API.post("/template", template);
  return response;
};

export const templateServices = {
  addTemplate,
  getTemplates,
  getTemplate
};
