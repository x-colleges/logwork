import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LogWorkTeamMySuffixModule } from './team-my-suffix/team-my-suffix.module';
import { LogWorkProjectMySuffixModule } from './project-my-suffix/project-my-suffix.module';
import { LogWorkLogWorkMySuffixModule } from './log-work-my-suffix/log-work-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        LogWorkTeamMySuffixModule,
        LogWorkProjectMySuffixModule,
        LogWorkLogWorkMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LogWorkEntityModule {}
