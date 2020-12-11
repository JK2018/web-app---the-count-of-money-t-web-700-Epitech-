import { User, UserRole } from './../user/models/user.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class CreateUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                { firstName: 'admin', lastName: 'admin', password: '$2b$10$hlKHHwKCglZf9whoys4HKu3Kq/ifyExaS7IjGLURZB.idJMDrsuN6', currency: 'eur', email: 'admin@gmail.com', role: UserRole.ADMIN, username: 'admin' },
                { firstName: 'gregoire', lastName: 'conreaux', password: '$2b$10$hlKHHwKCglZf9whoys4HKu3Kq/ifyExaS7IjGLURZB.idJMDrsuN6', currency: 'eur', email: 'gregoire@gmail.com', role: UserRole.ADMIN, username: 'greg' },
                { firstName: 'lucas', lastName: 'duboisse', password: '$2b$10$hlKHHwKCglZf9whoys4HKu3Kq/ifyExaS7IjGLURZB.idJMDrsuN6', currency: 'eur', email: 'lucas@gmail.com', role: UserRole.ADMIN, username: 'lucas' },
                { firstName: 'bastien', lastName: 'angles', password: '$2b$10$hlKHHwKCglZf9whoys4HKu3Kq/ifyExaS7IjGLURZB.idJMDrsuN6', currency: 'eur', email: 'bastien@gmail.com', role: UserRole.ADMIN, username: 'bastien' },
                { firstName: 'jonathan', lastName: 'khalifa', password: '$2b$10$hlKHHwKCglZf9whoys4HKu3Kq/ifyExaS7IjGLURZB.idJMDrsuN6', currency: 'eur', email: 'jonathan@gmail.com', role: UserRole.ADMIN, username: 'jonathan' },
            ])
            .execute()
    }
}