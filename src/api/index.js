import SyncStorage, { SessionStorage } from './SyncStorage';
import { GET, POST, POSTFORM, DELETE } from './Fetch';
import moment from 'moment-timezone';
import jwt_decode from "jwt-decode";

import Event from './Event';
import basepath from '../components/basepath';

export default class Api {
    constructor() {
        this.prefix = "";

        this.url = process.env.NEXT_PUBLIC_BASEPATH || "";

        //this.checkAuth();
        Event.on('refresh_token', this.tokenExpired.bind(this));
    }

    async tokenExpired() {
        try {
            Event.emit('update_auth');
        } catch (ex) {
            console.log(ex);
        }
    }

    async checkAuth() {
        try {

            await this.getAuth();

            if (!this.token)
                throw Error("No Token");

            var decoded = jwt_decode(this.token || "");

            if (moment(parseInt(decoded.exp) * 1000).isBetween(moment().add(1, 'days'), moment().add(12, 'hour')))
                await this.refresh();
            else if (moment(parseInt(decoded.exp) * 1000).isBefore(moment())) {
                throw Error("Expired Token");
            }

            console.log("Called Here");
            Event.emit('update_auth');

            // token is still consumable
            return true;
        } catch (ex) {
            Event.emit('failed_auth');
            // cannot refresh
            return false;
        }
    }

    async getAuth() {
        var prefix = this.prefix;

        var res = SyncStorage.multiGet([`${prefix}@token`, `${prefix}@user`, `${prefix}@store_id`]);

        this.token = res[0][1];
        this.user = res[1][1] ? JSON.parse(res[1][1]) : null;
        this.store_id = res[2][1] || null;
    }

    async storeAuth(access_token, user) {
        var prefix = this.prefix;

        this.token = access_token;
        this.user = user;
        this.store_id = user.merchant?.stores[0]?.id || null;

        SyncStorage.setItem(`${prefix}@token`, access_token);
        SyncStorage.setItem(`${prefix}@user`, JSON.stringify(user));
        if (this.store_id)
            SyncStorage.setItem(`${prefix}@store_id`, this.store_id);
    }

    async login(username, password, remember) {
        try {
            var { token, user } = await POST(`${this.url}/api/auth/login`, {
                username,
                password
            });

            this.storeAuth(token, user, remember);

            this.getAuth()

            return true;
        } catch (ex) {
            throw ex;
        }
    }

    async socialLogin(provider, access_token) {

        var { token, user } = await POST(`${this.url}/api/auth/login/${provider}`, {
            token: access_token
        });

        this.storeAuth(token, user);

        return true;
    }

    async register(full_name, username, email, phone, password, password_confirmation) {

        return POST(`${this.url}/api/auth/register`, {
            full_name,
            username,
            email,
            phone,
            password,
            password_confirmation
        });
    }

    logout() {
        var prefix = this.prefix;
        SyncStorage.multiRemove([`${prefix}@token`, `${prefix}@user`, `${prefix}@store_id`])
        SessionStorage.multiRemove([`${prefix}@token`, `${prefix}@user`, `${prefix}@store_id`])
    }

    async refresh() {
        var { token, user } = await POST(`${this.url}/api/auth/refresh`, {},
            { "Authorization": `Bearer ${this.token}` });

        this.storeAuth(token, user);

        return true;
    }

    forgotPassword(username) {
        return POST(`${this.url}/api/auth/forgot`, {
            username
        });
    }

    changePassword({ password, password_confirmation, token }) {
        return POST(`${this.url}/api/auth/password`,
            { password, password_confirmation },
            { "Authorization": `Bearer ${token}` });
    }

    changePasswordProfile({ password, new_password, new_password_confirmation }) {
        return POST(`${this.url}/api/auth/password/profile`,
            { password, new_password, new_password_confirmation },
            { "Authorization": `Bearer ${this.token}` });
    }

    verifyEmail({ token }) {
        return POST(`${this.url}/api/auth/verify`,
            {},
            { "Authorization": `Bearer ${token}` });
    }

    reverifyEmail() {
        return POST(`${this.url}/api/auth/reverify`,
            {},
            { "Authorization": `Bearer ${this.token}` });
    }

    verifyInvite({ token }) {
        return POST(`${this.url}/api/auth/inviteverify`,
            { token },
            { "Authorization": `Bearer ${token}` });
    }

    // Image
    getImage(image_path) {
        if (image_path && process.env.NEXT_PUBLIC_CDNPATH)
            return `${process.env.NEXT_PUBLIC_CDNPATH}${image_path}`; //`${this.url}/api/image/${image_id}`;
        else
            return basepath("/img/shop/1.png");
    }
}