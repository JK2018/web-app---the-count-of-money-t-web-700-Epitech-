import { User } from './../user/models/user.entity';
import Faker from "faker";
import {define} from "typeorm-seeding";

define(User, (faker: typeof Faker) => {
    const user = new User()
    user.currency = "eur";
    user.password = "test";
    user.email = faker.internet.email();
    user.lastName = faker.name.lastName();
    user.firstName = faker.name.firstName();
    user.username = faker.name.firstName();
    return user
})