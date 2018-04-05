import { BaseEntity } from './../../shared';

export class ProjectMySuffix implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
    ) {
    }
}
