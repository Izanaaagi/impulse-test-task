export interface UserAuthConfig {
  accessTokenSecret: string;
  accessTokenTTL: string;
  refreshTokenSecret: string;
  refreshTokenTTL: string;
  passwordSaltRounds: number;
}
