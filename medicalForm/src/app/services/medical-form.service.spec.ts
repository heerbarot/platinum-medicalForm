import { TestBed } from '@angular/core/testing';

import { MedicalFormService } from './medical-form.service';

describe('MedicalFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicalFormService = TestBed.get(MedicalFormService);
    expect(service).toBeTruthy();
  });
});
