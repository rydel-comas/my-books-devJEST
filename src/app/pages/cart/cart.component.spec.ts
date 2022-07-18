import { CartComponent } from './cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../../models/book.model';
import { By } from '@angular/platform-browser';


describe('Cart component', () => {

    let listCartBook: Book[]=[{
      amount: 10,
      price: 10,
      name: "Troya",
      author: "Julio Verne",
      isbn: "Suspense"
    },{
        amount: 2,
        price: 1,
        name: "Fuego",
        author: "Julio Carcamo",
        isbn: "Accion"
    }];

    let service: BookService;
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                CartComponent
            ],
            providers: [
                BookService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });


    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        service = fixture.debugElement.injector.get(BookService);
        component = fixture.componentInstance;
        fixture.detectChanges();
        jest.spyOn(service, 'getBooksFromCart').mockImplementation(()=> listCartBook);
    });

    afterEach(()=>{
      fixture.destroy();
      jest.resetAllMocks();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    });

      it('getTotalPrice return total', ()=>{
         const total= component.getTotalPrice(listCartBook);
         expect(total).toBeGreaterThan(0);
         expect(total).not.toBe(0);
         expect(total).not.toBeNull;
      });


      it('onInputNumberChange plus 1', ()=>{
        const spy = jest.spyOn(service, 'updateAmountBook').mockImplementation(()=>null);
        const spy1 = jest.spyOn(component, 'getTotalPrice').mockImplementation(()=>null);
        let book: Book={
            amount: 10,
            price: 10,
            name: "Troya",
            author: "Julio Verne",
            isbn: "Suspense"
          };
        component.onInputNumberChange('plus', book);
        expect(book.amount > 10);
        expect(spy).toHaveBeenCalled;
        expect(spy1).toHaveBeenCalled;
     });

     
     it('onInputNumberChange minus 1', ()=>{
        const spy = jest.spyOn(service, 'updateAmountBook').mockImplementation(()=>null);
        const spy1 = jest.spyOn(component, 'getTotalPrice').mockImplementation(()=>null);
        let book: Book={
            amount: 10,
            price: 10,
            name: "Troya",
            author: "Julio Verne",
            isbn: "Suspense"
          };
        component.onInputNumberChange('minus', book);
        expect(book.amount < 10);
        expect(spy).toHaveBeenCalled;
        expect(spy1).toHaveBeenCalled;
     });

      it('clearListCartBook clean cart', ()=>{
        let spy= jest.spyOn(service, 'removeBooksFromCart').mockImplementation(()=> null);
        component["_clearListCartBook"]();
        expect(component.listCartBook.length).toEqual(0);
     });

it('onClearBooks work correctly', ()=>{
    let spy= jest.spyOn(component as any, '_clearListCartBook').mockImplementation(()=> null);
    component.listCartBook = [{
        amount: 10,
        price: 10,
        name: "Troya",
        author: "Julio Verne",
        isbn: "Suspense"
      }];
    component.onClearBooks();
    expect(spy).toHaveBeenCalled;
 });

 it('onClearBooks work correctly when []', ()=>{
    let spy= jest.spyOn(component as any, '_clearListCartBook').mockImplementation(()=> null);
    component.listCartBook = [];
    component.onClearBooks();
    expect(spy).toHaveBeenCalled;
 });

 it('The title "the cart is empty" not displayed when there is a list', () => {
  component.listCartBook = listCartBook;
  fixture.detectChanges();
  const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
  expect(debugElement).toBeFalsy();
});


it('The title "the cart is empty" is displayed correctly when list is empty', () => {
 component.listCartBook = [];
 fixture.detectChanges();
 const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
 expect(debugElement).toBeTruthy();
 if (debugElement){
   const element: HTMLElement = debugElement.nativeElement;
   expect(element.innerHTML).toContain('The cart is empty');
 }
});
});
