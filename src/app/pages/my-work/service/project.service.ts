import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserService } from './user.service';
import { Config } from './config';

@Injectable()
export class ProjectService {
    projectList = new BehaviorSubject<any[]>([]);

    constructor(private http: Http, private userService: UserService) { }

    setProjectList(projectList: any[]) {
        this.projectList.next(projectList);
    }

    getAllProjects(searchKey: any): Promise<any> {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + self.userService.getToken());

        let opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.get(Config.api_url + "project/" + searchKey, opt).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    addProject(p: any): Promise<any> {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + self.userService.getToken());

        let opt = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + "project/register", p, opt).map(resp => resp.json()).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            )
        })
    }

    saveProject(p: any): Promise<any> {
        var self = this;
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + self.userService.getToken());

        let opt = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            self.http.put(Config.api_url + "project/" + p.id, p, opt).map(resp => resp.json()).subscribe(
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
