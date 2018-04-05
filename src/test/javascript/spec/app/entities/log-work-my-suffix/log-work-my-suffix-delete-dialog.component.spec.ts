/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LogWorkTestModule } from '../../../test.module';
import { LogWorkMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/log-work-my-suffix/log-work-my-suffix-delete-dialog.component';
import { LogWorkMySuffixService } from '../../../../../../main/webapp/app/entities/log-work-my-suffix/log-work-my-suffix.service';

describe('Component Tests', () => {

    describe('LogWorkMySuffix Management Delete Component', () => {
        let comp: LogWorkMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<LogWorkMySuffixDeleteDialogComponent>;
        let service: LogWorkMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LogWorkTestModule],
                declarations: [LogWorkMySuffixDeleteDialogComponent],
                providers: [
                    LogWorkMySuffixService
                ]
            })
            .overrideTemplate(LogWorkMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LogWorkMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LogWorkMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete('123');
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith('123');
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
