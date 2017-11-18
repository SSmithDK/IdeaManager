import { TestBed, async, inject } from '@angular/core/testing';

import {ManagerAuthGuard} from './managerauth.guard';

describe('ManagerAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerAuthGuard]
    });
  });

  it('should ...', inject([ManagerAuthGuard], (guard: ManagerAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
