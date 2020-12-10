import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { AuthService } from "../../auth/service/auth.service";
import { UserService } from "../service/user.service";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { User } from "../models/user.entity";

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [TypeOrmModule.forFeature([User])],
      controllers: [UserController],
      providers: [UserService, AuthService]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(authService).toBeDefined();
  });

  // describe('login', () => {
  //   it('should return an access token', async () => {
  //     const result = { accessToken: 'accessToken' };
  //
  //     // jest.spyOn(authService, 'login')
  //     expect(await controller.login({})).toBe(result);
  //   })
  // })
});
