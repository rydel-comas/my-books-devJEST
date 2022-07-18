
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { Book } from '../../models/book.model';
import {of} from 'rxjs'
import { DOCUMENT } from '@angular/common';

describe('Home component', () => {

    let listBook: Book[]=[{
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

    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let service: BookService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                HomeComponent
            ],
            providers: [
                BookService,
            {
                provide: Document,
                useExisting: DOCUMENT
            }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });


    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        service = fixture.debugElement.injector.get(BookService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(()=>{
      fixture.destroy();
      jest.resetAllMocks();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    });

      it('getBooks return books', () => {
        const spy= jest.spyOn(service, 'getBooks').mockImplementation(()=> of(listBook));
        component.getBooks();
        expect(spy).toBeCalledTimes(1);
        expect(component.listBook.length).toBe(2);
        expect(component.listBook).toEqual(listBook);
        })

        xit('test alert', () => {
            const documentService = TestBed.inject(Document);
            const windowAngular = documentService.defaultView;
            const spy = jest.spyOn(windowAngular, 'alert').mockImplementation(() => null);
            component.ngOnInit();
            expect(spy).toHaveBeenCalled();
          });
    });


