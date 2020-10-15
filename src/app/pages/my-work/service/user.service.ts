import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Config } from './config';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {
    userList = new BehaviorSubject<any[]>([]);

    constructor(private http: Http) { }

    getUser(): any {
        let u = JSON.parse(localStorage.getItem("user"));
        if (!u) u = null;
        return u;
    }

    setUser(u: any) {
        localStorage.setItem("user", JSON.stringify(u));
    }

    getIsLogin(): any {
        let isLogin = JSON.parse(localStorage.getItem("isLogin"));
        if (isLogin == undefined) isLogin = false;
        return isLogin;
    }

    setToken(token: string) {
        localStorage.setItem("token", JSON.stringify(token));
    }

    getToken(): any {
        let token = JSON.parse(localStorage.getItem("token"));
        if (!token) token = null;
        return token;
    }

    setIsLogin(isLogin: boolean) {
        localStorage.setItem("isLogin", JSON.stringify(isLogin));
    }

    setUserList(userList: any[]) {
        this.userList.next(userList);
    }

    getAllUsers(): Promise<any> {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + this.getToken());

        let opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.get(Config.api_url + "user", opt).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    authenticateUser(data): Promise<any> {
        var self = this;
        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "user/signin", data).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    registerUser(u: any): Promise<any> {
        var self = this;
        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "user/signup", u).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    saveUser(u: any): Promise<any> {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + this.getToken());

        let opt = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            self.http.put(Config.api_url + "user/" + u.id, u, opt).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    deleteUser(u: any): Promise<any> {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + this.getToken());

        let opt = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            self.http.delete(Config.api_url + "user/" + u._id, opt).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    signOut(): Promise<any> {
        var self = this;
        return new Promise((resolve, reject) => {
            self.http.get(Config.api_url + "user/signout").map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }
}
