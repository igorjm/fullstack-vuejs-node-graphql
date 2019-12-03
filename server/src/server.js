const { ApolloServer } = require("apollo-server");
const dns = require('dns');
const service = require('./config/service');

const typeDefs = `
  type Item {
    id: Int
    type: String
    description: String
  }

  type Domain {
    name: String
    checkout: String
    available: Boolean
    extension: String
  }

  type Query {
    items (type: String): [Item]
  }

  input ItemInput {
    type: String
    description: String
  }

  type Mutation {
    saveItem (item: ItemInput): Item
    deleteItem (id: Int): Boolean
    generateDomains: [Domain]
    generateDomain(name: String): [Domain]
  }

`;

const isDomainAvailable = function(url) {
  return new Promise(function(resolve, reject) {
    dns.resolve(url, function(err) {
      if(error) {
        resolve(true)
      } else {
        resolve(false);
      }
    });
  });
};

const resolvers = {
  Query: {
    async items(_, args) {
      const items = await service.getItemByType(args.type);
      return items.filter(item => item.type === args.type);
    },
  },
  Mutation: {
    async saveItem(_, args) {
      const item = args.item;
      const [newItem] = await service.saveItem(item);
      return newItem;
    },
    async deleteItem(_, args) {
      const id = args.id;
      await service.deleteItem(id);
      return true;
    },
    async generateDomains() {
      const domains = [];
      const items = await service.getItems();

			for (const prefix of items.filter(item => item.type === "prefix")) {
				for (const sufix of items.filter(item => item.type === "sufix")) {
					const name = prefix.description + sufix.description;
					const url = name.toLowerCase();
          const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com.br`;
          const available = await isDomainAvailable(`${url}.com.br`);
					domains.push({
						name,
            checkout,
            available
					});
				}
      }
      return domains;
    },
    async generateDomain(_, args) {
      const name = args.name;
      const domains = []
      const extensions = [".com.br", ".com", ".net", ".org"];
      for(const extension of extensions) {
					const url = name.toLowerCase();
          const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=${extension}`;
          const available = await isDomainAvailable(`${url}${extension}`);
					domains.push({
						name,
            checkout,
            available,
            extension
					});
      }
      return domains;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen();