import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAccountComponent } from './new-account.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('NewAccountComponent', () => {
  let component: NewAccountComponent;
  let fixture: ComponentFixture<NewAccountComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de=fixture.debugElement.query(By.css('form'));
    el=de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call the onSubmit method', async(()=>{
    spyOn(component, 'onSubmit');
    el=fixture.debugElement.query(By.css('button')).nativeElement;
    el.click;
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  }));
  it('form should be invalid', async(()=>{
    component.formGroup.controls['email'].setValue('');
    component.formGroup.controls['firstName'].setValue('');
    component.formGroup.controls['lastName'].setValue('');
    component.formGroup.controls['password'].setValue('');
    expect(component.formGroup.valid).toBeFalsy();
  }));
  it('form should be valid', async(()=>{
    component.formGroup.controls['email'].setValue('test@gmail.com');
    component.formGroup.controls['firstName'].setValue('test');
    component.formGroup.controls['lastName'].setValue('test');
    component.formGroup.controls['password'].setValue('Test1234');
    expect(component.formGroup.valid).toBeTruthy();
  }));
});
