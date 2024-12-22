import jwt from "jsonwebtoken"
import fs from 'fs';
import path from 'path';

export default class TokenJwt {
    static keyPath = path.join(__dirname, '../../key');
    static privateKey = fs.readFileSync(path.join(this.keyPath, 'privateCodeFire.key'), 'utf-8');
    static publicKey = fs.readFileSync(path.join(this.keyPath, 'publicCodeFire.key'), 'utf-8');

    static gerarToken(payload: string | object): string {
        return jwt.sign(payload, this.privateKey, { algorithm: 'RS256', expiresIn: '1h' })
    }

    static validarToken(token: string): boolean {
        try {
            jwt.verify(token, this.publicKey, { algorithms: ['RS256'] });
            return true
        } catch (e) {
            return false
        }
    }
}