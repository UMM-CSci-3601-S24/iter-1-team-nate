import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HostService } from 'src/app/hosts/host.service';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';




@Component ({
  selector: 'app-hunt-edit',
  templateUrl: './hunt-edit.component.html',
  styleUrls: ['./hunt-edit.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, RouterLink, CommonModule]
})



export class HuntEditComponent implements OnInit {
  huntform: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private hostService: HostService,
    private router: Router,
    private fb: FormBuilder // inject FormBuilder
  ) {
    this.huntform = this.fb.group({
      name: new FormControl(),
      description: new FormControl(),
      est: new FormControl(),
      tasks: this.fb.array([]) // add tasks as a FormArray
    });
  }

  get tasks(): FormArray {
    return this.huntform.get('tasks') as FormArray;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.hostService.getHuntById(id).subscribe(completeHunt => {
      console.log(completeHunt); // log the CompleteHunt object

      const tasksFormArray = this.huntform.get('tasks') as FormArray;
      completeHunt.tasks.forEach(task => {
        tasksFormArray.push(this.fb.group({
          name: task.name
        }));
      });

      this.huntform.setValue({
        name: completeHunt.hunt.name,
        description: completeHunt.hunt.description,
        est: completeHunt.hunt.est,
        tasks: tasksFormArray.value // provide a value for the tasks control
      });
    });
  }
  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.hostService.editHunt(id, this.huntform.value).subscribe(() => {
      // Handle successful update
      // For example, navigate back to the list of hunts
      this.router.navigate(['/hunts']);
    });
  }
}
