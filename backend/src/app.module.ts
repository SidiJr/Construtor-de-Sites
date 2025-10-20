import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ComponenteModule } from './componente/componente.module';
import { SiteModule } from './site/site.module';
import { PaginaModule } from './pagina/pagina.module';

@Module({
  imports: [
    PrismaModule,
    UsuariosModule,
    AuthModule,
    ComponenteModule,
    SiteModule,
    PaginaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
