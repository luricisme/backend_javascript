import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController], // Khi mà dùng lệnh nest để tạo ra nó sẽ tự thêm vào đây luôn
    providers: [UsersService]
})
export class UsersModule {}
