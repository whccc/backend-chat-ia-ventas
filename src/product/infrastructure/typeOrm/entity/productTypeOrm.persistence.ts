import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PRODUCT')
export class ProductTypeOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'ID' })
  id: number = 0;

  @Column({ type: 'varchar', length: 100, name: 'CODE', unique: true })
  code: string = '';

  @Column({ type: 'varchar', length: 100, name: 'NAME', unique: true })
  name: string = '';

  @Column({ type: 'varchar', length: 400, name: 'DESCRIPTION', nullable: true })
  description: string = '';

  @Column({ type: 'int', name: 'STOCK' })
  stock: number = 0;

  @Column({ type: 'int', name: 'PRICE' })
  price: number = 0;
}
