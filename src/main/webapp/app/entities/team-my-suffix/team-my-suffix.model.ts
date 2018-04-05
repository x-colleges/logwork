import { BaseEntity } from './../../shared';

export class TeamMySuffix implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
    ) {
    }
}
