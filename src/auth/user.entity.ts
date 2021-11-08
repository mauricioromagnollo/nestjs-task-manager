import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

const USER_TABLE_NAME = 'USER';

@Entity({ name: USER_TABLE_NAME })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
