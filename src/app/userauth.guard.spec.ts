import { TestBed, async, inject } from '@angular/core/testing';

import { UserAuthGuard } from './userauth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthGuard]
    });
  });

  it('should ...', inject([UserAuthGuard], (guard: UserAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
