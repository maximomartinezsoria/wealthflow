interface BalanceCreatorDtoBase {
  id: string;
  name: string;
  amount: number;
  userId: string;
  color: string;
}

export type BalanceCreatorDto = BalanceCreatorDtoBase[];
