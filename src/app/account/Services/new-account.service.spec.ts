import { TestBed } from '@angular/core/testing';
import { NewAccountService } from './new-account.service';

describe('NewAccountService', () => {
  let service: NewAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
