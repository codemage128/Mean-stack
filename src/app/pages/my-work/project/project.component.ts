import { Component, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { ProjectService, ToastService } from '../service';

@Component({
  selector: 'ngx-my-work-project',
  styleUrls: ['./project.component.scss'],
  templateUrl: './project.component.html',
})
export class ProjectComponent {
  source: LocalDataSource = new LocalDataSource();

  projectList: any[];
  searchKey: any = "";

  constructor(private router: Router, private projectService: ProjectService, private toastService: ToastService) {
    this.projectService.getAllProjects(this.searchKey).then(o => {
      this.projectService.setProjectList(o);
    }, (error) => {
      this.toastService.showErrorToast(error.message);
    });

    this.projectService.projectList.subscribe((projectList) => {
      this.projectList = projectList;
    });
  }

  addProject() {
    this.router.navigateByUrl("/pages/my-work/project-add");
  }

  searchProject(v) {
    this.searchKey = v;

    console.log(v);
    this.projectService.getAllProjects(this.searchKey).then(o => {
      this.projectService.setProjectList(o);
    }, (error) => {
      this.toastService.showErrorToast(error.message);
    });
  }

  cancelProject(p) {
    p.status = 1;
    var self = this;
    self.projectService.saveProject(p).then(o => {
      if (o.success) {
        self.toastService.showSuccessToast('This project is successfully cancelled.');
        self.projectService.getAllProjects(self.searchKey).then(o => {
          self.projectService.setProjectList(o);
        }, (error) => {
          self.toastService.showErrorToast(error.message);
        });
      }
    }, (error) => {
      self.toastService.showErrorToast(error.message);
    });
  }

  completeProject(p) {
    p.status = 2;
    var self = this;
    self.projectService.saveProject(p).then(o => {
      if (o.success) {
        self.toastService.showSuccessToast('This project is successfully completed.');
        self.projectService.getAllProjects(self.searchKey).then(o => {
          self.projectService.setProjectList(o);
        }, (error) => {
          self.toastService.showErrorToast(error.message);
        });
      }
    }, (error) => {
      self.toastService.showErrorToast(error.message);
    });
  }
}
