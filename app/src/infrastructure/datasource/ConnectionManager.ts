import { EntityManager } from 'typeorm';
export interface ConnectionManager {
    manager(): EntityManager;
}
