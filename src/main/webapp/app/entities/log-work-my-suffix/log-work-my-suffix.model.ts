import { BaseEntity } from './../../shared';

export class LogWorkMySuffix implements BaseEntity {
    constructor(
        public id?: string,
        public logwork?: number,
        public description?: string,
    ) {
    }
}
