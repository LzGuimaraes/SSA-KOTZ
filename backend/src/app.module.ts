import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './common/health/health.controller';
import { validateEnvironment } from './config/environment';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { BuildsModule } from './modules/builds/builds.module';
import { CosmosModule } from './modules/cosmos/cosmos.module';
import { CreatorsModule } from './modules/creators/creators.module';
import { GuidesModule } from './modules/guides/guides.module';
import { KnightsModule } from './modules/knights/knights.module';
import { MediaModule } from './modules/media/media.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnvironment }),
    PrismaModule,
    AuthModule,
    UsersModule,
    KnightsModule,
    CosmosModule,
    BuildsModule,
    CreatorsModule,
    GuidesModule,
    AdminModule,
    MediaModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
