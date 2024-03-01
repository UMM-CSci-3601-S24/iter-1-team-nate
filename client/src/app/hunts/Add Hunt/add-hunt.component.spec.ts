import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HuntService } from '../hunt.service';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { AddHuntComponent } from "./add-hunt.component";
import { MockHuntService } from "src/testing/hunt.service.mock";


describe('AddHuntComponent', () => {
  let addHuntComponent: AddHuntComponent;
  let addHuntForm: FormGroup;
  let fixture: ComponentFixture<AddHuntComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.overrideProvider(HuntService, { useValue: new MockHuntService() });
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        AddHuntComponent
      ]
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHuntComponent);
    addHuntComponent = fixture.componentInstance;
    fixture.detectChanges();
    addHuntForm = addHuntComponent.addHuntForm;
    expect(addHuntForm).toBeDefined();
    expect(addHuntForm.controls).toBeDefined();
  });

  it('should create the component and form', () => {
    expect(addHuntComponent).toBeTruthy();
    expect(addHuntForm).toBeTruthy();
  });
})