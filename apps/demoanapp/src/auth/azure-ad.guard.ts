import { Injectable } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { BearerStrategy } from "passport-azure-ad";

const clientID = "7d74172c-4113-400f-8ea2-dbecc67a52e9";
const tenantID = "12ead190-3969-480f-9e32-fa073348f07c";

/**
 * Extracts ID token from header and validates it.
 */
@Injectable()
export class AzureADStrategy extends PassportStrategy(BearerStrategy, "azure-ad") {
  constructor() {
    super({
      identityMetadata: `https://login.microsoftonline.com/${tenantID}/v2.0/.well-known/openid-configuration`,
      clientID,
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async validate(data: any): Promise<any> {
    return data;
  }
}

export const AzureADGuard = AuthGuard("azure-ad");
