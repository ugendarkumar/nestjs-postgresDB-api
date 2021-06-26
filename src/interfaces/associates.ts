import { Specialization } from './specialization';

export interface Associate {
  associate_id: string;
  associate_name: string;
  phone: string;
  address_val: string;
  is_active: boolean;
  specialization: Specialization[];
}
