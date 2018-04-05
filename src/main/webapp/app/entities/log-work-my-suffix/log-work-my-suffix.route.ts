import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LogWorkMySuffixComponent } from './log-work-my-suffix.component';
import { LogWorkMySuffixDetailComponent } from './log-work-my-suffix-detail.component';
import { LogWorkMySuffixPopupComponent } from './log-work-my-suffix-dialog.component';
import { LogWorkMySuffixDeletePopupComponent } from './log-work-my-suffix-delete-dialog.component';

export const logWorkRoute: Routes = [
    {
        path: 'log-work-my-suffix',
        component: LogWorkMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'logWorkApp.logWork.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'log-work-my-suffix/:id',
        component: LogWorkMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'logWorkApp.logWork.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const logWorkPopupRoute: Routes = [
    {
        path: 'log-work-my-suffix-new',
        component: LogWorkMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'logWorkApp.logWork.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'log-work-my-suffix/:id/edit',
        component: LogWorkMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'logWorkApp.logWork.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'log-work-my-suffix/:id/delete',
        component: LogWorkMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'logWorkApp.logWork.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
