import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AzureADStrategy } from "./azure-ad.guard";

@Module({
  imports: [PassportModule],
  providers: [AzureADStrategy],
})
export class AuthModule {}
