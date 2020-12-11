import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CryptoService } from "../../crypto/service/crypto.service";

describe('UserService', () => {
  let userService: UserService;
  let cryptoService: CryptoService;
  // let userRepo: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [TypeOrmModule.forFeature([User])],
      providers: [
        UserService,
        // { provide: userRepo , useFactory: repositoryMockFactory }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    cryptoService = module.get<CryptoService>(CryptoService);
    // userRepo = module.get<Repository<User>>(Repository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(cryptoService).toBeDefined();
    // expect(userRepo).toBeDefined();
  });
});
