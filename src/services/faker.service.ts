import { faker } from "@faker-js/faker/locale/es";
import { UserProfile } from "../interfaces/mail.interface";

class FakerService {
  /**
   * Genera un perfil de usuario aleatorio
   * @returns Perfil de usuario con datos aleatorios
   */
  generateUserProfile(): UserProfile {
    const gender = faker.person.sex();
    const firstName = faker.person.firstName(
      gender === "male" ? "male" : "female"
    );
    const lastName = faker.person.lastName();
    const birthdate = faker.date.birthdate({ min: 18, max: 65, mode: "age" });

    // Generar avatar específico según el género usando personPortrait
    const avatar = faker.image.personPortrait({
      sex: gender === "male" ? "male" : "female",
      size: 512
    });

    return {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      gender,
      age: new Date().getFullYear() - birthdate.getFullYear(),
      birthdate: birthdate.toISOString().split("T")[0],
      avatar: avatar,
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
      phone: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      company: faker.company.name(),
    };
  }
}

export default new FakerService();
