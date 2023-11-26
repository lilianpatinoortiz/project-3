const typeDefs = `
  type Auth {
    token: ID
    user: User
  }
  type Reminder {
    _id: ID
    description: String
    dueDate: String
  }

  type Task {
    _id: ID
    description: String
    createdDate: String
    dueDate: String
    priority: Int
    status: String
    reminders: [Reminder]
  }

  type Project {
    _id: ID
    description: String
    createdDate: String
    dueDate: String 
    tasks: [Task]
  }
  type User {
    _id: ID
    name: String
    email: String
    password: String
    projects: [Project]
    tasks: [Task]
  }
  

  type Query {
    user: User,
    project: Project,
    task: Task,
    reminder: Reminder
  }
  type Mutation{
    createUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  
  }
  
  `;
module.exports = typeDefs;
