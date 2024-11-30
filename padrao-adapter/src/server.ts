import fastify from 'fastify'
import { UserRepositoryPrisma } from './repositories/user-respository-prisma.js';
import { UserRepository } from './repositories/user-respository.js';
const app = fastify();

const userRepositoryPrisma = new UserRepositoryPrisma();
const userRepository = new UserRepository(userRepositoryPrisma); 

// const userRepositoryInMemory = new UserRepositoryInMemory();
// const userRepository = new UserRepository(userRepositoryInMemory); 

app.get('/', () => {
  return "Hello"
})

app.post('/user', async () => {
  await userRepository.addUser({ name: "Daniel", email: "danielalmeida@gmail.com" })
})

app.listen({ port: 3000 }, () => {
  console.log("Serve run on the port 3000")
})
