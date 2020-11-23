import { Module } from '@nestjs/common';
import { CryptoService } from './service/crypto.service';
import { CryptoController } from './controller/crypto.controller';

@Module({
  controllers: [CryptoController],
  providers: [CryptoService]
})
export class CryptoModule {}
