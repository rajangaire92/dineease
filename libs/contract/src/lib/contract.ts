import { initContract } from '@ts-rest/core';
import { userContract } from '../user/contract';

const c = initContract();

type ContractType = {
  user: typeof userContract;
};

export const contract: ContractType = c.router({
  user: userContract,
});
