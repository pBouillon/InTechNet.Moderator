import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  const key = 'Test key';
  const data = 'Test data';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  afterEach(() => {
    localStorage.removeItem(key);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store an item on `store`', () => {
    const initialSize = localStorage.length;

    service.store(key, data);
    const actualSize = localStorage.length;

    expect(actualSize).toEqual(initialSize + 1);
  });

  it('should remove an item on `clear`', () => {
    localStorage.setItem(key, data);
    const initialSize = localStorage.length;

    service.clear(key);

    const actualSize = localStorage.length;

    expect(actualSize).toEqual(initialSize - 1);
  });

  it('should retrieve an item on `get`', () => {
    localStorage.setItem(key, data);

    const actual = service.get(key);

    expect(actual).toEqual(data);
  });
});
