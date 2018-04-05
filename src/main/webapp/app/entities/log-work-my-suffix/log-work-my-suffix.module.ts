import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LogWorkSharedModule } from '../../shared';
import {
    LogWorkMySuffixService,
    LogWorkMySuffixPopupService,
    LogWorkMySuffixComponent,
    LogWorkMySuffixDetailComponent,
    LogWorkMySuffixDialogComponent,
    LogWorkMySuffixPopupComponent,
    LogWorkMySuffixDeletePopupComponent,
    LogWorkMySuffixDeleteDialogComponent,
    logWorkRoute,
    logWorkPopupRoute,
} from './';

const ENTITY_STATES = [
    ...logWorkRoute,
    ...logWorkPopupRoute,
];

@NgModule({
    imports: [
        LogWorkSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LogWorkMySuffixComponent,
        LogWorkMySuffixDetailComponent,
        LogWorkMySuffixDialogComponent,
        LogWorkMySuffixDeleteDialogComponent,
        LogWorkMySuffixPopupComponent,
        LogWorkMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        LogWorkMySuffixComponent,
        LogWorkMySuffixDialogComponent,
        LogWorkMySuffixPopupComponent,
        LogWorkMySuffixDeleteDialogComponent,
        LogWorkMySuffixDeletePopupComponent,
    ],
    providers: [
        LogWorkMySuffixService,
        LogWorkMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LogWorkLogWorkMySuffixModule {}
