import { TestBed } from '@angular/core/testing';

import { AdminTestimonyService } from './admin-testimony.service';

describe('AdminTestimonyService', () => {
  let service: AdminTestimonyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTestimonyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
