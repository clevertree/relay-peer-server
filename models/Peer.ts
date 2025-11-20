import {
  Table,
  Column,
  Model,
  DataType,
  Index,
  PrimaryKey,
  AutoIncrement,
  Unique,
  UpdatedAt,
  CreatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'peer', timestamps: true })
export class Peer extends Model<Peer> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @Index
  @Column({ type: DataType.STRING, allowNull: false })
  socket!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}
