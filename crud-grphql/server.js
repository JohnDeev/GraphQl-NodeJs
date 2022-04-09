const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

let courses = require("./courses");

const app = express();

const schema = buildSchema(`
type Course{
        id: ID!
        title: String!
        views: Int
    }

    type Alert{
         message: String
    }

    input CourseInput {
        title: String!
        views: Int
         
    }    

    type Query{
    getCourses(page: Int, limit: Int = 1): [Course]
    getCourse(id:ID!): Course
    }

    type Mutation {
        addCourse(input: CourseInput): Course
        updateCourse(id: ID!,input: CourseInput): Course
        deleteCourse(id: ID!): Alert
    }
`);

const root = {
  getCourses({ page, limit }) {
    if (page !== undefined) {
      console.log(courses);
      return courses.slice((page - 1) * limit, page * limit);
    } else {
      return courses;
    }
  },

  getCourse({ id }) {
    console.log(id);
    return (course = courses.find((course) => id === course.id));
  },
  addCourse({ input }) {
    const id = String(courses.length + 1);
    const course = { id, ...input };
    courses.push(course);
    return course;
  },
  updateCourse({ id, input }) {
    const courseIndex = courses.findIndex((course) => id === course.id);
    const course = courses[courseIndex];

    const newCourse = Object.assign(course, input);
    return (course[courseIndex] = newCourse);
  },
  deleteCourse({ id }) {
    courses = courses.filter((course) => id !== course.id);
    return {
      message: `El curso con id: ${id} fue eliminado `,
    };
  },
};

app.get("/", (req, res) => {
  res.json(courses);
});

//middleware
app.use(
  "/graphiql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(8080, (req, res) => {
  console.log("Servidor iniciado");
});
