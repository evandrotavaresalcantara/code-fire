import { Errors } from "@/core/constants";
import { Email } from "@/core/model/valueObjects";

test("Deve aceitar um email correto", () => {
  const email = new Email("teste@email.com");
  expect(email).toBeInstanceOf(Email);
  expect(email.domain).toBe("email.com");
  expect(email.user).toBe("teste");
  expect(email.getValue()).toBe("teste@email.com");
});

test("Deve lançar erro EMAIL_INVALIDO", () => {
  expect(() => new Email("teste@email")).toThrow(
    new Error(Errors.EMAIL_INVALIDO)
  );
  expect(() => new Email("teste.email")).toThrow(
    new Error(Errors.EMAIL_INVALIDO)
  );
  expect(() => new Email("@email.com")).toThrow(
    new Error(Errors.EMAIL_INVALIDO)
  );
  expect(() => new Email("teste@email.c")).toThrow(
    new Error(Errors.EMAIL_INVALIDO)
  );
});
