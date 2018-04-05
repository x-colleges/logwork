import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LogWorkMySuffix } from './log-work-my-suffix.model';
import { LogWorkMySuffixPopupService } from './log-work-my-suffix-popup.service';
import { LogWorkMySuffixService } from './log-work-my-suffix.service';

@Component({
    selector: 'jhi-log-work-my-suffix-dialog',
    templateUrl: './log-work-my-suffix-dialog.component.html'
})
export class LogWorkMySuffixDialogComponent implements OnInit {

    logWork: LogWorkMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private logWorkService: LogWorkMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.logWork.id !== undefined) {
            this.subscribeToSaveResponse(
                this.logWorkService.update(this.logWork));
        } else {
            this.subscribeToSaveResponse(
                this.logWorkService.create(this.logWork));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LogWorkMySuffix>>) {
        result.subscribe((res: HttpResponse<LogWorkMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LogWorkMySuffix) {
        this.eventManager.broadcast({ name: 'logWorkListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-log-work-my-suffix-popup',
    template: ''
})
export class LogWorkMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private logWorkPopupService: LogWorkMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.logWorkPopupService
                    .open(LogWorkMySuffixDialogComponent as Component, params['id']);
            } else {
                this.logWorkPopupService
                    .open(LogWorkMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
