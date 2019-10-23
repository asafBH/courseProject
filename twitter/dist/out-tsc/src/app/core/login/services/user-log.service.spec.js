import { TestBed } from '@angular/core/testing';
import { UserLogService } from './user-log.service';
describe('UserLogService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(UserLogService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=user-log.service.spec.js.map