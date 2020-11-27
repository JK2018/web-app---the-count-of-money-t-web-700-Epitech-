import { UserModule } from './../user/user.module';
import { Crypto } from './entities/crypto.entity';
import { Module, forwardRef } from '@nestjs/common';
import { CryptoService } from './service/crypto.service';
import { CryptoController } from './controller/crypto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Crypto]),
    forwardRef(() => UserModule)
  ],
  controllers: [CryptoController],
  providers: [CryptoService],
  exports: [CryptoService]
})
export class CryptoModule {}
