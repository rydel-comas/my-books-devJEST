import { FormComponent } from './form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('Form component', () => {

    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
            ],
            declarations: [
                FormComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('name fild is required', () => {
        const nameField = component.form.get('name');
        nameField.setValue('');
        expect(nameField.valid).toBeFalsy();
    });

    it('name fild has an error with more than 5 characters', () => {
        const nameField = component.form.get('name');
        nameField.setValue('test name');
        expect(nameField.valid).toBeFalsy();
    });

    it('name fild is correct with less than 5 characters', () => {
        const nameField = component.form.get('name');
        nameField.setValue('Jack');
        expect(nameField.valid).toBeTruthy();
    });

    it('email fild is required', () => {
        const emailField = component.form.get('email');
        emailField.setValue('');
        expect(emailField.valid).toBeFalsy();
    });

    it('email must be valid', () => {
        const emailField = component.form.get('email');
        emailField.setValue('test@');
        expect(emailField.valid).toBeFalsy();
        emailField.setValue('test@test.com');
        expect(emailField.valid).toBeTruthy();
    });

    it('form is valid', () => {
        const nameField = component.form.get('name');
        const emailField = component.form.get('email');
        nameField.setValue('Jack');
        emailField.setValue('test@test.com');
        expect(component.form.valid).toBeTruthy();
    });

    it('OnSave log', () => {
        const logSpy = jest.spyOn(console, 'log');
       component.onSave();
        expect(logSpy).toHaveBeenCalledWith('Saved');
    });
});
