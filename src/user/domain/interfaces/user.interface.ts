export interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

export interface UserProps extends CreateUserProps {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
