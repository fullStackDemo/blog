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
    feed: () => links,
    link: (id) => links.find(n => n.id == id) 
  },
  Mutation:{
    post: (parent, args)=>{
      console.log(parent, args);     
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    deleteLink: (parent, args)=>{
      console.log(parent, args);
      if(links.length){
        const index = links.findIndex(n=> n.id == args.id);
        console.log(index)
        links.splice(index, 1)
      }
      return links;
    },
    updateLink: (parent, args)=>{
      links.forEach(n => {
        if(n.id == args.id){
          n.url = args.url ? args.url : n.url;
          n.description = args.description ? args.description : n.description;
        }
      });
      return links;
    }
    
  }
}


// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))