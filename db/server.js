const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const { makeExecutableSchema } = require("graphql-tools");
// const { makeExecutableSchema } = require("@graphql-tools/schema");

const {merge } = require('lodash');

const courseTypeDefs = require("./typesD/course.types");
const courseResolvers = require("./resolvers/course.resolvers");

mongoose.connect("mongodb://localhost/graphql_db_course", { useNewUrlParser: true }); //ODM object data model

const app = express();
const port = 8080;

const typeDefs = `
type Course{
  id: ID!
  title: String!
  views: Int
}

type Alert{
   message: String
}

type Query{
   
    _ : Boolean
}

type Mutation {
    _ : Boolean
}

`;
const resolver = {};

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, courseTypeDefs],
  resolver: merge(resolver,courseResolvers)
});

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema: schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
