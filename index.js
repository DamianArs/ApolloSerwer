const { ApolloServer, gql } = require("apollo-server");
const { readFileSync } = require("fs");
const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];
const resolvers = {
  Query: {
    allBooks: () => books,
  },
  Mutation: {
    createBook: async (parent, args) => {
      const book = { title: args.title, author: args.author };
      books.push(book);
      return book;
    },
  },
};
const server = new ApolloServer({
  typeDefs: gql`
    ${readFileSync(__dirname.concat("/schema.graphql"), "utf8")}
  `,
  resolvers,
});
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
