import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LogWorkMySuffix } from './log-work-my-suffix.model';
import { LogWorkMySuffixService } from './log-work-my-suffix.service';

@Component({
    selector: 'jhi-log-work-my-suffix-detail',
    templateUrl: './log-work-my-suffix-detail.component.html'
})
export class LogWorkMySuffixDetailComponent implements OnInit, OnDestroy {

    logWork: LogWorkMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private logWorkService: LogWorkMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLogWorks();
    }

    load(id) {
        this.logWorkService.find(id)
            .subscribe((logWorkResponse: HttpResponse<LogWorkMySuffix>) => {
                this.logWork = logWorkResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLogWorks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'logWorkListModification',
            (response) => this.load(this.logWork.id)
        );
    }
}
