export interface Domain {
  id: string;
  domain: string;
  isActive: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  address: string;
  quota: number;
  used: number;
  isDisabled: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthToken {
  id: string;
  token: string;
}

export interface VerifiedEmail {
  email: string;
  password: string;
  token: string;
  isVerified: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  age: number;
  birthdate: string;
  avatar: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone: string;
  occupation: string;
  company: string;
}

export interface EmailResponse {
  disposableDetected: boolean;
  data: VerifiedEmail;
  userProfile: UserProfile;
  domains: Domain[];
  attempts: number;
}

export interface Message {
  id: string;
  accountId: string;
  msgid: string;
  from: {
    address: string;
    name: string;
  };
  to: {
    address: string;
    name: string;
  }[];
  subject: string;
  intro: string;
  text: string;
  html: string;
  hasAttachments: boolean;
  attachments: Attachment[];
  size: number;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  isRead: boolean;
}

export interface Attachment {
  id: string;
  filename: string;
  contentType: string;
  disposition: string;
  transferEncoding: string;
  related: boolean;
  size: number;
  downloadUrl: string;
}

export interface MessageList {
  'hydra:member': Message[];
  'hydra:totalItems': number;
}