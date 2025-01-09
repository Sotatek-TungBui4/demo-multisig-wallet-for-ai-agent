import { IsNotEmpty } from 'class-validator';

export class NewTransactionMessageDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  txHash: string;

  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  txIndex: number | bigint | string;

  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  value: number | bigint | string;

  @IsNotEmpty()
  data: string;

  @IsNotEmpty()
  blockNumber: number | bigint | string;
}
