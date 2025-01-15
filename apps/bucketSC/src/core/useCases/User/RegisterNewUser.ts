import { UseCase, UserRepository } from "../../Providers";
import { User } from "../../model";

interface Input {
  name: string;
  email: string;
}

interface Output extends Input {
  apiKey: string;
  id: string;
}

export class RegisterNewUser implements UseCase<Input, Promise<Output>> {
  constructor(private userRepository: UserRepository) {}
  async execute(input: Input) {
    // const secretKey = crypto.randomBytes(32).toString("hex");
    // console.log(`Chave secreta gerada: ${secretKey}`);
    // const token = crypto.randomBytes(48).toString("hex");
    // console.log(`Token gerado: ${token}`);
    const user = User.register(input.name, input.email);
    const userIdCreated = await this.userRepository.create(user);
    // const newUser = new userModel({
    //   name: input.name,
    //   email: input.email,
    //   apiKey,
    // });
    // await newUser.save();
    return {
      name: user.getName(),
      email: user.getEmail(),
      apiKey: user.getApiKey(),
      id: userIdCreated,
    };
  }
}
