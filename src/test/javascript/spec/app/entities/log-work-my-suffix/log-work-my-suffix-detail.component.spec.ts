/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LogWorkTestModule } from '../../../test.module';
import { LogWorkMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/log-work-my-suffix/log-work-my-suffix-detail.component';
import { LogWorkMySuffixService } from '../../../../../../main/webapp/app/entities/log-work-my-suffix/log-work-my-suffix.service';
import { LogWorkMySuffix } from '../../../../../../main/webapp/app/entities/log-work-my-suffix/log-work-my-suffix.model';

describe('Component Tests', () => {

    describe('LogWorkMySuffix Management Detail Component', () => {
        let comp: LogWorkMySuffixDetailComponent;
        let fixture: ComponentFixture<LogWorkMySuffixDetailComponent>;
        let service: LogWorkMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LogWorkTestModule],
                declarations: [LogWorkMySuffixDetailComponent],
                providers: [
                    LogWorkMySuffixService
                ]
            })
            .overrideTemplate(LogWorkMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LogWorkMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LogWorkMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LogWorkMySuffix('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.logWork).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
