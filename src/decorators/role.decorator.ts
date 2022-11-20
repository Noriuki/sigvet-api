import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/types';

export const ROLE_KEY = 'ROLE';
export const Role = (role: Roles) => SetMetadata(ROLE_KEY, role);
