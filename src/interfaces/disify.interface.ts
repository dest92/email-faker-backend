export interface DisifyResponse {
  email: string;
  domain: string;
  disposable: boolean;
  dns: boolean;
  format: boolean;
  whitelisted: boolean;
  deliverable: boolean;
  spam: boolean;
}