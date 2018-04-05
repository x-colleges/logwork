import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LogWorkMySuffix } from './log-work-my-suffix.model';
import { LogWorkMySuffixPopupService } from './log-work-my-suffix-popup.service';
import { LogWorkMySuffixService } from './log-work-my-suffix.service';

@Component({
    selector: 'jhi-log-work-my-suffix-delete-dialog',
    templateUrl: './log-work-my-suffix-delete-dialog.component.html'
})
export class LogWorkMySuffixDeleteDialogComponent {

    logWork: LogWorkMySuffix;

    constructor(
        private logWorkService: LogWorkMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.logWorkService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'logWorkListModification',
                content: 'Deleted an logWork'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-log-work-my-suffix-delete-popup',
    template: ''
})
export class LogWorkMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private logWorkPopupService: LogWorkMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.logWorkPopupService
                .open(LogWorkMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
