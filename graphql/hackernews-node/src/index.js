const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length;
// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    age: () => [12],
    feed: () => links
  },
  Mutation:{
    post: (parent, args)=>{
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link
    }
  }
}


// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))