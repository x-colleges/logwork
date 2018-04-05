/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LogWorkTestModule } from '../../../test.module';
import { LogWorkMySuffixComponent } from '../../../../../../main/webapp/app/entities/log-work-my-suffix/log-work-my-suffix.component';
import { LogWorkMySuffixService } from '../../../../../../main/webapp/app/entities/log-work-my-suffix/log-work-my-suffix.service';
import { LogWorkMySuffix } from '../../../../../../main/webapp/app/entities/log-work-my-suffix/log-work-my-suffix.model';

describe('Component Tests', () => {

    describe('LogWorkMySuffix Management Component', () => {
        let comp: LogWorkMySuffixComponent;
        let fixture: ComponentFixture<LogWorkMySuffixComponent>;
        let service: LogWorkMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LogWorkTestModule],
                declarations: [LogWorkMySuffixComponent],
                providers: [
                    LogWorkMySuffixService
                ]
            })
            .overrideTemplate(LogWorkMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LogWorkMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LogWorkMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LogWorkMySuffix('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.logWorks[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
