import { ReturnVinylRecord } from '../../../domain/use-cases/ReturnVinylRecord';
import { BorrowVinylRecord } from '../../../domain/use-cases/BorrowVinylRecord';
import { RegisterUser } from '../../../domain/use-cases/RegisterUser';
import { RegisterVinylRecord } from '../../../domain/use-cases/RegisterDenuncia';
import { MockLoanRepository } from '../../../infra/repositories/MockLoanRepository';
import { MockUserRepository } from '../../../infra/repositories/MockUserRepository';
import { MockVinylRecordRepository } from '../../../infra/repositories/MockVinylRecordRepository';

describe('ReturnVinylRecord', () => {
  it('should return a vinyl record', async () => {
    const userRepository = new MockUserRepository();
    const vinylRecordRepository = new MockVinylRecordRepository();
    const loanRepository = new MockLoanRepository();

    const registerUser = new RegisterUser(userRepository);
    const registerVinylRecord = new RegisterVinylRecord(vinylRecordRepository);
    const borrowVinylRecord = new BorrowVinylRecord(
      loanRepository,
      userRepository,
      vinylRecordRepository
    );
    const returnVinylRecord = new ReturnVinylRecord(loanRepository);

    const user = await registerUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      latitude: 40.7128,
      longitude: -74.006,
    });

    const vinylRecord = await registerVinylRecord.execute({
      band: 'The Beatles',
      album: 'Abbey Road',
      year: 1969,
      numberOfTracks: 17,
      photoUrl: 'https://example.com/abbey-road.jpg',
    });

    const loan = await borrowVinylRecord.execute({
      userId: user.id,
      vinylRecordId: vinylRecord.id,
    });

    const returnedLoan = await returnVinylRecord.execute({ loanId: loan.id });

    expect(returnedLoan.returnDate).toBeDefined();
  });

  it('should throw an error if the loan is not found', async () => {
    const loanRepository = new MockLoanRepository();
    const returnVinylRecord = new ReturnVinylRecord(loanRepository);

    await expect(returnVinylRecord.execute({ loanId: '1' })).rejects.toThrow(
      'Loan not found'
    );
  });
});
