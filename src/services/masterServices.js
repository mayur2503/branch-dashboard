import API from "../utils/api";

const addCourse = async (course) => {
  const response = await API.post("/course", {
    course: course,
  });
  return response;
};

const getCourses = async () => {
  const response = await API.get("/course");
  return response;
};

const deleteCourse = async (id) => {
  const response = await API.post("/course/delete/" + id);
  return response;
};

const editCourse = async (course) => {
  const response = await API.post("/course/edit/" + course.course_id, {
    course: course.course,
  });
  return response;
};

const addDepartment = async (department) => {
    const response = await API.post("/department", {
      // course_id: department.course_id,
      department:department.department
    });
    return response;
  };

const getDepartments = async (course_id=0) => {
  const response = await API.get("/department/"+course_id);
  return response;
};

const deleteDepartment = async (id) => {
    const response = await API.post("/department/delete/" + id);
    return response;
  };

const editDepartment = async (department) => {
  const response = await API.post("/department/edit/" + department.dept_id, {
    // course_id: department.course_id,
    department: department.department,
  });
  return response;
};

const profile = async () => {
  const response = await API.post("/profile");
  return response;
};

const updateBasicDetails = async (data) => {
  const response = await API.post("/profileupdate/index_post/basic_details", {
    height: data.height,
    weight: data.weight,
    body_type: data.body_type,
    marital_status: data.marital_status,
    physical_status: data.physical_status,
    eating_habbit: data.eating_habbit,
    drinking_habbit: data.drinking_habbit,
    smoking_habbit: data.smoking_habbit,
    about_me: data.about_me,
  });
  return response;
};

const updateReligionDetails = async (data) => {
  const response = await API.post(
    "/profileupdate/index_post/religion_details",
    {
      caste: data.caste,
      subcaste: data.subcaste,
      no_castebar: data.no_castebar,
      gothrams: data.gothrams,
      star: data.star,
      raasi: data.raasi,
      zodiac: data.zodiac,
      dosh: data.dosh,
    }
  );
  return response;
};

const getRegistrationTrack = async () => {
  const response = await API.post(
    "/profileupdate/index_post/registration_track"
  );
  return response;
};

export const masterServices = {
  addCourse,
  getCourses,
  deleteCourse,
  editCourse,
  addDepartment,
  getDepartments,
  editDepartment,
  deleteDepartment
};
