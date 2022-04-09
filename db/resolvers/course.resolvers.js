const Course = require('../models/course');
module.exports = {
  Query: {
    async getCourses(obj, { page, limit }) {
     const courses = await Course.find();
     
      return courses;
    },

    getCourse(obj, { id }) {
      console.log(id);
      return (course = courses.find((course) => id === course.id));
    },
  },
  Mutation: {
    async addCourse( { input }) {
      const course = new Course({ input });
      await course.save();
      return course;
    },

    updateCourse(obj, { id, input }) {
      const courseIndex = courses.findIndex((course) => id === course.id);
      const course = courses[courseIndex];

      const newCourse = Object.assign(course, input);
      return (course[courseIndex] = newCourse);
    },

    deleteCourse(obj, { id }) {
      courses = courses.filter((course) => id !== course.id);
      return {
        message: `El curso con id: ${id} fue eliminado `,
      };
    },
  },
};
