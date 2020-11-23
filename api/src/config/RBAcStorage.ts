import { IStorageRbac } from 'nestjs-rbac';

export const RBAcStorage: IStorageRbac = {
    roles: ['user', 'admin'],
    permissions: {
        users: ['get', 'edit'],
        cryptos: ['get', 'getPriceHistory', 'create', 'delete'],
    },
    grants: {
        admin: [
            'users',
            'cryptos',
        ],
        user: [
            'users',
            'cryptos@get',
            'cryptos@getPriceHistory'
        ],
    },
    filters: {}
}