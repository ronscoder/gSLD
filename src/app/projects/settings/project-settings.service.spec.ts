import { TestBed, inject } from '@angular/core/testing';

import { ProjectSettingsService } from './project-settings.service';

describe('ProjectSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectSettingsService]
    });
  });

  it('should ...', inject([ProjectSettingsService], (service: ProjectSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
