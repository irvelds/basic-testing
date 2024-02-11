// Uncomment the code below and write your tests
import { getBankAccount, BankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';
import lodash from 'lodash';

const BALANCE = 300;

let account: ReturnType<typeof getBankAccount>;

beforeEach((): void => {
  account = getBankAccount(BALANCE);
});

describe('BankAccount', () => {

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(BALANCE + 10))
      .toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const toAccount: BankAccount = getBankAccount(BALANCE);
    const amount = account.getBalance() + 10;
    expect(() => account.transfer(amount, toAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const amount = account.getBalance();
    expect(() => account.transfer(amount, account))
      .toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const summaOfDeposit = 50;
    const currentAmount = account.getBalance();
    expect(account.deposit(summaOfDeposit).getBalance()).toBe(
      currentAmount + summaOfDeposit
    )
  });

  test('should withdraw money', () => {
    const summaOfWithdrawn = 50;
    const currentAmount = account.getBalance();
    expect(account.withdraw(summaOfWithdrawn).getBalance()).toBe(
      currentAmount - summaOfWithdrawn
    )
  });

  test('should transfer money', () => {
    // Write your test here
    const summaOfTransfer = 50;
    const toAccount: BankAccount = getBankAccount(BALANCE);
    expect(account.transfer(summaOfTransfer, toAccount).getBalance()).toBe(BALANCE - summaOfTransfer)
    expect(toAccount.getBalance()).toBe(BALANCE + summaOfTransfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const summaOffetchBalance = 10;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(summaOffetchBalance);
    expect(await account.fetchBalance()).toEqual(expect.any(Number));
    jest.spyOn(lodash, 'random').mockReturnValue(summaOffetchBalance);
    expect(await account.fetchBalance()).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const summaOffetchBalance = 10;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(summaOffetchBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(summaOffetchBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    expect(async () => await account.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError);
  });
});