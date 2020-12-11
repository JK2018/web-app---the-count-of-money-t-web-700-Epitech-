import { IStorageRbac } from 'nestjs-rbac';

export const RBAcStorage: IStorageRbac = {
    roles: ['user', 'admin'],
    permissions: {
        users: ['get', 'edit'],
        cryptos: ['create', 'update', 'delete'],
    },
    grants: {
        admin: [
            'users',
            'cryptos',
        ],
        user: [
            'users',
        ],
    },
    filters: {}
}