import { UserRepositoryMongodbAdapter } from "@/adapters";
import { DatabaseConnectionMongodbAdapter } from "@/adapters/database/mongoose";
import { RegisterNewUser } from "@/core/useCases/";

let databaseConnection: DatabaseConnectionMongodbAdapter;

beforeAll(() => {
  databaseConnection = new DatabaseConnectionMongodbAdapter();
});

afterAll(async () => {
  await databaseConnection.close();
});

test("Deve registrar um novo usuario no Bucket e retornar com sua apiKey", async () => {
  const userRepository = new UserRepositoryMongodbAdapter(databaseConnection);
  const registerNerUser = new RegisterNewUser(userRepository);
  const input = {
    name: "Pedro Maurício",
    email: "pedro5@zmail.com",
  };
  const user = await registerNerUser.execute(input);
  await userRepository.deleteByEmail(user.email);
  expect(user).toBeDefined();
});
